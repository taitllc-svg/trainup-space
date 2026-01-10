'use client';

import React, { useState } from 'react';
import styles from './BookingRequestModal.module.css';

interface BookingRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { date: Date; notes: string; location: string }) => Promise<void>;
    trainerName: string;
}

export default function BookingRequestModal({ isOpen, onClose, onSubmit, trainerName }: BookingRequestModalProps) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('Gym');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Combine date and time
        const dateTime = new Date(`${date}T${time}`);

        await onSubmit({ date: dateTime, notes, location });
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Request Session with {trainerName}</h3>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label>Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Time</label>
                        <input
                            type="time"
                            required
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Location Preference</label>
                        <select value={location} onChange={e => setLocation(e.target.value)}>
                            <option value="Gym">Main Gym Floor</option>
                            <option value="Studio">Private Studio</option>
                            <option value="Remote">Video Call (Remote)</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Notes / Goals</label>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="E.g. Focus on deadlifts today..."
                        />
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
                        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                            {isSubmitting ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
