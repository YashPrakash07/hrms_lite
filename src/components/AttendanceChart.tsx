'use client';

import { motion } from 'framer-motion';

export default function AttendanceChart() {
    const data = [45, 52, 38, 65, 48, 59, 54];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', height: '200px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Attendance Volume</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Last 7 Days</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '1.5rem' }}>
                {data.map((val, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            style={{
                                width: '100%',
                                background: 'var(--primary)',
                                borderRadius: '4px 4px 0 0',
                                opacity: i === 6 ? 1 : 0.6
                            }}
                        />
                        <span style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{days[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
