
// Simple in-memory storage for Demo Mode (Server Side)
// This resets when the server restarts
import { Booking } from '@prisma/client';

export type MockBooking = {
    id: string;
    memberId: string;
    trainerId: string;
    date: Date;
    notes: string | null;
    status: 'REQUESTED' | 'CONFIRMED' | 'DECLINED' | 'CANCELLED';
    createdAt: Date;
    updatedAt: Date;
    location: string | null;
}

// Global variable to persist across hot reloads in dev (somewhat)
const globalForMock = globalThis as unknown as { mockBookings: MockBooking[] }
export const mockBookings = globalForMock.mockBookings || []
if (process.env.NODE_ENV !== 'production') globalForMock.mockBookings = mockBookings

export const addMockBooking = (booking: MockBooking) => {
    mockBookings.push(booking);
}

export const updateMockBookingStatus = (id: string, status: MockBooking['status']) => {
    const booking = mockBookings.find(b => b.id === id);
    if (booking) booking.status = status;
    return booking;
}

export const getMockBookings = () => mockBookings;
