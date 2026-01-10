'use client';

import React, { useEffect } from 'react';

interface BookingConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    className: string;
}

export default function BookingConfirmation({ isOpen, onClose, className }: BookingConfirmationProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10b981',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'slideUp 0.3s ease-out'
        }}>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>Success!</h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>You have successfully booked {className}.</p>
        </div>
    );
}
