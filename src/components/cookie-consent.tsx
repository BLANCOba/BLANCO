'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {usePolicy} from "@/components/policy-provider";
import {useTranslations} from 'next-intl';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const {openPolicy} = usePolicy();
    const t = useTranslations('cookies');

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) setIsVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    return isVisible ? (
        <div
            className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:w-[600px] p-4 bg-neutral-900/80
                 text-gray-300 rounded-md shadow-lg z-50 flex flex-col md:flex-row items-center
                 justify-between gap-4 border border-neutral-700"
        >
            {/* Text Section */}
            <p className="text-sm leading-relaxed md:text-left flex-1">
                {t.rich('content', {
                    privacyPolicy: (chunks) => <button
                        onClick={() => openPolicy('privacy')}
                        className="underline hover:text-gray-100 transition-colors"
                    >
                        {chunks}
                    </button>
                })}
            </p>

            {/* Button Section */}
            <div className="shrink-0">
                <Button
                    onClick={acceptCookies}
                    className="bg-neutral-800/80 hover:bg-neutral-700/90 text-gray-300 hover:text-gray-100
                     text-sm py-1 px-4 rounded border border-neutral-700 transition-all"
                >
                    {t('acceptButton')}
                </Button>
            </div>
        </div>
    ) : null;
}
