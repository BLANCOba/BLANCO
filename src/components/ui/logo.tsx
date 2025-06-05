'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function Logo() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="shrink-0"
    >
      <img
          src="/blancomedia_logo_white.png"
        alt="Blanco"
        className="h-8 w-auto"
      />
    </motion.div>
  );
}