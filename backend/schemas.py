from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class AttendanceBase(BaseModel):
    date: date
    status: str

class AttendanceCreate(AttendanceBase):
    employee_id: int

class Attendance(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True
