'use client';

import { useState } from 'react';
import { Plus, Trash2, Search, User, Mail, Briefcase, Hash, MoreVertical, Filter } from 'lucide-react';
import Modal from '@/components/Modal';
import { MOCK_EMPLOYEES, Employee } from '@/lib/mock-data';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        fullName: '',
        email: '',
        department: ''
    });

    const filtered = employees.filter(e =>
        e.fullName.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Delete this employee record?')) {
            setEmployees(prev => prev.filter(e => e.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEmp: Employee = {
            id: Math.random(),
            ...formData,
            status: 'Active',
            role: 'New Hire'
        };
        setEmployees([newEmp, ...employees]);
        setIsModalOpen(false);
        setFormData({ employeeId: '', fullName: '', email: '', department: '' });
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: '800', letterSpacing: '-0.025em' }}>Employees</h1>
                    <p style={{ color: 'var(--muted-foreground)', marginTop: '0.5rem', fontSize: '1.05rem' }}>Manage your team members and roles.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Plus size={20} /> Add Employee
                </button>
            </div>

            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                    <input
                        type="text"
                        placeholder="Search by name or department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 3rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            background: 'var(--background)',
                            fontSize: '0.95rem'
                        }}
                    />
                </div>
                <button style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--muted-foreground)', cursor: 'pointer' }}>
                    <Filter size={20} />
                </button>
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
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ID</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role & Dept</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                            <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((emp, i) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                                onMouseOver={e => e.currentTarget.style.background = 'var(--muted)'}
                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `hsl(${i * 60}, 70%, 80%)`, color: `hsl(${i * 60}, 80%, 20%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                                            {emp.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: 'var(--foreground)' }}>{emp.fullName}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{emp.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem', fontFamily: 'monospace', fontWeight: '500', color: 'var(--muted-foreground)' }}>{emp.employeeId}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ fontWeight: '500' }}>{emp.role}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{emp.department}</div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                        background: emp.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                                        color: emp.status === 'Active' ? '#166534' : '#374151',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                        {emp.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--muted-foreground)',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--destructive)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--muted-foreground)'}
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', marginLeft: '0.5rem' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Employee">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Employee ID</label>
                        <div style={{ position: 'relative' }}>
                            <Hash size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input required type="text" placeholder="e.g. EMP-001" value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input required type="text" placeholder="Jane Doe" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input required type="email" placeholder="jane@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Department</label>
                        <div style={{ position: 'relative' }}>
                            <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <select required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', appearance: 'none' }}>
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>Create Employee</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
