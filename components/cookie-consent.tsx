'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-50 w-[300px]" // Changed from right-4 to left-4
        >
          <div className="relative bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We use cookies to improve your experience. By continuing, you agree to our use of cookies in accordance with data protection laws.
              </p>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => document.getElementById('privacy-policy')?.click()}
                >
                  Learn More
                </Button>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={acceptCookies}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}