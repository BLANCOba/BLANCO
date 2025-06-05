

'use client';


import './globals.css';
import { Inter } from 'next/font/google';
import { CookieConsent } from '@/components/cookie-consent';
import { createContext, useContext, useState } from 'react';
import { PolicyType } from '@/lib/legal/types';
import { PolicyContent } from '@/components/legal/policy-content';

const inter = Inter({ subsets: ['latin'] });

interface PolicyContextProps {
  openPolicy: (type: PolicyType) => void;
}

const PolicyContext = createContext<PolicyContextProps | undefined>(undefined);

// ✅ Export usePolicy directly (no need for export { usePolicy } later)
export function usePolicy() {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error('usePolicy must be used within PolicyProvider');
  }
  return context;
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const [policyType, setPolicyType] = useState<PolicyType | null>(null);

  const openPolicy = (type: PolicyType) => {
    setPolicyType(type);
  };

  const closePolicy = () => {
    setPolicyType(null);
  };

  return (
      <PolicyContext.Provider value={{ openPolicy }}>
        <html lang="en" className="dark" suppressHydrationWarning>
        <body className={inter.className}>
        {children}
        <CookieConsent />
        {policyType && (
            <PolicyContent type={policyType} onClose={closePolicy} />
        )}
        </body>
        </html>
      </PolicyContext.Provider>
  );
}
