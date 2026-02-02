'use client';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: () => void;
    actionLabel?: string;
}

export default function EmptyState({ icon: Icon, title, description, action, actionLabel }: EmptyStateProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            background: 'var(--card)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            textAlign: 'center'
        }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
            }}>
                <Icon size={32} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{title}</h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', maxWidth: '300px', lineHeight: '1.5' }}>{description}</p>
            {action && (
                <button
                    onClick={action}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
