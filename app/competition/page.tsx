import React from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import Leaderboard from '@/components/Competition/Leaderboard';
import StatsCard from '@/components/Dashboard/StatsCard';

export default function CompetitionPage() {
    const leaderboardData = [
        { rank: 1, name: "Sarah J.", points: 12500 },
        { rank: 2, name: "Mike T.", points: 11200 },
        { rank: 3, name: "Emma W.", points: 10850 },
        { rank: 4, name: "David L.", points: 9500 },
        { rank: 5, name: "Chris P.", points: 9100 },
        { rank: 42, name: "Demo User", points: 4250, isCurrentUser: true },
    ];

    return (
        <div className="container">
            <PageHeader
                title="Spring Challenge 🏆"
                description="Compete with the community and win prizes!"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                {/* Main Column: Challenge Info & Leaderboard */}
                <div>
                    {/* Prize Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        color: '#4a3b00',
                        marginBottom: '2rem',
                        boxShadow: '0 10px 20px rgba(253, 185, 49, 0.2)'
                    }}>
                        <h2 style={{ marginTop: 0 }}>🥇 1st Prize: 1 Month Free Training</h2>
                        <p style={{ margin: 0, opacity: 0.9 }}>Top the leaderboard by April 30th to win personalized coaching sessions.</p>
                    </div>

                    <h3 style={{ marginBottom: '1rem' }}>Global Leaderboard</h3>
                    <Leaderboard data={leaderboardData} />
                </div>

                {/* Sidebar: My Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <StatsCard
                        title="Your Rank"
                        value="#42"
                        trend="+3"
                        trendDirection="up"
                    />
                    <StatsCard
                        title="Total Points"
                        value="4,250"
                        trend="+150 this week"
                        trendDirection="up"
                    />
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid #f0f0f0'
                    }}>
                        <h4>How to earn points?</h4>
                        <ul style={{ paddingLeft: '1.2rem', color: '#666', lineHeight: '1.6' }}>
                            <li>Complete a workout (100 pts)</li>
                            <li>Join a live session (200 pts)</li>
                            <li>Log a PR (500 pts)</li>
                            <li>Share a progress photo (150 pts)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
