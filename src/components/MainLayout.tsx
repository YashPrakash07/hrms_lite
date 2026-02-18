'use client';

import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 45,
                        backdropFilter: 'blur(4px)',
                        transition: 'opacity 0.3s'
                    }}
                />
            )}

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                transition: 'margin-left 0.3s ease'
            }} className="main-content-wrapper">
                <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <main style={{
                    padding: '1.5rem',
                    flex: 1,
                    overflowX: 'hidden'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
            </div>

            <style jsx>{`
                .main-content-wrapper {
                    margin-left: 250px;
                }
                @media (max-width: 1024px) {
                    .main-content-wrapper {
                        margin-left: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
}
