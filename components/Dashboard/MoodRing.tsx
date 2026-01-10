'use client';

import React, { useState } from 'react';
import styles from './MoodRing.module.css';

export default function MoodRing() {
    const [energy, setEnergy] = useState(75);
    const [stress, setStress] = useState(30);

    // Calculate an abstract "Vibe Score"
    const score = Math.round((energy + (100 - stress)) / 2);

    // SVG Circle Math
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className={styles.container}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, alignSelf: 'flex-start' }}>Your State</h3>

            <div className={styles.ringWrapper}>
                <svg className={styles.ringSvg}>
                    <defs>
                        <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    <circle
                        className={`${styles.ringCircle} ${styles.ringBg}`}
                        cx="50%" cy="50%" r={radius}
                    />
                    <circle
                        className={`${styles.ringCircle} ${styles.ringValue}`}
                        cx="50%" cy="50%" r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>

                <div className={styles.innerContent}>
                    <div className={styles.score}>{score}</div>
                    <div className={styles.label}>Readiness</div>
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabel}>
                        <span>Energy</span>
                        <span>{energy}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={energy}
                        onChange={(e) => setEnergy(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>
                <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabel}>
                        <span>Stress</span>
                        <span>{stress}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={stress}
                        onChange={(e) => setStress(Number(e.target.value))}
                        className={styles.slider}
                    />
                </div>
            </div>
        </div>
    );
}
