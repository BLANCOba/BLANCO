'use client';

import {ContactForm} from '@/components/forms/contact-form';
import {useTranslations} from 'next-intl';

export function Contact() {
    const t = useTranslations('contact');
    return (
        <section id="contact" className="py-20 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t.rich('description', {
                            email: () => <a href="mailto:contact@blancoba.com"
                                            className="text-primary hover:underline">contact@blancoba.com</a>
                        })}
                    </p>
                </div>
                <ContactForm/>
            </div>
        </section>
    );
}