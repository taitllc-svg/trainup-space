'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';
import OnboardingLayout from '@/components/Onboarding/OnboardingLayout';
import { onboardingConfig } from '@/components/Onboarding/OnboardingConfig';
import styles from '@/components/Onboarding/Onboarding.module.css';

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    // Fallback if no user or role not found (Demo safety)
    const role = (user?.role || 'MEMBER') as UserRole;
    const config = onboardingConfig[role] || onboardingConfig['MEMBER'];

    // Safety check for invalid roles
    if (!config) return <div>Invalid Configuration</div>;

    const totalSteps = config.steps.length;
    const stepData = config.steps[currentStep];

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Complete!
            router.push(`/${role.toLowerCase()}/dashboard`);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <OnboardingLayout
            title={currentStep === 0 ? config.welcomeTitle : stepData.title}
            subtitle={currentStep === 0 ? config.welcomeSubtitle : ''}
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            nextLabel={currentStep === totalSteps - 1 ? "Finish" : stepData.actionLabel}
        >
            <div className="animate-fade-in-up">
                <span className={styles.stepIcon}>{stepData.icon}</span>
                <h2 className={styles.stepTitle}>{stepData.title}</h2>
                <p className={styles.stepDesc}>{stepData.description}</p>
            </div>
        </OnboardingLayout>
    );
}
