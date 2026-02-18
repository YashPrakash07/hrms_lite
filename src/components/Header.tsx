'use client';

import { Menu, X, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
    onMenuClick: () => void;
    isSidebarOpen: boolean;
}

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'var(--background)',
            backdropFilter: scrolled ? 'blur(8px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
            transition: 'all 0.3s ease',
            marginLeft: '0'
        }} className="mobile-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onMenuClick}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: '1px solid var(--border)',
                        cursor: 'pointer',
                        color: 'var(--foreground)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        backgroundColor: 'var(--card)'
                    }}
                    className="menu-toggle"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)', display: 'none' }} className="mobile-logo">
                    HRMS Lite
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--muted-foreground)',
                    position: 'relative'
                }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--destructive)',
                        borderRadius: '50%',
                        border: '2px solid white'
                    }} />
                </button>
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.75rem'
                }}>
                    YP
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .menu-toggle {
                        display: block !important;
                    }
                    .mobile-logo {
                        display: block !important;
                    }
                }
            `}</style>
        </header>
    );
}
