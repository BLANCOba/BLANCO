import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blanco Consulting | Global Marketing & Branding Agency',
  description: 'Global marketing and branding agency with presence in Tokyo, Berlin, Barcelona, and Montevideo. Expert multilingual team delivering innovative solutions worldwide.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}