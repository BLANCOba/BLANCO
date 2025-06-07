'use client';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {PolicyContent} from '@/components/legal/policy-content';
import {usePolicy} from "@/components/policy-provider";
import {PolicyType} from "@/lib/legal/types";
import {useTranslations} from "use-intl";

export function LegalSection() {
    const [isOpen, setIsOpen] = useState(false);
    const {openPolicy} = usePolicy();
    const t = useTranslations('footer')

    const handlePolicyClick = (type: PolicyType) => {
        openPolicy(type);
        setIsOpen(false);
    };

    return (
        <div className="static sm:relative">
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-foreground"
            >
                <span className="hidden sm:inline">{t('legalSection.title.long')}</span>
                <span className="sm:hidden">{t('legalSection.title.short')}</span>
                {isOpen ? <ChevronUp className="ml-2 size-4"/> : <ChevronDown className="ml-2 size-4"/>}
            </Button>

            {isOpen && (
                <AnimatePresence>
                    <motion.div
                        key="legal-info"
                        initial={{opacity: 0}}
                        animate={{opacity: 0.999}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        className="absolute bottom-full right-0 mb-4 w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] lg:w-[1024px] bg-muted/95 backdrop-blur-xs rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
                    >
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                            <div>
                                <h3 className="font-semibold mb-2">{t('legalSection.legalNotice.title')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    BLANCO Business Associates<br/>
                                    Pablo Blanco<br/>
                                    Sprengelstraße 39<br/>
                                    13353 Berlin, Germany<br/>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">{t('legalSection.documents.title')}</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handlePolicyClick('disclaimer')}
                                        className="text-sm text-muted-foreground hover:text-foreground block"
                                    >
                                        {t('legalSection.documents.disclaimer')}
                                    </button>
                                    <button
                                        onClick={() => handlePolicyClick('privacy')}
                                        className="text-sm text-muted-foreground hover:text-foreground block"
                                    >
                                        {t('legalSection.documents.privacy')}
                                    </button>
                                    <button
                                        onClick={() => handlePolicyClick('terms')}
                                        className="text-sm text-muted-foreground hover:text-foreground block"
                                    >
                                        {t('legalSection.documents.terms')}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">{t('legalSection.contact.title')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('legalSection.contact.email')}<br/> <a href="mailto:contact@blancoba.com"
                                                                              className="hover:underline">contact@blancoba.com</a><br/>
                                    {t('legalSection.contact.phone')}<br/>+49 (0) 30 40 36 46 96
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">{t('legalSection.compliance.title')}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t('legalSection.compliance.description')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <PolicyContent/>
                </AnimatePresence>
            )}
        </div>
    );
}