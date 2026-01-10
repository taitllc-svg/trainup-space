'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import styles from './TopNav.module.css';

const TopNav = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    // ... logic ...

    const handleLogout = async () => {
        await logout();
    };

    // Define all links
    const allLinks = [
        { href: '/member/dashboard', label: 'Member', roles: ['MEMBER', 'ADMIN'] },
        { href: '/marketplace', label: 'Find a Trainer', roles: ['MEMBER', 'ADMIN'] },
        { href: '/booking', label: 'Classes', roles: ['MEMBER', 'ADMIN'] },
        { href: '/progress', label: 'Progress', roles: ['MEMBER', 'ADMIN'] },
        { href: '/community', label: 'Community', roles: ['MEMBER', 'TRAINER', 'GYM', 'ADMIN'] },

        { href: '/trainer/dashboard', label: 'Trainer', roles: ['TRAINER', 'ADMIN'] },

        { href: '/gym/dashboard', label: 'Gym', roles: ['GYM', 'ADMIN'] },

        { href: '/admin', label: 'Admin', roles: ['ADMIN'] },
    ];

    // Filter based on role
    const visibleLinks = allLinks.filter(link =>
        user && link.roles.includes(user.role)
    );

    const [showNotifications, setShowNotifications] = useState(false);
    const notifications = [
        { id: 1, text: "Sarah J. confirmed your booking.", time: "2m ago", unread: true },
        { id: 2, text: "New Challenge: 5k Run!", time: "1h ago", unread: false },
        { id: 3, text: "Mike T. commented on your post.", time: "3h ago", unread: false },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Link href="/">Trainup.space</Link>
            </div>

            <div className={styles.links}>
                {user && visibleLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className={styles.actions}>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {/* Upgrade Button (Monetization) */}
                        <button style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '99px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)',
                            display: 'flex', alignItems: 'center', gap: '4px'
                        }}>
                            <span>⭐</span> Upgrade
                        </button>

                        {/* Notifications */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={styles.iconBtn}
                            >
                                🔔
                                <span className={styles.notificationBadge}></span>
                            </button>

                            {showNotifications && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <span>Notifications</span>
                                        <span style={{ fontSize: '0.75rem', color: '#3b82f6', cursor: 'pointer' }}>Mark all read</span>
                                    </div>
                                    {notifications.map(n => (
                                        <div key={n.id} className={styles.dropdownItem}>
                                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: n.unread ? 600 : 400 }}>{n.text}</p>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {user.role}
                            </span>
                            <button onClick={handleLogout} className={styles.logoutBtn} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    pathname !== '/login' && <Link href="/login" className={styles.loginBtn}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default TopNav;
