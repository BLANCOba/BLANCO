'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CompanyDetails } from './company-details';
import { ContactPerson } from './contact-person';
import { BusinessChallenges } from './business-challenges';
import { ProjectGoals } from './project-goals';
import { AdditionalInfo } from './additional-info';
import { Steps } from './steps';
import { useLocalStorage } from '@/hooks/use-local-storage';

// ✅ Update FormData type to support "step1", "step2", "step3", etc.
type FormData = {
  [key: `step${number}`]: any; // Dynamic key format
};

export function ContactForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useLocalStorage<FormData>('contact-form-data', {});

  // ✅ Save form data for each step
  const saveStepData = (stepNumber: number, data: any) => {
    setFormData(prev => ({
      ...prev,
      [`step${stepNumber}`]: data
    }));
  };

  // ✅ Handle step navigation
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Load saved data when returning to a step
  const getStepData = (stepNumber: number) => formData[`step${stepNumber}`]; // No TypeScript error now

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (step > 1) {
        prevStep();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step]);

  return (
      <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8">
        <Steps currentStep={step} totalSteps={totalSteps} />

        <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-8"
        >
          {step === 1 && (
              <CompanyDetails
                  onNext={(data) => {
                    saveStepData(1, data);
                    nextStep();
                  }}
                  initialData={getStepData(1)}
              />
          )}
          {step === 2 && (
              <ContactPerson
                  onNext={(data) => {
                    saveStepData(2, data);
                    nextStep();
                  }}
                  onBack={prevStep}
                  initialData={getStepData(2)}
              />
          )}
          {step === 3 && (
              <BusinessChallenges
                  onNext={(data) => {
                    saveStepData(3, data);
                    nextStep();
                  }}
                  onBack={prevStep}
                  initialData={getStepData(3)}
              />
          )}
          {step === 4 && (
              <ProjectGoals
                  onNext={(data) => {
                    saveStepData(4, data);
                    nextStep();
                  }}
                  onBack={prevStep}
                  initialData={getStepData(4)}
              />
          )}
          {step === 5 && (
              <AdditionalInfo
                  onSubmit={(data) => {
                    saveStepData(5, data);
                    const completeFormData = {
                      ...formData,
                      step5: data
                    };
                    console.log('Complete form data:', completeFormData);
                  }}
                  onBack={prevStep}
                  initialData={getStepData(5)}
              />
          )}
        </motion.div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Required fields:</span>
            <span className="text-destructive">*</span>
          </div>

          <span className="text-sm text-muted-foreground">
          Your data is protected under our Privacy Policy.
        </span>
          {step < totalSteps && (
              <span className="text-sm text-muted-foreground">
             Your progress is automatically saved. You can return to complete the form later.
          </span>
          )}
        </div>
      </div>
  );
}
