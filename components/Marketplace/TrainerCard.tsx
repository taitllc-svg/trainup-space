'use client';

import React from 'react';
import Link from 'next/link';
import { Trainer } from '@/utils/mockStore';
import styles from './TrainerCard.module.css';

interface TrainerCardProps {
    trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatarPlaceholder}>
                    {trainer.name.charAt(0)}
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>
                        {trainer.name}
                        {trainer.isVerified && <span className={styles.verifiedBadge} title="Verified Trainer">✓</span>}
                    </h3>
                    <div className={styles.rating}>
                        ⭐ {trainer.rating} <span className={styles.reviewCount}>({trainer.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <div className={styles.specialties}>
                {trainer.specialties.map(s => (
                    <span key={s} className={styles.pill}>{s}</span>
                ))}
            </div>

            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Location</span>
                    <span>{trainer.location}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.label}>Rate</span>
                    <span>${trainer.price}/hr</span>
                </div>
            </div>

            <div className={styles.actions}>
                <Link href={`/marketplace/${trainer.id}`} className={styles.profileLink}>
                    View Profile
                </Link>
                <Link href={`/booking?trainerId=${trainer.id}`} className={styles.bookBtn}>
                    Request Booking
                </Link>
            </div>
        </div>
    );
};

export default TrainerCard;
