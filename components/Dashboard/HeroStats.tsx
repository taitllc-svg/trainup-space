'use client';

import React from 'react';

// Inline styles for speed/simplicity given the "Card" nature, or could use module.
// Let's use inline for the layout wrapper but cleaner styles for cards.

export interface HeroStat {
    label: string;
    value: string;
    sub?: string;
    icon: string;
    color: string;
    href?: string;
}

interface HeroStatsProps {
    stats?: HeroStat[];
}

import Link from 'next/link';

const StatCard = ({ label, value, sub, icon, color, href }: HeroStat) => {
    const CardContent = (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.02)',
            position: 'relative',
            overflow: 'hidden',
            cursor: href ? 'pointer' : 'default',
            height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
            <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                fontSize: '5rem', opacity: 0.05, fontWeight: 900, color: 'black'
            }}>
                {icon}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem'
                }}>
                    {icon}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#6b7280' }}>{label}</span>
            </div>

            <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{value}</div>
                {sub && <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 500 }}>{sub}</div>}
            </div>
        </div>
    );

    if (href) {
        return <Link href={href} style={{ textDecoration: 'none' }}>{CardContent}</Link>;
    }

    return CardContent;
};

export default function HeroStats({ stats }: HeroStatsProps) {
    // Default Member Stats if none provided
    const displayStats = stats || [
        { label: "Weekly Sessions", value: "4", sub: "On track for 5", icon: "🔥", color: "#f59e0b" },
        { label: "Active Trainers", value: "12", sub: "+3 new this week", icon: "👥", color: "#3b82f6" },
        { label: "Global Rank", value: "#42", sub: "Top 5% of members", icon: "🏆", color: "#8b5cf6" }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            width: '100%'
        }}>
            {displayStats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>
    );
}
