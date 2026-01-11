import { UserRole } from '@/lib/auth-context';

export interface OnboardingStep {
    title: string;
    description: string;
    icon: string;
    actionLabel: string;
}

export type OnboardingFlow = {
    [key in UserRole]: {
        welcomeTitle: string;
        welcomeSubtitle: string;
        steps: OnboardingStep[];
    }
}

export const onboardingConfig: OnboardingFlow = {
    'MEMBER': {
        welcomeTitle: "Welcome to Team TrainUp",
        welcomeSubtitle: "Let's personalize your fitness journey.",
        steps: [
            {
                title: "Set Your Goals",
                description: "Tell us what drives you. Weight loss, strength, or endurance?",
                icon: "🎯",
                actionLabel: "Define Goals"
            },
            {
                title: "Find Your Coach",
                description: "Connect with world-class trainers who specialize in your needs.",
                icon: "👟",
                actionLabel: "Browse Trainers"
            },
            {
                title: "Join the Community",
                description: "Track progress and compete on the global leaderboard.",
                icon: "🔥",
                actionLabel: "Let's Go!"
            }
        ]
    },
    'TRAINER': {
        welcomeTitle: "Grow Your Business",
        welcomeSubtitle: "Tools to manage clients and scale your coaching.",
        steps: [
            {
                title: "Build Your Profile",
                description: "Showcase your specialties, certifications, and rates.",
                icon: "⚡",
                actionLabel: "Edit Profile"
            },
            {
                title: "Set Availability",
                description: "Manage your calendar and let clients book sessions seamlessly.",
                icon: "📅",
                actionLabel: "Setup Calendar"
            },
            {
                title: "Accept Payments",
                description: "Secure automated billing for all your sessions.",
                icon: "💳",
                actionLabel: "Start Earning"
            }
        ]
    },
    'GYM': {
        welcomeTitle: "Optimize Your Facility",
        welcomeSubtitle: "Streamline operations and member experience.",
        steps: [
            {
                title: "Facility Setup",
                description: "Map out your gym zones and equipment inventory.",
                icon: "🏢",
                actionLabel: "Configure Spaces"
            },
            {
                title: "Staff Management",
                description: "Invite trainers and set staff permissions.",
                icon: "👥",
                actionLabel: "Add Staff"
            },
            {
                title: "Analytics Dashboard",
                description: "Track peak hours and revenue streams in real-time.",
                icon: "📊",
                actionLabel: "View Insights"
            }
        ]
    },
    'ADMIN': {
        welcomeTitle: "Platform Command",
        welcomeSubtitle: "System overview and global configuration.",
        steps: [
            { title: "System Status", description: "All services operational.", icon: "🛡️", actionLabel: "Check Status" },
            { title: "User Management", description: "Review recent sign-ups.", icon: "👤", actionLabel: "Review Users" },
            { title: "Revenue", description: "Global transaction monitoring.", icon: "💰", actionLabel: "Open Dashboard" }
        ]
    }
};
