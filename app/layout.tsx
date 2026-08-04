import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  title: 'Rajyavardhan Singh Rathore | Electro-Technical Officer & Full-Stack Developer',
  description: 'Portfolio & CV of Rajyavardhan Singh Rathore.',
  keywords: [
    'Rajyavardhan Singh Rathore',
    'Electro-Technical Officer',
    'ETO',
    'Seafarer',
    'Marine Electrical',
    'MSC ROME',
    'Full-Stack Developer',
    'Tolani Maritime Institute',
    'Next.js Portfolio'
  ],
  authors: [{ name: 'Rajyavardhan Singh Rathore' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} suppressHydrationWarning`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
