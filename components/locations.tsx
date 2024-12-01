'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const locations = [
  {
    city: 'Tokyo',
    country: 'Japan',
    description: 'Innovative hub bridging Eastern traditions with Western advancements',
    image: '/tokyo.jpg',
  },
  {
    city: 'Berlin',
    country: 'Germany',
    description: 'Vibrant melting pot of art, technology, and forward-thinking business',
    image: '/berlin.jpg',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    description: 'Mediterranean nexus of creativity, culture, and cutting-edge innovation',
    image: '/barcelona.jpg',
  },
  {
    city: 'Montevideo',
    country: 'Uruguay',
    description: 'Emerging tech center and gateway to Latin American markets',
    image: '/montevideo.jpg',
  },
  {
    city: 'Bangkok',
    country: 'Thailand',
    description: 'Dynamic crossroads of Southeast Asian commerce and digital transformation',
    image: '/bangkok.jpg',
  },
];

export function Locations() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="locations" className="py-20 bg-muted">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
          <p className="text-xl text-muted-foreground">
            Strategic locations across four continents
          </p>
        </div>
        <div className="flex overflow-hidden h-[50vh] w-full">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative cursor-pointer transition-all duration-300 ${
                activeIndex === index ? 'w-[calc(40%-3px)]' : 'w-[calc(15%-3px)]'
              } h-full ${
                index === 0 ? 'rounded-l-lg overflow-hidden' : 
                index === locations.length - 1 ? 'rounded-r-lg overflow-hidden' : ''
              } mr-1 last:mr-0`}
            >
              <div className="relative h-full">
                <img
                  src={location.image}
                  alt={location.city}
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                />
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{location.city}</h3>
                    <p className="text-lg mb-2">{location.country}</p>
                    <p className="text-sm opacity-80 text-center">{location.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}