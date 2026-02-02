'use client';

import { CardSkeleton, TableSkeleton } from '@/components/Skeleton';

export default function Loading() {
    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ width: '200px', height: '32px', background: 'var(--muted)', borderRadius: '8px', marginBottom: '0.5rem', animation: 'pulse 1.5s infinite' }} />
                <div style={{ width: '300px', height: '16px', background: 'var(--muted)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
                {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>

            <TableSkeleton />

            <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
        </div>
    );
}
