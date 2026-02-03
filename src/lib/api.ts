const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchStats() {
  const res = await fetch(`${API_BASE_URL}/stats`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchEmployees() {
  const res = await fetch(`${API_BASE_URL}/employees`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
}

interface CreateEmployeeData {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

export async function createEmployee(data: CreateEmployeeData) {
  const res = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
     const error = await res.json();
     throw new Error(error.detail || 'Failed to create employee');
  }
  return res.json();
}

export async function deleteEmployee(id: number) {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete employee');
  return res.json();
}

export async function fetchAttendance(date: string) {
  const res = await fetch(`${API_BASE_URL}/attendance?date=${date}`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error('Failed to fetch attendance');
  return res.json();
}

export async function markAttendance(data: { employee_id: number; date: string; status: string }) {
  const res = await fetch(`${API_BASE_URL}/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
     const error = await res.json();
     throw new Error(error.detail || 'Failed to mark attendance');
  }
  return res.json();
}

export async function fetchRecentAttendance() {
  const res = await fetch(`${API_BASE_URL}/attendance/recent`, { next: { revalidate: 10 } });
  if (!res.ok) throw new Error('Failed to fetch recent attendance');
  return res.json();
}
