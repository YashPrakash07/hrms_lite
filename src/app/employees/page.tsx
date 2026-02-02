'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, User, Mail, Briefcase, Hash, MoreVertical, Filter, Eye, Edit2 } from 'lucide-react';
import Modal from '@/components/Modal';
import { fetchEmployees, createEmployee, deleteEmployee } from '@/lib/api';
import { TableSkeleton } from '@/components/Skeleton';
import EmptyState from '@/components/EmptyState';

import { getInitials } from '@/lib/utils';

// Map snake_case to UI expected format
type Employee = {
    id: number;
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
    is_active: boolean;
    total_present?: number;
};

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: 'Engineering'
    });

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filtered = employees.filter(e =>
        e.full_name.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (confirm('Delete this employee record?')) {
            try {
                await deleteEmployee(id);
                setEmployees(prev => prev.filter(e => e.id !== id));
            } catch {
                alert('Failed to delete');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newEmp = await createEmployee(formData);
            setEmployees([...employees, newEmp]);
            setIsModalOpen(false);
            setFormData({ employee_id: '', full_name: '', email: '', department: 'Engineering' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create';
            alert(message);
        }
    };

    return (
        <div>
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

            {loading ? (
                <TableSkeleton />
            ) : employees.length === 0 ? (
                <EmptyState
                    icon={User}
                    title="No Employees Yet"
                    description="Start building your team by adding your first employee."
                    action={() => setIsModalOpen(true)}
                    actionLabel="Add Employee"
                />
            ) : filtered.length === 0 ? (
                <EmptyState
                    icon={Search}
                    title="No results found"
                    description={`We couldn't find any employees matching "${search}"`}
                />
            ) : (
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
                                <th style={{ padding: '1.25rem', fontWeight: '600', fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attendance</th>
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
                                                {getInitials(emp.full_name)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: 'var(--foreground)' }}>{emp.full_name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{emp.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', fontFamily: 'monospace', fontWeight: '500', color: 'var(--muted-foreground)' }}>{emp.employee_id}</td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ fontWeight: '500' }}>Employee</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{emp.department}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                            background: emp.is_active ? '#dcfce7' : '#f3f4f6',
                                            color: emp.is_active ? '#166534' : '#374151',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700'
                                        }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                            {emp.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>{emp.total_present || 0}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontWeight: '500' }}>days present</div>
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'right', position: 'relative' }}>
                                        <div
                                            style={{ position: 'relative', display: 'inline-block' }}
                                            onMouseEnter={() => setActiveMenu(emp.id)}
                                            onMouseLeave={() => setActiveMenu(null)}
                                        >
                                            <button style={{
                                                background: activeMenu === emp.id ? 'var(--accent)' : 'transparent',
                                                border: 'none',
                                                color: activeMenu === emp.id ? 'var(--primary)' : 'var(--muted-foreground)',
                                                cursor: 'pointer',
                                                padding: '0.6rem',
                                                borderRadius: '8px',
                                                transition: 'all 0.2s ease'
                                            }}>
                                                <MoreVertical size={20} />
                                            </button>

                                            {activeMenu === emp.id && (
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '0',
                                                    top: '100%',
                                                    zIndex: 50,
                                                    minWidth: '160px',
                                                    background: 'var(--card)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                                    padding: '0.5rem',
                                                    marginTop: '0.25rem',
                                                    animation: 'fadeInSlide 0.2s ease-out'
                                                }}>
                                                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', border: 'none', background: 'transparent', color: 'var(--foreground)', fontSize: '0.85rem', fontWeight: '500', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                        <Eye size={16} /> View Profile
                                                    </button>
                                                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', border: 'none', background: 'transparent', color: 'var(--foreground)', fontSize: '0.85rem', fontWeight: '500', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--secondary)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                        <Edit2 size={16} /> Edit Details
                                                    </button>
                                                    <div style={{ height: '1px', background: 'var(--border)', margin: '0.4rem 0' }} />
                                                    <button
                                                        onClick={() => handleDelete(emp.id)}
                                                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.8rem', border: 'none', background: 'transparent', color: 'var(--destructive)', fontSize: '0.85rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}
                                                        onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        <Trash2 size={16} /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Employee">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Employee ID</label>
                        <div style={{ position: 'relative' }}>
                            <Hash size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input required type="text" placeholder="e.g. EMP-001" value={formData.employee_id} onChange={e => setFormData({ ...formData, employee_id: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                            <input required type="text" placeholder="Jane Doe" value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }} />
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
