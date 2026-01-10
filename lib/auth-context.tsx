'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser as amplifyGetCurrentUser, signOut as amplifySignOut, signIn, SignInInput } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { login as demoLoginAction, logout as demoLogoutAction, getCurrentUser } from '@/app/actions/auth'; // Re-use existing server actions for demo cookies
import { configureAmplify } from './amplify-config';

// Initialize Amplify
configureAmplify();

export type UserRole = 'MEMBER' | 'TRAINER' | 'GYM' | 'ADMIN';

interface User {
    id?: string;
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    demoLogin: (role: UserRole) => Promise<void>;
    cognitoLogin: (input: SignInInput) => Promise<any>;
    logout: () => Promise<void>;
    isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        setIsLoading(true);
        if (isDemoMode) {
            // Use Server Action to get user from DB based on Cookie
            try {
                const dbUser = await getCurrentUser();
                if (dbUser) {
                    setUser({
                        id: dbUser.id,
                        username: dbUser.name || dbUser.email,
                        role: dbUser.role as UserRole
                    });
                } else {
                    setUser(null);
                }
            } catch (e) {
                setUser(null);
            }
            setIsLoading(false);
        } else {
            try {
                const currentUser = await amplifyGetCurrentUser();
                // Extract role from attributes (custom:role) or group
                // For now default to MEMBER
                setUser({
                    id: currentUser.userId,
                    username: currentUser.username,
                    role: 'MEMBER'
                });
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const demoLogin = async (role: UserRole) => {
        // Use the Server Action we created earlier
        await demoLoginAction(role);

        // Fetch the real user from the server (which reads the new cookie)
        await checkUser();

        // Redirect logic
        if (role === 'MEMBER') router.push('/member/dashboard');
        else if (role === 'TRAINER') router.push('/trainer/dashboard');
        else if (role === 'GYM') router.push('/gym/dashboard');
        else if (role === 'ADMIN') router.push('/admin');
    };

    const cognitoLogin = async (input: SignInInput) => {
        const result = await signIn(input);
        if (result.isSignedIn) {
            // Force recheck user
            await checkUser();
        }
        return result;
    };

    const logout = async () => {
        if (isDemoMode) {
            await demoLogoutAction();
        } else {
            try {
                await amplifySignOut();
            } catch (e) {
                console.error("Logout error", e);
            }
        }
        setUser(null);
        // Force full reload to clear any client state/cache
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, demoLogin, cognitoLogin, logout, isDemoMode }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
