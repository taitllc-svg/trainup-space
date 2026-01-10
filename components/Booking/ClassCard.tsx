'use client';

import React from 'react';
import styles from './ClassCard.module.css';

interface ClassCardProps {
    id: string;
    title: string;
    instructor: string;
    time: string;
    category: string;
    spotsLeft: number;
    price: string;
    isBooked: boolean;
    onBook: (id: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ id, title, instructor, time, category, spotsLeft, price, isBooked, onBook }) => {
    const isFull = spotsLeft === 0;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.category}>{category}</span>
                <span className={styles.price}>{price}</span>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.details}>
                <div className={styles.row}>
                    <span>Instructor:</span>
                    <span className={styles.value}>{instructor}</span>
                </div>
                <div className={styles.row}>
                    <span>Time:</span>
                    <span className={styles.value}>{time}</span>
                </div>
                <div className={styles.row}>
                    <span>Spots:</span>
                    <span className={`${styles.value} ${isFull ? styles.full : ''}`}>
                        {isFull ? 'Full' : `${spotsLeft} left`}
                    </span>
                </div>
            </div>
            <button
                className={`${styles.button} ${isBooked ? styles.booked : ''} ${isFull ? styles.disabled : ''}`}
                onClick={() => !isBooked && !isFull && onBook(id)}
                disabled={isBooked || isFull}
            >
                {isBooked ? 'Booked' : isFull ? 'Waitlist' : 'Book Class'}
            </button>
        </div>
    );
};

export default ClassCard;
