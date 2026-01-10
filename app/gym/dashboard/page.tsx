'use client';

import React from 'react';
import RouteGuard from '@/components/Auth/RouteGuard';
import HeroStats, { HeroStat } from '@/components/Dashboard/HeroStats';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { useAuth } from '@/lib/auth-context';

const mockTraffic = [
    { time: '6am', count: 12 },
    { time: '9am', count: 45 },
    { time: '12pm', count: 30 },
    { time: '3pm', count: 25 },
    { time: '5pm', count: 85 },
    { time: '6pm', count: 95 },
    { time: '7pm', count: 70 },
    { time: '9pm', count: 40 },
];

const gymStats: HeroStat[] = [
    { label: "Total Members", value: "1,245", sub: "+15 this week", icon: "💳", color: "#3b82f6" },
    { label: "Active Now", value: "85", sub: "Peak Hours", icon: "⚡", color: "#ef4444" }, // Red for 'Hot'
    { label: "Revenue (MTD)", value: "$42.5k", sub: "+12% YoY", icon: "📈", color: "#10b981" },
];

export default function GymDashboard() {
    const { user } = useAuth();
    // if (!user) return <div style={{ padding: '3rem' }}>Loading access...</div>;

    const gymName = user?.username?.replace('Demo', '').trim() || 'Downtown Gym';

    return (
        <RouteGuard>
            <div style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '4rem' }}>
                <div className="container" style={{ padding: '2rem', maxWidth: '1200px' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                            {gymName} Dashboard
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>Facility overview and live metrics.</p>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <HeroStats stats={gymStats} />
                    </div>

                    {/* Main Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>

                        {/* Traffic & Activity */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Traffic Chart */}
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Live Traffic Today</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#ef4444', background: '#fee2e2', padding: '0.2rem 0.6rem', borderRadius: '99px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'block' }}></span>
                                        LIVE
                                    </span>
                                </div>
                                <div style={{ height: '300px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockTraffic}>
                                            <defs>
                                                <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Recent Check-ins */}
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.01)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#1f2937' }}>Recent Access</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { name: 'Alice Walker', status: 'Entry', time: '2 mins ago', plan: 'Premium' },
                                        { name: 'Bob Harris', status: 'Exit', time: '5 mins ago', plan: 'Basic' },
                                        { name: 'Charlie Kim', status: 'Entry', time: '12 mins ago', plan: 'Premium' },
                                    ].map((log, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: log.plan === 'Premium' ? '#dbeafe' : '#f1f5f9', color: log.plan === 'Premium' ? '#1e40af' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                                                    {log.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{log.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{log.plan} • {log.time}</div>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: log.status === 'Entry' ? '#16a34a' : '#ea580c' }}>
                                                {log.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar: Staff & Alerts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Staff on Duty (3)</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { name: 'Mike Ross', role: 'Trainer', avatar: 'M' },
                                        { name: 'Sarah J', role: 'Front Desk', avatar: 'S' },
                                        { name: 'Ben Ten', role: 'Maintenance', avatar: 'B' },
                                    ].map((staff, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{staff.avatar}</div>
                                            <div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{staff.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{staff.role}</div>
                                            </div>
                                            <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '16px', border: '1px solid #ffedd5' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 700, color: '#9a3412' }}>Maintenance Alert</h4>
                                <p style={{ fontSize: '0.85rem', color: '#c2410c', marginBottom: '1rem' }}>
                                    Treadmill #4 requires service. Reported by 2 members.
                                </p>
                                <button style={{ width: '100%', background: 'white', border: '1px solid #fed7aa', color: '#9a3412', padding: '0.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                                    Create Ticket
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
