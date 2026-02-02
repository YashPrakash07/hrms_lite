from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import date as date_type

from database import SessionLocal, engine, init_db, Employee as DBEmployee, Attendance as DBAttendance
import schemas

# Initialize Database
init_db()

app = FastAPI(title="HRMS Lite API", version="0.1.0")

# CORS
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to HRMS Lite API (FastAPI)"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "backend": "active"}

# --- Employees ---

@app.post("/api/employees", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = db.query(DBEmployee).filter(DBEmployee.employee_id == employee.employee_id).first()
    if db_employee:
        raise HTTPException(status_code=400, detail="Employee ID already registered")
    
    db_employee = DBEmployee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/api/employees", response_model=List[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    employees = db.query(DBEmployee).offset(skip).limit(limit).all()
    return employees

@app.delete("/api/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = db.query(DBEmployee).filter(DBEmployee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(db_employee)
    db.commit()
    return {"ok": True}

# --- Attendance ---

@app.post("/api/attendance", response_model=schemas.Attendance)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    # Check if exists for day
    existing = db.query(DBAttendance).filter(
        DBAttendance.employee_id == attendance.employee_id,
        DBAttendance.date == attendance.date
    ).first()

    if existing:
        existing.status = attendance.status
        db.commit()
        db.refresh(existing)
        return existing
    
    db_record = DBAttendance(**attendance.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/api/attendance", response_model=List[schemas.Attendance])
def read_attendance(date: date_type, db: Session = Depends(get_db)):
    records = db.query(DBAttendance).filter(DBAttendance.date == date).all()
    return records

@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    total_employees = db.query(DBEmployee).count()
    today = date_type.today()
    present_today = db.query(DBAttendance).filter(
        DBAttendance.date == today, 
        DBAttendance.status == 'PRESENT'
    ).count()
    absent_today = db.query(DBAttendance).filter(
        DBAttendance.date == today, 
        DBAttendance.status == 'ABSENT'
    ).count()

    return {
        "totalEmployees": total_employees,
        "presentToday": present_today,
        "absentToday": absent_today
    }
