'use client';

import React from 'react';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onSelectCategory }: FilterBarProps) {
    return (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button
                onClick={() => onSelectCategory('All')}
                style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    background: selectedCategory === 'All' ? 'var(--foreground)' : 'var(--card-bg)',
                    color: selectedCategory === 'All' ? 'var(--card-bg)' : 'var(--foreground)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500
                }}
            >
                All
            </button>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid var(--border)',
                        background: selectedCategory === cat ? 'var(--foreground)' : 'var(--card-bg)',
                        color: selectedCategory === cat ? 'var(--card-bg)' : 'var(--foreground)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
