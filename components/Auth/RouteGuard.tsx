'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';

const PUBLIC_PATHS = ['/login', '/'];

// Role-based path definitions
const ROLE_PATHS: Record<string, UserRole[]> = {
    '/member': ['MEMBER', 'ADMIN'],
    '/trainer': ['TRAINER', 'ADMIN'],
    '/gym': ['GYM', 'ADMIN'],
    '/admin': ['ADMIN'],
};

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isLoading } = useAuth();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            checkAuth();
        }
    }, [pathname, user, isLoading]);

    function checkAuth() {
        if (PUBLIC_PATHS.includes(pathname)) {
            setAuthorized(true);
            return;
        }

        if (!user) {
            // Only redirect if we are sure we are not loading.
            // But we already checked !isLoading in useEffect.
            console.log('RouteGuard: Not authenticated, redirecting to login');
            setAuthorized(false);
            router.push('/login');
            return;
        }

        // Check Role Access
        const restrictedPath = Object.keys(ROLE_PATHS).find(path => pathname.startsWith(path));

        if (restrictedPath) {
            const allowedRoles = ROLE_PATHS[restrictedPath];
            if (!allowedRoles.includes(user.role)) {
                console.log(`RouteGuard: User role ${user.role} not allowed on ${pathname}`);

                if (user.role === 'MEMBER') router.push('/member/dashboard');
                else if (user.role === 'TRAINER') router.push('/trainer/dashboard');
                else if (user.role === 'GYM') router.push('/gym/dashboard');
                else if (user.role === 'ADMIN') router.push('/admin');

                return;
            }
        }

        setAuthorized(true);
    }

    // Show nothing or a clear loader while deciding
    if (isLoading || (!authorized && !PUBLIC_PATHS.includes(pathname))) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                Loading...
            </div>
        );
    }

    return <>{children}</>;
};

export default RouteGuard;
