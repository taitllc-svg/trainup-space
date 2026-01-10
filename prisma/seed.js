const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // 1. Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@trainup.space' },
        update: {},
        create: {
            email: 'admin@trainup.space',
            name: 'Admin User',
            passwordHash: 'hashed_password_123', // In a real app we'd hash this
            role: 'ADMIN',
        },
    });
    console.log(`Created/Found Admin: ${admin.name}`);

    // 2. Member
    const member = await prisma.user.upsert({
        where: { email: 'member@trainup.space' },
        update: {},
        create: {
            email: 'member@trainup.space',
            name: 'Member User',
            passwordHash: 'hashed_password_123',
            role: 'MEMBER',
        },
    });
    console.log(`Created/Found Member: ${member.name}`);

    // 3. Trainer
    const trainer = await prisma.user.upsert({
        where: { email: 'trainer@trainup.space' },
        update: {},
        create: {
            email: 'trainer@trainup.space',
            name: 'Trainer Tim',
            passwordHash: 'hashed_password_123',
            role: 'TRAINER',
        },
    });
    console.log(`Created/Found Trainer: ${trainer.name}`);

    // 4. Create Trainer Profile
    const trainerProfile = await prisma.trainerProfile.upsert({
        where: { userId: trainer.id },
        update: {},
        create: {
            userId: trainer.id,
            bio: 'Expert in HIIT and Strength Training.',
            specialties: ['HIIT', 'Strength', 'Nutrition'],
            rate: 85,
            location: 'New York, NY',
        },
    });
    console.log(`Created/Found Trainer Profile for: ${trainer.name}`);

    // 5. Gym
    const gym = await prisma.user.upsert({
        where: { email: 'gym@trainup.space' },
        update: {},
        create: {
            email: 'gym@trainup.space',
            name: 'Metro City Gym',
            passwordHash: 'hashed_password_123',
            role: 'GYM',
        },
    });
    console.log(`Created/Found Gym: ${gym.name}`);

    console.log('✅ Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
