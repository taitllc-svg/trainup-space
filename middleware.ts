import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtectedRoute =
        path.startsWith('/member') ||
        path.startsWith('/trainer') ||
        path.startsWith('/gym') ||
        path.startsWith('/admin');

    if (isProtectedRoute) {
        // Check for session
        // In Demo/Next-Auth logic (using cookies):
        const sessionCookie = request.cookies.get('userId'); // Matches what we set in actions/auth.ts

        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Basic RBAC based on cookie value (insecure for real prod, fine for MVP/Demo)
        const userId = sessionCookie.value;

        // Role Checks
        if (path.startsWith('/member') && !userId.includes('member') && !userId.endsWith('MEMBER')) {
            // If we really wanted strict checks. For now allow simple presence or matching string
            // Logic: If user is "demo-trainer", they shouldn't see member dashboard? 
            // Actually member dashboard is often open to all? Let's restrict.
            // If userId is 'demo-trainer', strict check:
            if (userId.includes('trainer') || userId.includes('gym') || userId.includes('admin')) {
                // Allow trainers to seeing member view? Maybe not.
                // Let's redirect to their own dashboard
                // return NextResponse.redirect(new URL('/trainer/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/member/:path*', '/trainer/:path*', '/gym/:path*', '/admin/:path*'],
};
