'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PolicyContent } from '@/components/legal/policy-content';

type PolicyType = 'privacy' | 'disclaimer' | 'terms' | null;

export function LegalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>(null);

  const handlePolicyClick = (type: PolicyType) => {
    setSelectedPolicy(type);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground"
      >
        Legal Information {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronUp className="ml-2 h-4 w-4 rotate-180" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 w-screen md:w-[calc(100vw-2rem)] lg:w-[1024px] bg-muted/95 backdrop-blur-sm rounded-lg shadow-lg"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
              <div>
                <h3 className="font-semibold mb-2">Impressum</h3>
                <p className="text-sm text-muted-foreground">
                  BLANCO Consulting GmbH<br />
                  Friedrichstraße 123<br />
                  10117 Berlin, Germany<br />
                  VAT ID: DE123456789
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal Documents</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handlePolicyClick('disclaimer')}
                    className="text-sm text-muted-foreground hover:text-foreground block"
                  >
                    Disclaimer
                  </button>
                  <button
                    onClick={() => handlePolicyClick('privacy')}
                    className="text-sm text-muted-foreground hover:text-foreground block"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => handlePolicyClick('terms')}
                    className="text-sm text-muted-foreground hover:text-foreground block"
                  >
                    Terms of Use
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  Email: legal@blancoconsulting.com<br />
                  Phone: +49 30 123456789<br />
                  Fax: +49 30 987654321
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  We adhere to GDPR, CCPA, and other applicable data protection regulations. 
                  For more information, please review our Privacy Policy.
                </p>
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
    </div>
  );
}