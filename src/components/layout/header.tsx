'use client';

import {useEffect, useState} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {Logo} from '@/components/ui/logo';
import {LanguagePicker} from '@/components/language-picker';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useTranslations} from "use-intl";


export function Header() {
    const t = useTranslations('header');
    const menuItems = t.raw('menuItems') as string[];
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const {scrollY} = useScroll();

    const headerBackground = useTransform(
        scrollY,
        [0, 100],
        ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.header
            style={{backgroundColor: headerBackground}}
            className={cn(
                'fixed top-0 left-0 right-0 z-50',
                'backdrop-blur-xs transition-colors duration-300'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="shrink-0">
                        <Logo/>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}

                        <div className="flex items-center space-x-2">
                            <LanguagePicker/>
                            <Button variant="outline" size="sm">
                                {t('getInTouch')}
                            </Button>
                        </div>
                    </nav>

                    <div className="flex md:hidden items-center space-x-2">
                        <LanguagePicker/>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white"
                        >
                            {isOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block px-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <Button variant="outline" size="sm" className="w-full mt-4">
                                {t('getInTouch')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </motion.header>
    );
}