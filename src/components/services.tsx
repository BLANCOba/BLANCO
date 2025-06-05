'use client';

import {motion} from 'framer-motion';
import {Globe2, Lightbulb, LineChart, MessageSquare, Palette, Target} from 'lucide-react';
import {useTranslations} from "use-intl";

export function Services() {
    const t = useTranslations('services');
    const services = [
        {
            icon: Globe2,
            title: t('branding.title'),
            description: t('branding.description'),
            features: t.raw('branding.features') as string[]
        },
        {
            icon: Target,
            title: t('marketing.title'),
            description: t('marketing.description'),
            features: t.raw('marketing.features') as string[]
        },
        {
            icon: Lightbulb,
            title: t('creative.title'),
            description: t('creative.description'),
            features: t.raw('creative.features') as string[]
        },
        {
            icon: Palette,
            title: t('communication.title'),
            description: t('communication.description'),
            features: t.raw('communication.features') as string[]
        },
        {
            icon: LineChart,
            title: t('technical.title'),
            description: t('technical.description'),
            features: t.raw('technical.features') as string[]
        },
        {
            icon: MessageSquare,
            title: t('content.title'),
            description: t('content.description'),
            features: t.raw('content.features') as string[]
        }
    ];

    return (
        <section id="services" className="py-24 bg-linear-to-b from-background to-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center mb-6">
                                <service.icon
                                    className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300"/>
                                <h3 className="text-2xl font-semibold ml-4">{service.title}</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"/>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}