'use client';

import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function BackendPrimer() {
    const [isWakingUp, setIsWakingUp] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const wakeUp = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

            // Set a timeout to show the "Waking up" message if it takes more than 1.5s
            const timer = setTimeout(() => setIsWakingUp(true), 1500);

            try {
                const start = Date.now();
                const res = await fetch(`${API_URL}/health`, { cache: 'no-store' });
                clearTimeout(timer);

                if (res.ok) {
                    const end = Date.now();
                    // If it took more than 5 seconds, it was likely a cold start
                    if (end - start > 5000) {
                        console.log('Backend woke up from cold start');
                    }
                    setIsWakingUp(false);
                } else {
                    setError(true);
                }
            } catch (e) {
                clearTimeout(timer);
                setError(true);
                console.error('Backend connection failed:', e);
            }
        };

        wakeUp();
    }, []);

    if (error) {
        return (
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: '#fef2f2',
                border: '1px solid #fee2e2',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#991b1b',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                fontSize: '0.875rem',
                fontWeight: '500'
            }}>
                <AlertCircle size={18} />
                <span>Backend service is currently unavailable.</span>
            </div>
        );
    }

    if (!isWakingUp) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--foreground)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            fontSize: '0.875rem',
            fontWeight: '600',
            animation: 'fadeInSlideUp 0.3s ease-out'
        }}>
            <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
            <span>Waking up server (Render Free Tier)...</span>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes fadeInSlideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
