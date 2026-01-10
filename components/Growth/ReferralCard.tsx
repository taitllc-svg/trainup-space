'use client';

import React from 'react';

export default function ReferralCard() {
    const referralCode = "TRAIN-PD-2026";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
        alert("Referral code copied!");
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
            borderRadius: '16px',
            padding: '1.5rem',
            color: 'white',
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 20%)',
                pointerEvents: 'none'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700 }}>Give $20, Get $20</h3>
                        <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
                            Invite friends to Trainup.space. You both earn credits when they join!
                        </p>
                    </div>
                    <div style={{ fontSize: '2rem' }}>🎁</div>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <code style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '1px' }}>{referralCode}</code>
                    <button
                        onClick={copyToClipboard}
                        style={{
                            background: 'white',
                            color: '#4f46e5',
                            border: 'none',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}
