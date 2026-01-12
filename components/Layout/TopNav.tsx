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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [showNotifications, setShowNotifications] = useState(false);
    const notifications = [
        { id: 1, text: "Sarah J. confirmed your booking.", time: "2m ago", unread: true },
        { id: 2, text: "New Challenge: 5k Run!", time: "1h ago", unread: false },
        { id: 3, text: "Mike T. commented on your post.", time: "3h ago", unread: false },
    ];

    return (
        <nav className={styles.nav}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Mobile Hamburger */}
                {user && (
                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                )}

                <div className={styles.logo}>
                    <Link href="/">Trainup.space</Link>
                </div>
            </div>

            {/* Links Section - Toggles on Mobile */}
            <div className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
                {user && visibleLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.link} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                        onClick={() => setIsMenuOpen(false)} // Close on click
                    >
                        {link.label}
                    </Link>
                ))}
                {user && (
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                        className={styles.link}
                        style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: 'none', color: '#ef4444' }}
                    >
                        Logout
                    </button>
                )}
            </div>

            <div className={styles.actions}>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                                <>
                                    <div className={styles.overlay} onClick={() => setShowNotifications(false)} />
                                    <div className={styles.dropdown}>
                                        <div className={styles.dropdownHeader}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span>Notifications</span>
                                                <button
                                                    className={styles.mobileCloseBtn}
                                                    onClick={() => setShowNotifications(false)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <span className={styles.markRead}>Mark all read</span>
                                        </div>
                                        {notifications.map(n => (
                                            <div key={n.id} className={styles.dropdownItem}>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: n.unread ? 600 : 400 }}>{n.text}</p>
                                                <span className={styles.timestamp}>{n.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span className={styles.roleBadge} style={{ fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
