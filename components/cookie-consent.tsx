'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { PolicyContent } from '@/components/legal/policy-content';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>(null);

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

  const handlePolicyClick = () => {
    setSelectedPolicy('privacy');
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
          className="fixed bottom-4 left-4 z-50 w-[400px] p-1"
        >
          <div className="relative bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border p-5">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience. By continuing, you agree to our data policy.
              </p>

              <div className="flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={handlePolicyClick}
                >
                  Review Policy
                </Button>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={acceptCookies}
                >
                  Got It
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {selectedPolicy && (
        <PolicyContent
          type={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </AnimatePresence>
  );
}