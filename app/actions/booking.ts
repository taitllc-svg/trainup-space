'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { mockBookings, addMockBooking, updateMockBookingStatus } from '@/utils/serverMock'

export async function createBookingRequest(data: {
    trainerId: string
    date: Date
    notes?: string
}) {
    const cookieStore = await cookies()
    const memberId = cookieStore.get('userId')?.value

    if (!memberId) {
        return { success: false, error: 'User not logged in' }
    }

    try {
        const booking = await prisma.booking.create({
            data: {
                memberId: memberId,
                trainerId: data.trainerId,
                date: data.date,
                notes: data.notes,
                status: 'REQUESTED',
            },
        })
        revalidatePath('/member/dashboard')
        revalidatePath('/trainer/dashboard')
        return { success: true, booking }
    } catch (error) {
        console.warn('DB create failed, using Mock:', error)

        // Mock Fallback
        const mockB = {
            id: `mock-bk-${Date.now()}`,
            memberId,
            trainerId: data.trainerId,
            date: data.date,
            notes: data.notes || '',
            status: 'REQUESTED' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
            location: 'Gym'
        }
        addMockBooking(mockB)
        revalidatePath('/member/dashboard')
        return { success: true, booking: mockB }
    }
}

export async function updateBookingStatus(bookingId: string, status: 'CONFIRMED' | 'DECLINED') {
    try {
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        })
        revalidatePath('/trainer/dashboard')
        revalidatePath('/member/dashboard')
        return { success: true, booking }
    } catch (error) {
        console.warn('DB update failed, using Mock')
        const updated = updateMockBookingStatus(bookingId, status)
        revalidatePath('/trainer/dashboard')
        if (updated) return { success: true, booking: updated }
        return { success: false, error: 'Booking not found' }
    }
}

export async function getTrainerBookings(trainerId: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: { trainerId },
            include: {
                member: {
                    select: { name: true, email: true }
                }
            },
            orderBy: { date: 'asc' }
        })
        return { success: true, bookings }
    } catch (error) {
        console.warn('DB fetch failed, using Mock')
        // Filter mock bookings
        // For demo, we might need to assume CURRENT user is the trainer if the ID matches? 
        // Or just return all internal mocks for the valid ID
        // We also need to "fake" the member relation
        const mocks = mockBookings.filter(b => b.trainerId === trainerId || trainerId.startsWith('demo-trainer'))
            .map(b => ({
                ...b,
                member: { name: 'Demo Member', email: 'demo@member.com' }
            }))
        return { success: true, bookings: mocks }
    }
}

export async function getMemberBookings(memberId: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: { memberId },
            include: {
                trainer: {
                    select: { name: true, trainerProfile: { select: { specialties: true } } }
                }
            },
            orderBy: { date: 'asc' }
        })
        return { success: true, bookings }
    } catch (error) {
        console.warn('DB fetch failed, using Mock')
        const mocks = mockBookings.filter(b => b.memberId === memberId)
            .map(b => ({
                ...b,
                trainer: {
                    name: 'Demo Trainer',
                    trainerProfile: { specialties: ['Demo Spec'] }
                }
            }))
        return { success: true, bookings: mocks }
    }
}
