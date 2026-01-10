import React from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import RouteGuard from '@/components/Auth/RouteGuard';

export default function PtDashboard() {
    return (
        <RouteGuard>
            <div className="container">
                <PageHeader title="PT Dashboard" description="Personal Training specifics." />
                <div className="grid">
                    <div className="card">Sessions</div>
                </div>
            </div>
        </RouteGuard>
    );
}
