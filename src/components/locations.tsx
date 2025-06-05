'use client';

import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Image from "next/image";
import {useTranslations} from 'next-intl';

export function Locations() {
    const t = useTranslations('locations');
    const [activeIndex, setActiveIndex] = useState(0);

    const locations = [
        {
            name: 'tokyo',
            image: '/tokyo.jpg',
        },
        {
            name: 'berlin',
            image: '/berlin.jpg',
        },
        {
            name: 'barcelona',
            image: '/barcelona.jpg',
        },
        {
            name: 'montevideo',
            image: '/montevideo.jpg',
        },
        {
            name: 'bangkok',
            image: '/bangkok.jpg',
        },
    ] as const;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % locations.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [locations.length]);

    return (
        <section id="locations" className="py-20 bg-muted">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-xl text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>
                <div className="flex overflow-hidden h-[50vh] w-full">
                    {locations.map((location, index) => {
                        const isFirst = index === 0;
                        const isLast = index === locations.length - 1;
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={`${location.name}-${index}`}
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`relative cursor-pointer transition-all duration-300 h-full mr-1 last:mr-0 ${
                                    isFirst ? 'rounded-l-lg overflow-hidden' :
                                        isLast ? 'rounded-r-lg overflow-hidden' : ''
                                }`}
                                animate={{
                                    width: isActive ? 'calc(40% - 3px)' : 'calc(15% - 3px)',
                                }}
                                transition={{duration: 0.3, ease: 'easeInOut'}}
                            >
                                <div className="relative h-full">
                                    <Image
                                        src={location.image}
                                        alt={t(`cities.${location.name}.city`)}
                                        className="transition-transform group-hover:scale-110 object-cover"
                                        fill
                                        sizes="100vw"/>
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.3}}
                                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-white"
                                            >
                                                <h3 className="text-2xl font-bold mb-2">{t(`cities.${location.name}.city`)}</h3>
                                                <p className="text-lg mb-2">{t(`cities.${location.name}.country`)}</p>
                                                <p className="text-sm opacity-80 text-center">{t(`cities.${location.name}.description`)}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
