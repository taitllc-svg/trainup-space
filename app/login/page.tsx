'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';
import styles from './login.module.css';

export default function LoginPage() {
    const { demoLogin, cognitoLogin, isDemoMode, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
        return (
            <div className="container" style={{ maxWidth: '480px', margin: '4rem auto', padding: '0 1rem', textAlign: 'center' }}>
                <div style={{ marginTop: '2rem', color: '#666' }}>Loading configuration...</div>
            </div>
        );
    }

    // UI State
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const roles: { role: UserRole; label: string; desc: string; color: string; }[] = [
        { role: 'MEMBER', label: 'Member', desc: 'Book classes and view progress', color: '#000000' },
        { role: 'TRAINER', label: 'Trainer', desc: 'Manage schedule and clients', color: '#2563eb' },
        { role: 'GYM', label: 'Gym Manager', desc: 'Business overview and settings', color: '#7c3aed' },
        { role: 'ADMIN', label: 'Platform Admin', desc: 'System-wide configuration', color: '#dc2626' },
    ];

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        // Pre-fill email sometimes helps in demo, but let's leave it blank as requested
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isDemoMode) {
                // In Demo Mode: We pretend to check creds, then just log them in as the selected role
                if (!selectedRole) return; // Should not happen

                // Optional: Validate they typed *something*
                if (!email || !password) {
                    throw new Error('Please enter email and password.');
                }

                await demoLogin(selectedRole);
                // Redirect will happen in context/action
            } else {
                // Real Mode: Cognito
                await cognitoLogin({ username: email, password });
                router.push('/member/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    // Render Logic
    // If Real Mode -> Show Form (Generic)
    // If Demo Mode -> Show Role List -> Then Form

    const showForm = !isDemoMode || selectedRole;

    // ... logic remains same ...

    // UI Transformation
    return (
        <div className={styles.container}>
            <div className={styles.content}>

                {/* Header Section */}
                {!showForm && (
                    <>
                        <h1 className={styles.title}>TRAINUP</h1>
                        <p className={styles.subtitle}>Select your access portal</p>

                        {isDemoMode && (
                            <div className={styles.demoBanner}>
                                DEMO MODE ACTIVE
                            </div>
                        )}

                        <div className={styles.roleGrid}>
                            {roles.map((item) => (
                                <div
                                    key={item.role}
                                    className={styles.roleCard}
                                    onClick={() => handleRoleSelect(item.role)}
                                >
                                    <div className={styles.roleIcon}>
                                        {item.role === 'MEMBER' && '🏃'}
                                        {item.role === 'TRAINER' && '⚡'}
                                        {item.role === 'GYM' && '🏢'}
                                        {item.role === 'ADMIN' && '🛡️'}
                                    </div>
                                    <div className={styles.roleInfo}>
                                        <span className={styles.roleName}>{item.label}</span>
                                        <span className={styles.roleDesc}>{item.desc}</span>
                                    </div>
                                    <div className={styles.chevron}>→</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Login Form Section (Animated) */}
                {showForm && (
                    <div className={styles.formContainer}>
                        {isDemoMode && (
                            <button className={styles.backBtn} onClick={() => setSelectedRole(null)}>
                                ← Change Portal
                            </button>
                        )}

                        <h2 className={styles.title} style={{ fontSize: '1.75rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                            {isDemoMode ? `Hello, ${roles.find(r => r.role === selectedRole)?.label}` : 'Welcome Back'}
                        </h2>

                        <form onSubmit={handleLoginSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email Access Key</label>
                                <input
                                    type="email"
                                    required
                                    className={styles.input}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Passcode</label>
                                <input
                                    type="password"
                                    required
                                    className={styles.input}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                                    {error}
                                </div>
                            )}

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? 'AUTHENTICATING...' : 'ENTER PORTAL'}
                            </button>

                            {isDemoMode && (
                                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                                    Demo Environment: Any credentials accepted.
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
