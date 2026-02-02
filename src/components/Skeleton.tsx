'use client';

export function TableSkeleton() {
    return (
        <div style={{ width: '100%', padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1.25rem 0',
                    borderBottom: i === 4 ? 'none' : '1px solid var(--border)',
                    alignItems: 'center'
                }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--muted)', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ width: '40%', height: '14px', background: 'var(--muted)', borderRadius: '4px', marginBottom: '0.5rem', animation: 'pulse 1.5s infinite' }} />
                        <div style={{ width: '25%', height: '10px', background: 'var(--muted)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                    </div>
                    <div style={{ width: '15%', height: '14px', background: 'var(--muted)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                    <div style={{ width: '10%', height: '14px', background: 'var(--muted)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
                </div>
            ))}
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

export function CardSkeleton() {
    return (
        <div style={{
            background: 'var(--card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            height: '140px'
        }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--muted)', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '60%', height: '12px', background: 'var(--muted)', borderRadius: '4px', marginBottom: '0.75rem', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '40%', height: '24px', background: 'var(--muted)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
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
