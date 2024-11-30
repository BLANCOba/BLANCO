'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  {
    city: 'Tokyo',
    country: 'Japan',
    description: 'アジア太平洋地域のハブ',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
  },
  {
    city: 'Berlin',
    country: 'Germany',
    description: 'Europäische Kreativzentrale',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047'
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    description: 'Centro de innovación mediterráneo',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded'
  },
  {
    city: 'Montevideo',
    country: 'Uruguay',
    description: 'Portal latinoamericano',
    image: 'https://images.unsplash.com/photo-1600623471616-8c1966c91ff6'
  }
];

export function Locations() {
  return (
    <section id="locations" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Global Presence</h2>
          <p className="text-xl text-muted-foreground">
            Strategic locations across four continents
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-square relative">
                <img
                  src={location.image}
                  alt={location.city}
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-white">
                  <MapPin className="w-8 h-8 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{location.city}</h3>
                  <p className="text-lg mb-2">{location.country}</p>
                  <p className="text-sm opacity-80">{location.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}