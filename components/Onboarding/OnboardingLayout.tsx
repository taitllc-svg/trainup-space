'use client';

import React from 'react';
import styles from './Onboarding.module.css';

interface OnboardingLayoutProps {
    title: string;
    subtitle: string;
    currentStep: number;
    totalSteps: number;
    children: React.ReactNode;
    onNext: () => void;
    onBack: () => void;
    nextLabel: string;
}

export default function OnboardingLayout({
    title,
    subtitle,
    currentStep,
    totalSteps,
    children,
    onNext,
    onBack,
    nextLabel
}: OnboardingLayoutProps) {
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {children}
                </div>

                {/* Footer / Actions */}
                <div className={styles.footer}>
                    {currentStep > 0 && (
                        <button onClick={onBack} className={styles.backBtn}>
                            Back
                        </button>
                    )}
                    <button onClick={onNext} className={styles.primaryBtn}>
                        {nextLabel}
                    </button>

                    <div className={styles.stepIndicator}>
                        Step {currentStep + 1} of {totalSteps}
                    </div>
                </div>
            </div>
        </div>
    );
}
