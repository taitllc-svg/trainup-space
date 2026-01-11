'use client';

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

// New Components
import HeroStats from '@/components/Dashboard/HeroStats';
import MoodRing from '@/components/Dashboard/MoodRing';

import ReferralCard from '@/components/Growth/ReferralCard';
import AdWidget from '@/components/Monetization/AdWidget';
import Skeleton from '@/components/UI/Skeleton';

// ... imports
import RouteGuard from '@/components/Auth/RouteGuard';

export default function MemberDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Mock loading time
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Safety check mostly for demo context
    // if (!user) return <div style={{ minHeight: '100vh', background: '#f9fafb' }}></div>; // RouteGuard handles this now

    const firstName = user?.username ? user.username.split(' ')[0] : 'Member';

    return (
        <RouteGuard>
            <div style={{ background: '#f9fafb', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="container page-content" style={{ flex: 1 }}>
                    {/* ... content ... */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                            Good Morning, {firstName} ☀️
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>Ready to crush your goals today?</p>
                    </div>

                    {/* ... rest of the dashboard ... */}
                    {/* Hero Stats */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        {isLoading ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                <Skeleton height="140px" borderRadius="16px" />
                                <Skeleton height="140px" borderRadius="16px" />
                                <Skeleton height="140px" borderRadius="16px" />
                            </div>
                        ) : (
                            <HeroStats stats={[
                                { label: "Weekly Sessions", value: "4", sub: "On track for 5", icon: "🔥", color: "#f59e0b", href: "/booking" },
                                { label: "Active Trainers", value: "12", sub: "+3 new this week", icon: "👥", color: "#3b82f6", href: "/marketplace" },
                                { label: "Global Rank", value: "#42", sub: "Top 5% of members", icon: "🏆", color: "#8b5cf6", href: "/competition" }
                            ]} />
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 2fr)) 1fr',
                        gap: '2rem',
                        alignItems: 'start'
                    }}>
                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#1f2937' }}>Today&apos;s Schedule</h3>
                                <div style={{
                                    background: 'white', borderRadius: '16px', padding: '1.5rem',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #f3f4f6',
                                    display: 'flex', alignItems: 'center', gap: '1.5rem'
                                }}>
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        background: '#f3f4f6', padding: '0.75rem', borderRadius: '12px', minWidth: '70px'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>OCT</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>24</span>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>HIIT & Strength</h4>
                                        <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>10:00 AM • Gym Floor B</p>
                                    </div>

                                    <button style={{
                                        background: 'white', border: '1px solid #e5e7eb', padding: '0.5rem 1rem',
                                        borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                                    }}>
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            <MoodRing />
                            <AdWidget
                                title="Summer Shred Event"
                                description="Get 50% off GymShark gear this week only. Use code TRAINUP."
                                image="https://placehold.co/600x400/111827/FFF?text=GS+Sale"
                                cta="Shop Now"
                                sponsor="GymShark"
                            />
                            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #f3f4f6' }}>
                                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Member Perks 💎</h4>
                                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span>🍏 Local Juice Bar</span>
                                        <span style={{ color: '#10b981', fontWeight: 600 }}>20% Off</span>
                                    </li>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span>💆‍♀️ Zen Spa</span>
                                        <span style={{ color: '#10b981', fontWeight: 600 }}>Free Add-on</span>
                                    </li>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                        <span>👟 Nike Town</span>
                                        <span style={{ color: '#10b981', fontWeight: 600 }}>10% Off</span>
                                    </li>
                                </ul>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ background: '#4f46e5', padding: '1.25rem', borderRadius: '16px', color: 'white' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>12</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Workouts</div>
                                </div>
                                <div style={{ background: '#10b981', padding: '1.25rem', borderRadius: '16px', color: 'white' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>450</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>kCal Burned</div>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/marketplace')}
                                style={{
                                    background: 'white', color: '#4f46e5', border: '2px dashed #c7d2fe',
                                    padding: '1rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                + Book New Session
                            </button>
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <ReferralCard />
                </div>
            </div>
        </div>
        </RouteGuard >
    );
}
