'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import './globals.css';
import Sidebar from '@/components/Layout/Sidebar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="hide-scrollbar h-screen w-screen overflow-auto bg-muted pt-16">
              {children}
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
