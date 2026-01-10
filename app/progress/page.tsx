import React from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import DashboardGrid from '@/components/Dashboard/DashboardGrid';
import StatsCard from '@/components/Dashboard/StatsCard';
import WeightChart from '@/components/Progress/WeightChart';

export default function ProgressPage() {
    // Mock Data for Body Comp
    const bodyCompStats = [
        { title: "Current Weight", value: "175 lbs", trend: "-2.1%", trendUp: false },
        { title: "Body Fat", value: "14.2%", trend: "-0.5%", trendUp: false },
        { title: "Muscle Mass", value: "142 lbs", trend: "+1.2%", trendUp: true },
        { title: "BMI Score", value: "22.4", trend: "Normal", trendUp: true },
    ];

    return (
        <div className="container">
            <PageHeader
                title="Your Progress"
                description="Track your transformation journey."
            />

            <DashboardGrid>
                {/* Row 1: Key Stats - Reusing HeroStats vibe but with StatsCards */}
                {bodyCompStats.map((stat, i) => (
                    <StatsCard
                        key={i}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        trendDirection={stat.trendUp ? 'up' : 'down'}
                    />
                ))}

                {/* Row 2: Charts & Details */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <WeightChart />
                </div>

                {/* Row 3: Recent Measurements Log (Placeholder for now) */}
                <div style={{
                    gridColumn: '1 / -1',
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid #f0f0f0'
                }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Recent Measurements</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem' }}>Date</th>
                                <th style={{ padding: '0.75rem' }}>Weight</th>
                                <th style={{ padding: '0.75rem' }}>Chest</th>
                                <th style={{ padding: '0.75rem' }}>Waist</th>
                                <th style={{ padding: '0.75rem' }}>Arms</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: 'Apr 01', w: '175 lbs', c: '42"', wa: '32"', a: '15"' },
                                { date: 'Mar 15', w: '177 lbs', c: '41.8"', wa: '32.5"', a: '14.8"' },
                                { date: 'Mar 01', w: '178 lbs', c: '41.5"', wa: '33"', a: '14.5"' },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '0.75rem', color: '#666' }}>{row.date}</td>
                                    <td style={{ padding: '0.75rem', fontWeight: 500 }}>{row.w}</td>
                                    <td style={{ padding: '0.75rem' }}>{row.c}</td>
                                    <td style={{ padding: '0.75rem' }}>{row.wa}</td>
                                    <td style={{ padding: '0.75rem' }}>{row.a}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardGrid>
        </div>
    );
}
