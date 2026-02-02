from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HRMS Lite API", version="0.1.0")

# Configure CORS to allow requests from the Next.js frontend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to HRMS Lite API (FastAPI)"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "backend": "active"}

# To run this:
# uvicorn main:app --reload
