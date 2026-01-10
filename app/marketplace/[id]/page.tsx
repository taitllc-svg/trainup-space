'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockStore, Trainer } from '@/utils/mockStore';
import BookingRequestModal from '@/components/Booking/BookingRequestModal';
import { createBookingRequest } from '@/app/actions/booking';

export default function TrainerProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const t = mockStore.getTrainer(params.id as string);
        if (t) setTrainer(t);
    }, [params.id]);

    const handleBookingSubmit = async (data: { date: Date; notes: string; location: string }) => {
        if (!trainer) return;

        const result = await createBookingRequest({
            trainerId: trainer.id,
            date: data.date,
            notes: data.notes
        });

        if (result.success) {
            alert('Booking Requested! Check your dashboard.');
            router.push('/member/dashboard');
        } else {
            alert('Failed to book: ' + result.error);
        }
    };

    if (!trainer) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            <Link href="/marketplace" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>
                &larr; Back to Marketplace
            </Link>

            <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{
                        width: '120px', height: '120px',
                        borderRadius: '50%', background: 'var(--secondary)',
                        color: 'white', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '3rem', fontWeight: 700
                    }}>
                        {trainer.name.charAt(0)}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{trainer.name}</h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '1rem' }}>{trainer.location}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {trainer.specialties.map(s => (
                                <span key={s} style={{ background: '#f4f4f5', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>${trainer.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--secondary)' }}>/hr</span></div>
                        <div style={{ color: '#eab308', marginBottom: '1rem' }}>{'⭐'.repeat(Math.round(trainer.rating))} ({trainer.rating})</div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                display: 'inline-block',
                                background: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '6px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}>
                            Request Booking
                        </button>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>About</h2>
                    <p style={{ lineHeight: '1.6', color: 'var(--foreground)' }}>{trainer.bio}</p>

                    <h2 style={{ fontSize: '1.25rem', margin: '2rem 0 1rem' }}>Availability (Placeholder)</h2>
                    <div style={{
                        height: '200px',
                        background: '#fafafa',
                        border: '2px dashed #e5e5e5',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#a1a1aa'
                    }}>
                        Interactive Calendar would go here.
                    </div>
                </div>
            </div>

            <BookingRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleBookingSubmit}
                trainerName={trainer.name}
            />
        </div>
    );
}
