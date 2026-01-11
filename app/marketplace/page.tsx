'use client';

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import TrainerCard from '@/components/Marketplace/TrainerCard';
import TrainerFilters from '@/components/Marketplace/TrainerFilters';
import { mockStore, Trainer } from '@/utils/mockStore';
import Skeleton from '@/components/UI/Skeleton';

// Simple Gym Card Component for Phase 2
const GymCard = ({ gym }: any) => (
    <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid #eee',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>{gym.name}</h3>
            <span style={{
                background: '#e0f2fe', color: '#0369a1',
                padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem'
            }}>{gym.distance}</span>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{gym.amenities.join(' • ')}</p>
        <button style={{
            width: '100%', padding: '0.5rem', background: '#111827', color: 'white',
            border: 'none', borderRadius: '0.5rem', cursor: 'pointer'
        }}>View Details</button>
    </div>
);

export default function MarketplacePage() {
    const [viewMode, setViewMode] = useState<'trainers' | 'gyms'>('trainers');
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('All');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay for "Native App" feel
        const timer = setTimeout(() => {
            setTrainers(mockStore.getTrainers());
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Mock Gym Data
    const mockGyms = [
        { id: 1, name: "Metro Flex Gym", distance: "0.5 mi", amenities: ["24/7 Access", "Sauna", "Free Weights"] },
        { id: 2, name: "Iron Paradise", distance: "2.1 mi", amenities: ["Pool", "Classes", "Personal Training"] },
        { id: 3, name: "Urban Fitness", distance: "1.2 mi", amenities: ["Roof Deck", "Yoga Studio"] },
    ];

    // Extract all unique specialties
    const allSpecialties = Array.from(new Set(trainers.flatMap(t => t.specialties)));

    const toggleSpecialty = (spec: string) => {
        setSelectedSpecialties(prev =>
            prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
        );
    };

    // Filter Logic
    const filteredTrainers = trainers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.bio.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = location === 'All' || t.location === location;
        const matchesSpecialty = selectedSpecialties.length === 0 ||
            selectedSpecialties.some(s => t.specialties.includes(s));

        return matchesSearch && matchesLocation && matchesSpecialty;
    });

    return (
        <div className="container">
            <PageHeader
                title="Marketplace"
                description="Find trainers, gyms, and workout spaces."
                action={
                    <div style={{ display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
                        <button
                            onClick={() => setViewMode('trainers')}
                            style={{
                                padding: '0.5rem 1rem',
                                border: 'none',
                                background: viewMode === 'trainers' ? 'white' : 'transparent',
                                borderRadius: '6px',
                                boxShadow: viewMode === 'trainers' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            Trainers
                        </button>
                        <button
                            onClick={() => setViewMode('gyms')}
                            style={{
                                padding: '0.5rem 1rem',
                                border: 'none',
                                background: viewMode === 'gyms' ? 'white' : 'transparent',
                                borderRadius: '6px',
                                boxShadow: viewMode === 'gyms' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            Gyms
                        </button>
                    </div>
                }
            />

            {viewMode === 'trainers' ? (
                <>
                    <TrainerFilters
                        search={search}
                        setSearch={setSearch}
                        location={location}
                        setLocation={setLocation}
                        selectedSpecialties={selectedSpecialties}
                        toggleSpecialty={toggleSpecialty}
                        availableSpecialties={allSpecialties}
                    />

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem',
                        padding: '0 1rem'
                    }}>
                        {isLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} style={{ height: '420px', background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                    <Skeleton width="100%" height="220px" />
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <Skeleton width="70%" height="28px" borderRadius="6px" />
                                        <Skeleton width="40%" height="20px" borderRadius="4px" />
                                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <Skeleton width="25%" height="24px" borderRadius="100px" />
                                            <Skeleton width="25%" height="24px" borderRadius="100px" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            filteredTrainers.length > 0 ? (
                                filteredTrainers.map(trainer => (
                                    <TrainerCard key={trainer.id} trainer={trainer} />
                                ))
                            ) : (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--secondary)' }}>
                                    No trainers found matching your criteria.
                                </div>
                            )
                        )}
                    </div>
                </>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    padding: '0 1rem',
                    marginTop: '2rem'
                }}>
                    {mockGyms.map(gym => (
                        <GymCard key={gym.id} gym={gym} />
                    ))}
                </div>
            )}
        </div>
    );
}
