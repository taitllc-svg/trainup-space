'use client';

import React, { use } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import StatsCard from '@/components/Dashboard/StatsCard';

// Mock Data Store for Profiles
const MOCK_PROFILES: Record<string, any> = {
    'demo': {
        name: "Demo User",
        joined: "January 2026",
        badges: ["Early Adopter", "Verified", "Challenge Winner"],
        bio: "Fitness enthusiast loving the journey! 🌱",
        stats: [
            { title: "Workouts", value: "42", icon: "🏋️‍♂️" },
            { title: "Points", value: "4,250", icon: "⭐" },
            { title: "Streak", value: "5 Days", icon: "🔥" }
        ]
    },
    'sarah': {
        name: "Sarah J.",
        joined: "December 2025",
        badges: ["Pro Trainer", "Verified"],
        bio: "Yoga Instructor and Mindfulness Coach.",
        stats: [
            { title: "Classes Taught", value: "150+", icon: "🧘‍♀️" },
            { title: "Students", value: "340", icon: "👥" },
            { title: "Rating", value: "4.9", icon: "⭐" }
        ]
    }
};

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
    // Unwrap params using React.use() or await if async component (Next.js 15)
    // Since this is a client component, we should strictly unwrap it if it's passed as a promise, 
    // but in Next.js 15 App Router, Page props are Promises.
    // However, for simplicity in "Client Component" usage, we can use `use` hook.

    // Workaround for Next.js 15 params type in synchronous-looking client component:
    const resolvedParams = use(params);
    const username = resolvedParams.username.toLowerCase();

    // Fallback to 'demo' if not found or just use capitalized slug as name
    const profile = MOCK_PROFILES[username] || {
        name: resolvedParams.username,
        joined: "Just Joined",
        badges: ["New Member"],
        bio: "New to Trainup.space!",
        stats: [
            { title: "Workouts", value: "0", icon: "🏋️‍♂️" },
            { title: "Points", value: "0", icon: "⭐" }
        ]
    };

    return (
        <div className="container">
            <PageHeader
                title={profile.name}
                description={`Member since ${profile.joined}`}
                action={<button style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: 'white',
                    cursor: 'pointer'
                }}>Add Friend</button>}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Profile Card */}
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    border: '1px solid #f0f0f0',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px', height: '100px',
                        background: '#f3f4f6', borderRadius: '50%',
                        margin: '0 auto 1rem auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.5rem'
                    }}>
                        {profile.name.charAt(0)}
                    </div>
                    <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
                        {profile.bio}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {profile.badges.map((badge: string) => (
                            <span key={badge} style={{
                                background: '#e0f2fe', color: '#0369a1',
                                padding: '0.25rem 0.75rem', borderRadius: '999px',
                                fontSize: '0.85rem', fontWeight: 600
                            }}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div>
                    <h3 style={{ marginBottom: '1rem' }}>Public Stats</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {profile.stats.map((stat: any, i: number) => (
                            <StatsCard
                                key={i}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
