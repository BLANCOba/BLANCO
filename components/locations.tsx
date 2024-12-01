'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  {
    city: 'Tokyo',
    country: 'Japan',
    description: 'アジア太平洋地域のハブ',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
  },
  {
    city: 'Berlin',
    country: 'Germany',
    description: 'Europäische Kreativzentrale',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    description: 'Centro de innovación mediterráneo',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
  },
  {
    city: 'Montevideo',
    country: 'Uruguay',
    description: 'Portal latinoamericano',
    image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6',
  },
];

export function Locations() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <section id="locations" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
            <p className="text-xl text-muted-foreground">
              Strategic locations across four continents
            </p>
          </div>
          <div className="flex overflow-hidden h-[50vh]">
            {locations.map((location, index) => (
                <motion.div
                    key={location.city}
                    onClick={() => setActiveIndex(index)} // Highlight on click
                    onMouseEnter={() => setActiveIndex(index)} // Highlight on hover
                    className={`relative cursor-pointer transition-all duration-300 ${
                        activeIndex === index ? 'w-2/5' : 'w-1/5'
                    } h-full`}
                >
                  <div className="relative overflow-hidden rounded-lg h-full">
                    {/* Image */}
                    <img
                        src={location.image}
                        alt={location.city}
                        className="object-cover w-full h-full transition-transform group-hover:scale-110"
                    />
                    {/* Show text/icon only for active item */}
                    {activeIndex === index && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-white">
                          <MapPin className="w-8 h-8 mb-4" />
                          <h3 className="text-2xl font-bold mb-2">{location.city}</h3>
                          <p className="text-lg mb-2">{location.country}</p>
                          <p className="text-sm opacity-80">{location.description}</p>
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
