'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const logos = [
    '/logo1.png', '/logo2.png', '/logo3.png', '/logo4.png', '/logo5.png',
    '/logo6.png', '/logo7.png', '/logo8.png', '/logo9.png', '/logo10.png',
    '/logo11.png', '/logo12.png', '/logo13.png', '/logo14.png', '/logo15.png',
    '/logo16.png', '/logo17.png', '/logo18.png', '/logo19.png', '/logo20.png',
    '/logo21.png', '/logo22.png', '/logo23.png', '/logo24.png', '/logo25.png',
    '/logo26.png', '/logo27.png', '/logo28.png', '/logo29.png', '/logo30.png',
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/globe-background.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-black/60" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                            Global Vision. Local Impact.
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Transforming brands across continents with multilingual expertise and cultural intelligence.
                        </p>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Trust Building Section */}
            <motion.div 
                className="relative z-20 w-full mt-24 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Over a Decade of Global Excellence
                        </h2>
                        <p className="text-lg text-white/80">
                            Trusted by industry leaders across continents
                        </p>
                    </motion.div>

                    <div className="overflow-hidden">
                        {[0, 1, 2].map((row) => (
                            <motion.div
                                key={row}
                                className="flex mb-16"
                                initial={{ x: row % 2 === 0 ? "0%" : "-100%" }}
                                animate={{ x: row % 2 === 0 ? "-100%" : "0%" }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 50,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {[...logos.slice(row * 10, (row + 1) * 10), ...logos.slice(row * 10, (row + 1) * 10)].map((logo, index) => (
                                    <div key={index} className="flex-shrink-0 px-12">
                                        <img
                                            src={logo}
                                            alt={`Client logo ${(index % 10) + 1 + (row * 10)}`}
                                            className="h-16 w-auto object-contain"
                                            loading="eager"
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}