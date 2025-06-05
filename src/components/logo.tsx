'use client';

import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-48 md:w-64 mb-8"
    >
      <img
        src="/blancomedia_logo_white.png"
        alt="Blanco Consulting"
        className="w-full h-auto"
      />
    </motion.div>
  );
}