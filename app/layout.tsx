import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/Layout/TopNav';
import Footer from '@/components/Layout/Footer';
import DemoBadge from '@/components/Layout/DemoBadge';
import { AuthProvider } from '@/lib/auth-context';

/* eslint-disable @next/next/no-page-custom-font */


export const metadata: Metadata = {
  title: 'Trainup.space',
  description: 'Trainup.space - Minimalist Gym Management',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
            <TopNav />
            <main className="main-content app-shell" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </main>
            <Footer />
            <DemoBadge />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
