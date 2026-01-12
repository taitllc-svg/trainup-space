'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import DashboardGrid from '@/components/Dashboard/DashboardGrid';
import HeroStats, { HeroStat } from '@/components/Dashboard/HeroStats';
import { getTrainerBookings, updateBookingStatus } from '@/app/actions/booking';
import { useAuth } from '@/lib/auth-context';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Mock Data for the Demo Chart
const revenueData = [
    { name: 'Mon', income: 120 },
    { name: 'Tue', income: 250 },
    { name: 'Wed', income: 180 },
    { name: 'Thu', income: 300 },
    { name: 'Fri', income: 200 },
    { name: 'Sat', income: 450 },
    { name: 'Sun', income: 380 },
];
import RouteGuard from '@/components/Auth/RouteGuard';

export default function TrainerDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!user) return;

        async function fetchData() {
            if (!user || !user.id) return;

            // Use the real DB ID
            const res = await getTrainerBookings(user.id);
            if (res.success) {
                setBookings(res.bookings || []);
            }
            setLoading(false);
        }
        fetchData();
    }, [user]);

    // if (!user) return <div style={{ padding: '3rem' }}>Loading...</div>; // Handled by RouteGuard

    const firstName = user?.username ? user.username.split(' ')[0] : 'Coach';

    // Sort so REQUESTED is first
    const sortedBookings = [...bookings].sort((a, b) => {
        if (a.status === 'REQUESTED' && b.status !== 'REQUESTED') return -1;
        if (a.status !== 'REQUESTED' && b.status === 'REQUESTED') return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const pendingCount = bookings.filter(b => b.status === 'REQUESTED').length;

    const trainerStats: HeroStat[] = [
        { label: "Active Clients", value: "14", sub: "+3 new this month", icon: "👥", color: "#3b82f6" },
        { label: "Pending Requests", value: pendingCount.toString(), sub: pendingCount > 0 ? "Action Needed" : "All Clear", icon: "🔔", color: pendingCount > 0 ? "#ef4444" : "#10b981" },
        { label: "Est. Earnings", value: "$4,250", sub: "+12% vs last month", icon: "💰", color: "#10b981" },
    ];

    return (
        <RouteGuard>
            <div style={{ background: '#f9fafb', minHeight: '100dvh', paddingBottom: '4rem' }}>
                <div className="container" style={{ padding: '2rem', maxWidth: '1200px' }}>
                    {/* ... content ... */}
                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                                Trainer Dashboard
                            </h1>
                            <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>Good Morning, {firstName}. Ready to train?</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                Manage Schedule
                            </button>
                            <button style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
                                + New Client
                            </button>
                        </div>
                    </div>

                    {/* Hero Stats */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <HeroStats stats={trainerStats} />
                    </div>

                    {/* Main Grid: Content + Sidebar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>

                        {/* Main Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Revenue Chart */}
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Weekly Revenue</h3>
                                    <select style={{ padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.85rem' }}>
                                        <option>This Week</option>
                                        <option>Last Week</option>
                                    </select>
                                </div>
                                <div style={{ height: '300px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <defs>
                                                <linearGradient id="colorIncome2" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="income" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome2)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Booking Requests */}
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#1f2937' }}>Session Requests</h3>
                                {sortedBookings.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {sortedBookings.map(b => (
                                            <div key={b.id} style={{
                                                position: 'relative',
                                                padding: '1.25rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6',
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.01)', overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                                                    background: b.status === 'REQUESTED' ? '#ef4444' : (b.status === 'CONFIRMED' ? '#10b981' : '#e5e7eb')
                                                }} />

                                                <div style={{ paddingLeft: '1rem' }}>
                                                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111827' }}>
                                                        {b.member.name}
                                                        {b.status === 'REQUESTED' && <span style={{ fontSize: '0.7rem', background: '#fee2e2', color: '#dc2626', padding: '0.15rem 0.5rem', borderRadius: '99px', fontWeight: 700, letterSpacing: '0.5px' }}>NEW</span>}
                                                    </div>
                                                    <div style={{ fontSize: '0.9rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span>📅 {new Date(b.date).toLocaleDateString()}</span>
                                                        <span style={{ color: '#e5e7eb' }}>|</span>
                                                        <span>⏰ {new Date(b.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    {b.status === 'REQUESTED' ? (
                                                        <>
                                                            <button
                                                                onClick={async () => {
                                                                    await updateBookingStatus(b.id, 'DECLINED');
                                                                    window.location.reload();
                                                                }}
                                                                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563' }}>
                                                                Decline
                                                            </button>
                                                            <button
                                                                onClick={async () => {
                                                                    await updateBookingStatus(b.id, 'CONFIRMED');
                                                                    window.location.reload();
                                                                }}
                                                                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)' }}>
                                                                Accept Request
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span style={{
                                                            fontWeight: 600, fontSize: '0.85rem', padding: '0.25rem 0.75rem', borderRadius: '99px',
                                                            background: b.status === 'CONFIRMED' ? '#dcfce7' : '#f3f4f6',
                                                            color: b.status === 'CONFIRMED' ? '#166534' : '#6b7280'
                                                        }}>
                                                            {b.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ padding: '3rem', background: 'white', borderRadius: '16px', textAlign: 'center', color: '#6b7280', border: '2px dashed #e5e7eb' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.5 }}>📭</div>
                                        No pending session requests.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>


                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1f2937' }}>Tasks</h4>
                                    <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '0.1rem 0.5rem', borderRadius: '99px' }}>3 Pending</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {['Update availability', 'Upload invoice #1024', 'Message New Client'].map((task, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#4b5563' }}>
                                            <input type="checkbox" defaultChecked={i === 1} style={{ width: '1.2rem', height: '1.2rem', accentColor: '#4f46e5', cursor: 'pointer' }} />
                                            <span style={{ textDecoration: i === 1 ? 'line-through' : 'none', opacity: i === 1 ? 0.6 : 1 }}>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </RouteGuard>
    );
}
