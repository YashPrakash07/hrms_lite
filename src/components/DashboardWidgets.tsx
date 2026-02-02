'use client';

import { Users, UserCheck, UserX, Activity } from 'lucide-react';

export function StatCard({ title, value, icon, trend, color }: any) {
    const colors: any = {
        blue: { bg: '#eff6ff', text: '#3b82f6' },
        green: { bg: '#f0fdf4', text: '#22c55e' },
        red: { bg: '#fef2f2', text: '#ef4444' },
        purple: { bg: '#f5f3ff', text: '#8b5cf6' },
    };
    const theme = colors[color] || colors.blue;

    return (
        <div style={{
            background: 'var(--card)',
            padding: '1.75rem',
            borderRadius: '1rem',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
            transition: 'transform 0.2s',
            cursor: 'default'
        }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{
                    background: theme.bg,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    color: theme.text,
                }}>
                    {icon}
                </div>
            </div>
            <div>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '500' }}>{title}</p>
                <p style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1.2', margin: '0.25rem 0' }}>{value}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>{trend}</p>
            </div>
        </div>
    )
}

export function QuickActionCard({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: '500',
            color: 'var(--foreground)',
            textAlign: 'center'
        }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        >
            {children}
        </div>
    );
}
