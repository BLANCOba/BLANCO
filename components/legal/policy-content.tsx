'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { privacyPolicy } from '@/lib/legal/privacy-policy';
import { disclaimer } from '@/lib/legal/disclaimer';
import { termsOfUse } from '@/lib/legal/terms-of-use';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PolicyContentProps {
  type: 'privacy' | 'disclaimer' | 'terms';
  onClose: () => void;
}

export function PolicyContent({ type, onClose }: PolicyContentProps) {
  const getContent = () => {
    switch (type) {
      case 'privacy':
        return privacyPolicy;
      case 'disclaimer':
        return disclaimer;
      case 'terms':
        return termsOfUse;
      default:
        return null;
    }
  };

  const content = getContent();

  if (!content) return null;

  const title = type === 'privacy' ? 'Privacy Policy' :
               type === 'disclaimer' ? 'Disclaimer' :
               'Terms of Use';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="fixed inset-x-4 top-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[640px] lg:w-[800px]">
        <div className="h-full bg-card rounded-lg shadow-lg border flex flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-8">
                Version {content.version} - Last updated: {content.lastUpdated}
              </p>
              
              {Object.entries(content.content).map(([key, section]: [string, any]) => (
                <div key={key} className="mb-8">
                  {section.title && (
                    <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  )}
                  {section.text && <p className="mb-4">{section.text}</p>}
                  
                  {section.sections?.map((subsection: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">{subsection.title}</h4>
                      <p className="mb-2">{subsection.text}</p>
                      {subsection.items && (
                        <ul className="list-disc pl-6 mb-4">
                          {subsection.items.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  
                  {section.items && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.rules && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.rules.map((rule: string, i: number) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.measures && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.measures.map((measure: string, i: number) => (
                        <li key={i}>{measure}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.rights && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.rights.map((right: string, i: number) => (
                        <li key={i}>{right}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.parties && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.parties.map((party: string, i: number) => (
                        <li key={i}>{party}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.purposes && (
                    <ul className="list-disc pl-6 mb-4">
                      {section.purposes.map((purpose: string, i: number) => (
                        <li key={i}>{purpose}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.regulations && (
                    <div className="space-y-4">
                      {section.regulations.map((reg: any, i: number) => (
                        <div key={i}>
                          <h4 className="font-semibold">{reg.name}</h4>
                          <p>{reg.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.details && (
                    <div className="space-y-2">
                      <p>Email: {section.details.email}</p>
                      <p>Phone: {section.details.phone}</p>
                      <p>Address: {section.details.address}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-6 border-t">
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}