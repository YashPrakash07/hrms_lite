export type Employee = {
  id: number;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  status: 'Active' | 'Inactive';
  role: string;
  avatar?: string;
};

export type Attendance = {
  id: number;
  employeeId: number;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY';
  checkIn?: string;
  checkOut?: string;
};

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, employeeId: 'EMP-001', fullName: 'Sarah Connor', email: 'sarah@techcorp.com', department: 'Engineering', status: 'Active', role: 'Frontend Developer' },
  { id: 2, employeeId: 'EMP-002', fullName: 'John Reese', email: 'john@techcorp.com', department: 'Security', status: 'Active', role: 'Security Analyst' },
  { id: 3, employeeId: 'EMP-003', fullName: 'Harold Finch', email: 'finch@techcorp.com', department: 'Management', status: 'Active', role: 'CTO' },
  { id: 4, employeeId: 'EMP-004', fullName: 'Sameen Shaw', email: 'shaw@techcorp.com', department: 'Operations', status: 'Active', role: 'Ops Manager' },
  { id: 5, employeeId: 'EMP-005', fullName: 'Lionel Fusco', email: 'fusco@techcorp.com', department: 'HR', status: 'Inactive', role: 'HR Generalist' },
];

export const MOCK_ATTENDANCE: Attendance[] = [
  { id: 1, employeeId: 1, date: new Date().toISOString().split('T')[0], status: 'PRESENT', checkIn: '09:00 AM', checkOut: '05:00 PM' },
  { id: 2, employeeId: 2, date: new Date().toISOString().split('T')[0], status: 'PRESENT', checkIn: '08:55 AM', checkOut: '05:30 PM' },
  { id: 3, employeeId: 3, date: new Date().toISOString().split('T')[0], status: 'PRESENT', checkIn: '10:00 AM', checkOut: '06:00 PM' },
  { id: 4, employeeId: 4, date: new Date().toISOString().split('T')[0], status: 'ABSENT' },
];

export async function getMockStats() {
  // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  return {
    totalEmployees: MOCK_EMPLOYEES.length,
    activeEmployees: MOCK_EMPLOYEES.filter(e => e.status === 'Active').length,
    presentToday: MOCK_ATTENDANCE.filter(a => a.status === 'PRESENT').length,
    absentToday: MOCK_ATTENDANCE.filter(a => a.status === 'ABSENT').length,
  };
}
