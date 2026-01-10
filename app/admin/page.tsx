'use client';

import React from 'react';
import RouteGuard from '@/components/Auth/RouteGuard';
import HeroStats, { HeroStat } from '@/components/Dashboard/HeroStats';
import { useAuth } from '@/lib/auth-context';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

const adminStats: HeroStat[] = [
    { label: "Partner Revenue (Residuals)", value: "$1.2M", sub: "+8% this quarter", icon: "💰", color: "#10b981" },
    { label: "Total Users", value: "24.5k", sub: "+120 today", icon: "🌍", color: "#3b82f6" },
    { label: "Churn Rate", value: "2.1%", sub: "-0.5% vs last month", icon: "📉", color: "#8b5cf6" },
];

const mockSubs = [
    { name: 'Basic', count: 12000 },
    { name: 'Pro', count: 8500 },
    { name: 'Elite', count: 4000 },
];

export default function AdminPage() {
    const { user } = useAuth();
    // if (!user) return <div style={{ padding: '3rem' }}>Loading admin...</div>;

    return (
        <RouteGuard>
            <div style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '4rem' }}>
                <div className="container" style={{ padding: '2rem', maxWidth: '1200px' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                            Platform Admin
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>System-wide performance and health.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <HeroStats stats={adminStats} />
                    </div>

                    {/* Main Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>

                        {/* Global Map / Big Visual */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ padding: '2rem', background: '#1e293b', borderRadius: '16px', color: 'white', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                {/* Decorative Map Dots */}
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                <h3 style={{ position: 'relative', zIndex: 1, fontSize: '1.5rem', fontWeight: 700 }}>Global User Activity</h3>
                                <div style={{ position: 'relative', zIndex: 1, marginTop: '1rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#60a5fa' }}>12k</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>North America</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a78bfa' }}>8.5k</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Europe</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399' }}>4k</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Asia Pacific</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '2rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '0.85rem' }}>
                                    Live Data Stream • Updated 2s ago
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#1f2937' }}>Subscription Distribution</h3>
                                <div style={{ height: '200px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={mockSubs} layout="vertical">
                                            <XAxis type="number" hide />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                                                {mockSubs.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#94a3b8', '#60a5fa', '#1d4ed8'][index]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* System Status */}
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>System Health</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>API Uptime</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16a34a' }}>99.99%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '99px' }}>
                                        <div style={{ width: '99.9%', height: '100%', background: '#16a34a', borderRadius: '99px' }}></div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>Database Load</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>42%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '99px' }}>
                                        <div style={{ width: '42%', height: '100%', background: '#3b82f6', borderRadius: '99px' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Alerts */}
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Recent Alerts</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { title: 'New Gym Onboarded', time: '1h ago', type: 'info' },
                                        { title: 'Payment Gateway Latency', time: '3h ago', type: 'warning' },
                                        { title: 'User Report #1023', time: '5h ago', type: 'error' },
                                    ].map((alert, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px',
                                                background: alert.type === 'error' ? '#ef4444' : (alert.type === 'warning' ? '#f59e0b' : '#3b82f6')
                                            }}></div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{alert.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{alert.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
