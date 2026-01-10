'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function login(role: 'MEMBER' | 'TRAINER' | 'GYM' | 'ADMIN') {
    const cookieStore = await cookies()
    const oneDay = 24 * 60 * 60 * 1000

    try {
        const user = await prisma.user.findFirst({
            where: { role }
        })

        if (user) {
            cookieStore.set('userId', user.id, { expires: Date.now() + oneDay })
            return { success: true }
        }
    } catch (error) {
        console.warn('Database login failed, falling back to DEMO mode:', error)
    }

    // Fallback / Demo Mode
    // Generate a consistent dummy ID for the role
    const demoId = `demo-${role.toLowerCase()}`
    cookieStore.set('userId', demoId, { expires: Date.now() + oneDay })
    return { success: true }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('userId')
    redirect('/login')
}

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) return null

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                trainerProfile: true
            }
        })
        if (user) return user
    } catch (error) {
        // DB failed, fall through to mock
    }

    // Mock Fallback
    if (userId.startsWith('demo-')) {
        const role = userId.split('-')[1].toUpperCase() as 'MEMBER' | 'TRAINER' | 'GYM' | 'ADMIN'
        return {
            id: userId,
            email: `demo.${role.toLowerCase()}@trainup.space`,
            name: `Observer ${role.charAt(0) + role.slice(1).toLowerCase()}`,
            role: role,
            passwordHash: 'mock',
            createdAt: new Date(),
            trainerProfile: null
        }
    }

    return null
}

export async function getAppMode() {
    return {
        isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
        isConfigured: !!(process.env.NEXT_PUBLIC_USER_POOL_ID && process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID)
    }
}
