'use client';

import React from 'react';

export default function LiveSessionCard() {
    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Image Area */}
            <div style={{
                height: '160px',
                background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Simulated Video Thumbnail */}
                <span style={{ fontSize: '3rem' }}>🧘‍♀️</span>

                <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: '#dc2626', color: 'white',
                    padding: '0.25rem 0.75rem', borderRadius: '99px',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px',
                    display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                    <span style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></span>
                    LIVE NOW
                </div>
            </div>

            {/* Content Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Morning Flow Yoga</h3>
                        <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.9rem' }}>with Sarah Mitchell</p>
                    </div>
                    <div style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#4b5563' }}>
                        45m
                    </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                    <button style={{
                        flex: 1, background: '#4f46e5', color: 'white', border: 'none', padding: '0.75rem',
                        borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }}>
                        <span>▶</span> Join Live
                    </button>
                    <button style={{
                        width: '48px', background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                    }}>
                        💬
                    </button>
                </div>
            </div>
        </div>
    );
}
