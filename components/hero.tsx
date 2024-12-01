'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const logos = [
    '/logo1.png', '/logo2.png', '/logo3.png', '/logo4.png', '/logo5.png',
    '/logo6.png', '/logo7.png', '/logo8.png', '/logo9.png', '/logo10.png',
    '/logo11.png', '/logo12.png', '/logo13.png', '/logo14.png', '/logo15.png',
    '/logo16.png', '/logo17.png', '/logo18.png', '/logo19.png', '/logo20.png',
    '/logo21.png', '/logo22.png', '/logo23.png', '/logo24.png', '/logo25.png',
    '/logo26.png', '/logo27.png', '/logo28.png', '/logo29.png', '/logo30.png',
];

export function Hero() {
    const [expanded, setExpanded] = useState(false);
    const [rowsToShow, setRowsToShow] = useState(1);

    useEffect(() => {
        const updateRowsToShow = () => {
            const height = window.innerHeight;
            if (height < 1000) {
                setRowsToShow(1);
            } else if (height < 1200) {
                setRowsToShow(2);
            } else {
                setRowsToShow(3);
            }
        };

        updateRowsToShow();
        window.addEventListener('resize', updateRowsToShow);
        return () => window.removeEventListener('resize', updateRowsToShow);
    }, []);

    const LogoRow = ({ rowIndex }: { rowIndex: number }) => (
      <motion.div
        key={rowIndex}
        className="flex mb-6"
        initial={{ x: rowIndex % 2 === 0 ? "0%" : "-100%" }}
        animate={{ x: rowIndex % 2 === 0 ? "-100%" : "0%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...logos.slice(rowIndex * 10, (rowIndex + 1) * 10), ...logos.slice(rowIndex * 10, (rowIndex + 1) * 10)].map((logo, index) => (
          <div key={index} className="flex-shrink-0 px-12">
            <Image
              src={logo}
              alt={`Client logo ${(index % 10) + 1 + (rowIndex * 10)}`}
              width={64}
              height={64}
              className="h-16 w-auto object-contain"
              loading="eager"
            />
          </div>
        ))}
      </motion.div>
    );

    return (
        <section className="relative min-h-screen flex flex-col justify-end portrait:justify-center overflow-hidden">
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/globe-background.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="backdrop-blur-md bg-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Innovating Brands Across Borders.
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Empowering businesses worldwide with multilingual expertise and culturally-tailored solutions.
                        </p>

                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Let’s Build Your Global Brand
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div 
                className="relative z-20 w-full py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-4"
                    >
                        <h2 className="text-2xl md:text-2xl font-extralight text-white mb-4">
                            12+ Years of Trusted Partnerships Worldwide.
                        </h2>
                        <p className="text-lg text-white/80 mb-16 ">
                            Helping brands grow and thrive in markets around the world.
                        </p>
                    </motion.div>
                    <div className="overflow-hidden w-full">
                        <AnimatePresence>
                            {[...Array(expanded ? 3 : rowsToShow)].map((_, index) => (
                                <LogoRow key={index} rowIndex={index} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {rowsToShow < 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="text-center mt-1"
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setExpanded(!expanded)}
                                className="text-white hover:bg-white/10"
                            >
                                {expanded ? (
                                    <>
                                        See Less <ChevronUp className="ml-2 h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        See More <ChevronDown className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}