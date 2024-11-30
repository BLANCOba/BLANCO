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
      className="flex-shrink-0"
    >
      <img
        src={theme === 'dark' 
          ? 'https://utfs.io/f/1GYYBCL0NUjreMzFe4ljYpc1GxTy0Fgomt9arhfV3d4nDbvO'
          : 'https://utfs.io/f/1GYYBCL0NUjrgaBLQbtmav6U2PS5TLFybYodtC8O9AEBxscw'
        }
        alt="Blanco"
        className="h-8 w-auto"
      />
    </motion.div>
  );
}