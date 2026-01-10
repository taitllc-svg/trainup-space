'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';
import PageHeader from '@/components/PageHeader/PageHeader';

export default function LoginPage() {
    const { demoLogin, cognitoLogin, isDemoMode } = useAuth();
    const router = useRouter();

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

    return (
        <div className="container" style={{ maxWidth: '480px', margin: '4rem auto', padding: '0 1rem' }}>
            <PageHeader title="Trainup.space" description="Access Portal" />

            {isDemoMode && !selectedRole && (
                <>
                    <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f4f4f5', color: '#18181b', border: '1px solid #e4e4e7', borderRadius: '6px', fontSize: '0.9rem', textAlign: 'center' }}>
                        <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.25rem', color: '#ea580c' }}>DEMO MODE ACTIVE</span>
                        Select a portal to access.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        {roles.map((item) => (
                            <button
                                key={item.role}
                                onClick={() => handleRoleSelect(item.role)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1.25rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left'
                                }}
                            >
                                <div>
                                    <span style={{ display: 'block', fontWeight: 700, color: item.role === 'MEMBER' ? 'var(--primary)' : 'var(--foreground)' }}>
                                        {item.label}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>{item.desc}</span>
                                </div>
                                <div style={{ fontSize: '1.25rem', color: 'var(--secondary)' }}>&rarr;</div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {showForm && (
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    position: 'relative'
                }}>
                    {isDemoMode && (
                        <button
                            onClick={() => setSelectedRole(null)}
                            style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>
                            &larr; Back
                        </button>
                    )}

                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', textAlign: 'center', marginTop: isDemoMode ? '0.5rem' : '0' }}>
                        {isDemoMode ? `Login as ${roles.find(r => r.role === selectedRole)?.label}` : 'Sign In'}
                    </h2>

                    <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <div style={{ color: '#dc2626', fontSize: '0.9rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '1rem',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: loading ? 'wait' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Please wait...' : 'Sign In'}
                        </button>
                    </form>

                    {isDemoMode && (
                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#888', fontStyle: 'italic' }}>
                            (Demo Mode: Enter any email/password)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
