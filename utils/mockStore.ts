export type UserRole = 'MEMBER' | 'TRAINER' | 'GYM' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export interface ClassSession {
    id: string;
    title: string;
    instructor: string;
    time: string;
    category: 'Yoga' | 'HIIT' | 'Strength' | 'Cardio';
    spotsLeft: number;
    price: string;
    date: string; // 'Today' or 'Tomorrow' for simplicity
}

// Trainer Types
export interface Trainer {
    id: string;
    name: string;
    specialties: string[];
    rating: number;
    reviewCount: number;
    isVerified: boolean;
    price: number;
    location: string;
    bio: string;
    imageUrl: string;
}

let availableClasses: ClassSession[] = [
    { id: '1', title: 'Morning Flow', instructor: 'Sarah J.', time: '07:00 AM', category: 'Yoga', spotsLeft: 5, price: '1 Credit', date: 'Today' },
    { id: '2', title: 'HIIT Blast', instructor: 'Mike T.', time: '12:00 PM', category: 'HIIT', spotsLeft: 2, price: '2 Credits', date: 'Today' },
    { id: '3', title: 'Power Lift', instructor: 'Mike T.', time: '05:00 PM', category: 'Strength', spotsLeft: 8, price: '1 Credit', date: 'Today' },
    { id: '4', title: 'Evening Zen', instructor: 'Sarah J.', time: '07:00 PM', category: 'Yoga', spotsLeft: 12, price: '1 Credit', date: 'Today' },
    { id: '5', title: 'Cardio Kick', instructor: 'Jenna R.', time: '09:00 AM', category: 'Cardio', spotsLeft: 0, price: '2 Credits', date: 'Tomorrow' },
    { id: '6', title: 'Strength 101', instructor: 'Tom B.', time: '02:00 PM', category: 'Strength', spotsLeft: 6, price: '1 Credit', date: 'Tomorrow' },
];

let trainers: Trainer[] = [
    { id: 't1', name: 'Mike T.', specialties: ['HIIT', 'Strength'], rating: 4.9, reviewCount: 124, isVerified: true, price: 80, location: 'New York', bio: 'Expert in high intensity interval training and powerlifting.', imageUrl: '/trainers/mike.jpg' },
    { id: 't2', name: 'Sarah J.', specialties: ['Yoga', 'Mindfulness'], rating: 5.0, reviewCount: 89, isVerified: true, price: 90, location: 'Remote', bio: 'Certified Yoga instructor with 10 years of experience.', imageUrl: '/trainers/sarah.jpg' },
    { id: 't3', name: 'Tom B.', specialties: ['Bodybuilding', 'Nutrition'], rating: 4.7, reviewCount: 45, isVerified: false, price: 75, location: 'London', bio: 'Helping you build muscle and eat right.', imageUrl: '/trainers/tom.jpg' },
    { id: 't4', name: 'Jenna R.', specialties: ['Cardio', 'Endurance'], rating: 4.8, reviewCount: 62, isVerified: true, price: 70, location: 'New York', bio: 'Marathon runner and endurance coach.', imageUrl: '/trainers/jenna.jpg' },
    { id: 't5', name: 'Alex K.', specialties: ['Rehab', 'Mobility'], rating: 4.9, reviewCount: 34, isVerified: false, price: 100, location: 'London', bio: 'Focus on injury prevention and recovery.', imageUrl: '/trainers/alex.jpg' },
    { id: 't6', name: 'Lisa M.', specialties: ['Pilates', 'Core'], rating: 4.8, reviewCount: 78, isVerified: true, price: 85, location: 'Remote', bio: 'Strengthen your core and improve posture.', imageUrl: '/trainers/lisa.jpg' },
];

let userBookings: ClassSession[] = [];
let currentUser: User | null = null;

// Simulated in-memory store
export const mockStore = {
    getClasses: () => availableClasses,

    getTrainers: () => trainers,
    getTrainer: (id: string) => trainers.find(t => t.id === id),

    bookClass: (classId: string) => {
        const cls = availableClasses.find(c => c.id === classId);
        if (cls && cls.spotsLeft > 0) {
            // Check if already booked
            if (userBookings.find(b => b.id === classId)) return false;

            cls.spotsLeft--;
            userBookings = [...userBookings, cls];
            return true;
        }
        return false;
    },

    getUserBookings: () => userBookings,

    // Auth
    login: (role: UserRole) => {
        currentUser = {
            id: 'mock-user-1',
            email: `demo.${role.toLowerCase()}@trainup.space`,
            name: `Demo ${role.charAt(0) + role.slice(1).toLowerCase()}`,
            role: role
        };
        return currentUser;
    },

    logout: () => {
        currentUser = null;
    },

    isAuthenticated: () => !!currentUser,

    getCurrentUser: () => currentUser,

    // For resetting in demo
    reset: () => {
        userBookings = [];
        currentUser = null;
        // Reset spots
        availableClasses = availableClasses.map(c => ({ ...c, spotsLeft: c.spotsLeft < 5 ? 5 : c.spotsLeft }));
    }
};
