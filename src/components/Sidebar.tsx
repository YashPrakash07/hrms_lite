'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Calendar, LayoutDashboard, X } from 'lucide-react';
import styles from './Sidebar.module.css';
import { motion } from 'framer-motion';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/employees', label: 'Employees', icon: Users },
    { href: '/attendance', label: 'Attendance', icon: Calendar },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>HRMS Lite</div>
                <button onClick={onClose} className={styles.closeBtn}>
                    <X size={20} />
                </button>
            </div>
            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`${styles.link} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>YP</div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>Yash</p>
                        <p className={styles.userRole}>Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
