import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/Layout/TopNav';
import DemoBadge from '@/components/Layout/DemoBadge';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trainup.space',
  description: 'Trainup.space - Minimalist Gym Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TopNav />
          <main className="main-content">
            {children}
          </main>
          <DemoBadge />
        </AuthProvider>
      </body>
    </html>
  );
}
