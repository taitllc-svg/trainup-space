import React from 'react';

interface AdWidgetProps {
    title: string;
    description: string;
    image: string;
    cta: string;
    sponsor: string;
}

export default function AdWidget({ title, description, image, cta, sponsor }: AdWidgetProps) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #f3f4f6',
            marginBottom: '1.5rem'
        }}>
            <div style={{ height: '140px', background: '#f3f4f6', position: 'relative' }}>
                {/* Fallback Image / Placeholder */}
                <div style={{
                    width: '100%', height: '100%',
                    background: `url(${image}) center/cover no-repeat`,
                    backgroundColor: '#e5e7eb'
                }}></div>

                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                }}>
                    Sponsored
                </div>
            </div>

            <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 600 }}>
                    {sponsor}
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                    {title}
                </h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.4' }}>
                    {description}
                </p>
                <button style={{
                    width: '100%',
                    padding: '0.6rem',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#111827',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}>
                    {cta} →
                </button>
            </div>
        </div>
    );
}
