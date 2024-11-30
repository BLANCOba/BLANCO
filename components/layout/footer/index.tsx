'use client';

import { LegalSection } from './legal-section';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} BLANCO Consulting. All rights reserved.
            </div>
            <LegalSection />
          </div>
        </div>
      </div>
    </footer>
  );
}