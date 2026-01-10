import React from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import DocumentList from '@/components/File/DocumentList';

export default function FilePage() {
    const documents = [
        { id: '1', title: 'Keto_Meal_Plan_v2.pdf', type: 'PDF' as const, date: 'Apr 05, 2026', size: '2.4 MB', category: 'Meal Plan' as const, sharedWith: ['Sarah J.'] },
        { id: '2', title: 'Hypertrophy_Phase_1.pdf', type: 'PDF' as const, date: 'Mar 28, 2026', size: '1.1 MB', category: 'Workout' as const, sharedWith: ['Mike T.'] },
        { id: '3', title: 'Progress_Front_Mar26.jpg', type: 'IMG' as const, date: 'Mar 01, 2026', size: '4.5 MB', category: 'results' as const },
        { id: '4', title: 'Consultation_Notes.docx', type: 'DOC' as const, date: 'Feb 15, 2026', size: '15 KB', category: 'results' as const, sharedWith: ['Sarah J.', 'Dr. Ali'] },
    ];

    return (
        <div className="container">
            <PageHeader
                title="My Files"
                description="Access your fitness plans and records."
            />

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <DocumentList documents={documents} />
            </div>
        </div>
    );
}
