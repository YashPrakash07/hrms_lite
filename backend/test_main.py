from fastapi.testclient import TestClient
from sqlalchemy import create_mock_engine
from sqlalchemy.orm import sessionmaker
import pytest
from main import app, get_db
from database import Base
from sqlalchemy import create_engine

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_hrms.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_read_employees_empty():
    response = client.get("/api/employees")
    assert response.status_code == 200
    assert response.json() == []

def test_create_employee():
    employee_data = {
        "employee_id": "TEST-001",
        "full_name": "Test User",
        "email": "test@example.com",
        "department": "Engineering"
    }
    response = client.post("/api/employees", json=employee_data)
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Test User"
    assert "id" in data

def test_get_stats():
    # Setup: Create one employee
    client.post("/api/employees", json={
        "employee_id": "TEST-002",
        "full_name": "Stat User",
        "email": "stat@example.com",
        "department": "HR"
    })
    
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["total_employees"] == 1
    assert "present_today" in data
    assert "absent_today" in data
