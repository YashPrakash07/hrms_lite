'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchEmployees, fetchAttendance, markAttendance } from '@/lib/api';

// Define types locally for now
type Employee = {
    id: number;
    employee_id: string;
    full_name: string;
    department: string;
};

type AttendanceRecord = {
    id: number;
    employee_id: number;
    date: string;
    status: string;
};

export default function AttendancePage() {
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // setLoading(true);
            try {
                // ... setup
                const [emps, atts] = await Promise.all([
                    fetchEmployees(),
                    fetchAttendance(date)
                ]);
                setEmployees(emps);
                setAttendance(atts);
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, [date]);

    // Helper to check status
    const getStatus = (empId: number) => {
        return attendance.find(a => a.employee_id === empId)?.status;
    };

    const handleMark = async (empId: number, status: 'PRESENT' | 'ABSENT') => {
        try {
            const updatedRecord = await markAttendance({ employee_id: empId, date, status });
            // Update local state
            const otherRecords = attendance.filter(a => a.employee_id !== empId);
            setAttendance([...otherRecords, updatedRecord]);
        } catch {
            alert('Failed to mark attendance');
        }
    };

    return (
        <div>
            {/* ... header code ... */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Attendance</h1>
                    <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem', fontSize: '1.05rem' }}>Track daily attendance and work hours.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card)', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <button style={{ padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}><ChevronLeft size={20} /></button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                        <CalendarIcon size={18} color='var(--primary)' />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                fontFamily: 'inherit',
                                color: 'var(--foreground)',
                                outline: 'none',
                                fontSize: '0.95rem',
                                fontWeight: '600'
                            }}
                        />
                    </div>
                    <button style={{ padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}><ChevronRight size={20} /></button>
                </div>
            </div>

            <div style={{
                background: 'var(--card)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Employee</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check In</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mark Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => {
                            const status = getStatus(emp.id);
                            return (
                                <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                                    onMouseOver={e => e.currentTarget.style.background = 'var(--muted)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                                                {emp.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{emp.full_name}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{emp.department}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        {status === 'PRESENT' ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                                                <Clock size={16} /> 09:00 AM
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>--:--</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        {status ? (
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                background: status === 'PRESENT' ? '#dcfce7' : '#fee2e2',
                                                color: status === 'PRESENT' ? '#166534' : '#991b1b',
                                                padding: '0.35rem 0.85rem',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                fontWeight: '700',
                                                border: `1px solid ${status === 'PRESENT' ? '#bbf7d0' : '#fecaca'}`
                                            }}>
                                                {status === 'PRESENT' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                {status}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', fontStyle: 'italic' }}>Not marked</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleMark(emp.id, 'PRESENT')}
                                                disabled={status === 'PRESENT'}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                                                    padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--border)',
                                                    background: status === 'PRESENT' ? 'var(--accent)' : 'transparent',
                                                    color: status === 'PRESENT' ? 'var(--primary)' : 'var(--muted-foreground)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    cursor: status === 'PRESENT' ? 'default' : 'pointer',
                                                    opacity: status === 'PRESENT' ? 0.7 : 1
                                                }}
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => handleMark(emp.id, 'ABSENT')}
                                                disabled={status === 'ABSENT'}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                                                    padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--border)',
                                                    background: status === 'ABSENT' ? '#fee2e2' : 'transparent',
                                                    color: status === 'ABSENT' ? '#991b1b' : 'var(--muted-foreground)',
                                                    fontWeight: '600',
                                                    fontSize: '0.8rem',
                                                    cursor: status === 'ABSENT' ? 'default' : 'pointer',
                                                    opacity: status === 'ABSENT' ? 0.7 : 1
                                                }}
                                            >
                                                Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
