'use client';

import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
    // Only configure if env vars are present to avoid startup errors in purely local demo mode
    if (process.env.NEXT_PUBLIC_USER_POOL_ID && process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID) {
        Amplify.configure({
            Auth: {
                Cognito: {
                    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
                    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
                }
            }
        });
    }
};
