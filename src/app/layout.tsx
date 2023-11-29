import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aplicativo Transheck',
  description: 'Aplicativo da transportadora Transheck',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <main className=' flex flex-col justify-center items-center'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>

      </body>
    </html>
  );
}
