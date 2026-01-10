
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Clean up
    await prisma.booking.deleteMany();
    await prisma.trainerProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.classSession.deleteMany();

    // 2. Create Users (Member, Trainers)
    const member = await prisma.user.create({
        data: {
            email: 'member@example.com',
            passwordHash: 'demo123', // plaintext for MVP or hashed
            name: 'Alice Member',
            role: 'MEMBER',
        },
    });

    const trainerUser1 = await prisma.user.create({
        data: {
            email: 'trainer@example.com',
            passwordHash: 'demo123',
            name: 'Coach Bob',
            role: 'TRAINER',
        },
    });

    const trainerUser2 = await prisma.user.create({
        data: {
            email: 'sarah@example.com',
            passwordHash: 'demo123',
            name: 'Sarah Yoga',
            role: 'TRAINER',
        },
    });

    // 3. Create Trainer Profiles
    await prisma.trainerProfile.create({
        data: {
            userId: trainerUser1.id,
            bio: 'Expert in HIIT and Strength.',
            specialties: ['HIIT', 'Strength', 'Cardio'],
            rate: 80,
            location: 'New York',
        },
    });

    await prisma.trainerProfile.create({
        data: {
            userId: trainerUser2.id,
            bio: 'Yoga and mindfulness coach.',
            specialties: ['Yoga', 'Pilates', 'Meditation'],
            rate: 95,
            location: 'Los Angeles',
        },
    });

    // 4. Create Classes
    await prisma.classSession.createMany({
        data: [
            {
                title: 'Morning HIIT',
                instructor: 'Coach Bob',
                time: new Date(new Date().setHours(new Date().getHours() + 24)), // Tomorrow
                category: 'HIIT',
            },
            {
                title: 'Sunset Yoga',
                instructor: 'Sarah Yoga',
                time: new Date(new Date().setHours(new Date().getHours() + 48)), // Day after tomorrow
                category: 'Yoga',
            },
        ],
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
