'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from './theme-toggle';
import { LanguagePicker } from './language-picker';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)']
  );

  const menuItems = ['About', 'Services', 'Locations', 'Contact'];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed w-full z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={theme === 'dark' 
                ? 'https://utfs.io/f/1GYYBCL0NUjreMzFe4ljYpc1GxTy0Fgomt9arhfV3d4nDbvO'
                : 'https://utfs.io/f/1GYYBCL0NUjrgaBLQbtmav6U2PS5TLFybYodtC8O9AEBxscw'
              }
              alt="Blanco"
              className="h-18 w-auto" // Increased from h-12 to h-18 (50% bigger)
            />
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguagePicker />
            </div>
            <Button variant="outline">
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguagePicker />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/90 backdrop-blur-md">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}