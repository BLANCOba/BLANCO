'use client';

import {LegalSection} from './legal-section';
import {useTranslations} from "use-intl";

export function Footer() {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-muted-foreground">
                            {t('copyright', {year: currentYear.toString()})}
                        </div>
                        <LegalSection/>
                    </div>
                </div>
            </div>
        </footer>
    );
}