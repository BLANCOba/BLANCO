import "@/app/globals.css";
import {Geist, Geist_Mono} from 'next/font/google';
import {CookieConsent} from '@/components/cookie-consent';
import {PolicyContent} from '@/components/legal/policy-content';
import PolicyProvider from "@/components/policy-provider";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {ThemeProvider} from "next-themes";
import {setRequestLocale} from "next-intl/server";
import {Metadata} from "next";
import React, {ReactNode} from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Blanco Consulting",
    description: "Blanco Consulting",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <PolicyProvider>
            <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                <NextIntlClientProvider>
                    {children}
                    <CookieConsent/>
                    <PolicyContent/>
                </NextIntlClientProvider>
            </ThemeProvider>
            </body>
            </html>
        </PolicyProvider>
    );
}
