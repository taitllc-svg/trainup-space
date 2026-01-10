'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader/PageHeader';
import FilterBar from '@/components/Booking/FilterBar';
import ClassCard from '@/components/Booking/ClassCard';
import BookingConfirmation from '@/components/Booking/BookingConfirmation';
import DashboardGrid from '@/components/Dashboard/DashboardGrid';
import { mockStore, ClassSession } from '@/utils/mockStore';

export const dynamic = 'force-dynamic';

function BookingContent() {
    const searchParams = useSearchParams();
    const trainerId = searchParams.get('trainerId');
    const [trainerName, setTrainerName] = useState<string | null>(null);

    const [classes, setClasses] = useState<ClassSession[]>([]);
    const [bookedIds, setBookedIds] = useState<string[]>([]);
    const [category, setCategory] = useState('All');
    const [confirmation, setConfirmation] = useState<{ open: boolean; className: string }>({ open: false, className: '' });

    // Initial load
    useEffect(() => {
        // Resolve trainer if ID exists
        if (trainerId) {
            const t = mockStore.getTrainer(trainerId);
            if (t) setTrainerName(t.name);
        }

        setClasses(mockStore.getClasses());
        setBookedIds(mockStore.getUserBookings().map(b => b.id));
    }, [trainerId]);

    const handleBook = (id: string) => {
        const success = mockStore.bookClass(id);
        if (success) {
            // Update local state
            setClasses([...mockStore.getClasses()]); // Force refresh from store
            setBookedIds(mockStore.getUserBookings().map(b => b.id));

            const bookedClass = classes.find(c => c.id === id);
            if (bookedClass) {
                setConfirmation({ open: true, className: bookedClass.title });
            }
        }
    };

    const categories = Array.from(new Set(classes.map(c => c.category)));

    // Multi-stage Filter
    const filteredClasses = classes.filter(c => {
        // Filter by Category
        const matchCategory = category === 'All' || c.category === category;

        // Filter by Trainer (if selected)
        const matchTrainer = trainerName ? c.instructor === trainerName : true;

        return matchCategory && matchTrainer;
    });

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <PageHeader
                title={trainerName ? `Booking: ${trainerName}` : "Class Schedule"}
                description={trainerName ? "Showing sessions for this trainer." : "Find and book your next session."}
            />

            {trainerName && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f4f4f5', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                    <span>Filtering by <strong>{trainerName}</strong></span>
                    <a href="/booking" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>Clear Filter</a>
                </div>
            )}

            <FilterBar
                categories={categories}
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            {/* Platform Protection Badge */}
            <div style={{
                margin: '1.5rem 0',
                padding: '0.75rem 1rem',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#065f46',
                fontSize: '0.9rem'
            }}>
                <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                <span>
                    <strong>Trainup Protected:</strong> Bookings made on this platform are 100% verified and insured.
                    <span style={{ marginLeft: '0.5rem', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.8 }}>Learn more</span>
                </span>
            </div>

            <BookingConfirmation
                isOpen={confirmation.open}
                onClose={() => setConfirmation({ ...confirmation, open: false })}
                className={confirmation.className}
            />

            <DashboardGrid>
                {filteredClasses.map(cls => (
                    <ClassCard
                        key={cls.id}
                        {...cls}
                        isBooked={bookedIds.includes(cls.id)}
                        onBook={handleBook}
                    />
                ))}
            </DashboardGrid>

            {filteredClasses.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--secondary)' }}>
                    {trainerName
                        ? `No upcoming classes found for ${trainerName}.`
                        : "No classes found for this category."}
                </div>
            )}
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem' }}>Loading schedule...</div>}>
            <BookingContent />
        </Suspense>
    );
}
