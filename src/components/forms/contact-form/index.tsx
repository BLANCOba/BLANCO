'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {CompanyDetails, CompanyDetailsSchema} from './company-details';
import {ContactPerson, ContactPersonSchema} from './contact-person';
import {BusinessChallenges, BusinessChallengesSchema} from './business-challenges';
import {ProjectGoals, ProjectGoalsSchema} from './project-goals';
import {AdditionalInfo, AdditionalInfoSchema} from './additional-info';
import {Steps} from './steps';
import {useLocalStorage} from '@/hooks/use-local-storage';
import {useTranslations} from "use-intl";
import emailjs from '@emailjs/browser';
import {toast} from "sonner";

type FormData = {
    companyDetails?: CompanyDetailsSchema;
    contactPerson?: ContactPersonSchema;
    businessChallenges?: BusinessChallengesSchema;
    projectGoals?: ProjectGoalsSchema;
    additionalInfo?: AdditionalInfoSchema;
};

export function ContactForm() {
    const t = useTranslations('contactForm');
    const [step, setStep] = useState(1);
    const totalSteps = 5;
    const [formData, setFormData] = useLocalStorage<FormData>('contact-form-data', {});
    const [submitting, setSubmitting] = useState(false);

    // ✅ Handle step navigation
    const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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

    useEffect(() => {
        const sendEmail = async () => {
            try {
                await emailjs.send('blancoba.com', 'contact', formData, {publicKey: 'nARP6RzXWmKFzSiiH'});
                setStep(1);
                setFormData({});
                toast.success(t('messages.success.title'), {description: t('messages.success.description')});
            } catch (e) {
                console.error('Email sending failed:', e);
                toast.error(t('messages.error.title'), {description: t('messages.error.description')});
            } finally {
                setSubmitting(false);
            }
        };

        if (submitting) {
            sendEmail().catch(console.error);
        }
    }, [formData, submitting, setFormData, setStep, t]);

    const onSubmit = async (data: AdditionalInfoSchema) => {
        setSubmitting(true);
        setFormData(prevState => ({...prevState, additionalInfo: data}));
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8">
            <Steps currentStep={step} totalSteps={totalSteps} setStep={setStep}/>

            <motion.div
                key={step}
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -20}}
                className="mt-8"
            >
                {step === 1 && (
                    <CompanyDetails
                        onNext={(data) => {
                            setFormData(prevState => ({...prevState, companyDetails: data}));
                            nextStep();
                        }}
                        initialData={formData.companyDetails}
                    />
                )}
                {step === 2 && (
                    <ContactPerson
                        onNext={(data) => {
                            setFormData(prevState => ({...prevState, contactPerson: data}));
                            nextStep();
                        }}
                        onBack={prevStep}
                        initialData={formData.contactPerson}
                    />
                )}
                {step === 3 && (
                    <BusinessChallenges
                        onNext={(data) => {
                            setFormData(prevState => ({...prevState, businessChallenges: data}));
                            nextStep();
                        }}
                        onBack={prevStep}
                        initialData={formData.businessChallenges}
                    />
                )}
                {step === 4 && (
                    <ProjectGoals
                        onNext={(data) => {
                            setFormData(prevState => ({...prevState, projectGoals: data}));
                            nextStep();
                        }}
                        onBack={prevStep}
                        initialData={formData.projectGoals}
                    />
                )}
                {step === 5 && (
                    <AdditionalInfo
                        onSubmit={onSubmit}
                        onBack={prevStep}
                        initialData={formData.additionalInfo}
                        submitting={submitting}
                    />
                )}
            </motion.div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{t('note.requiredFields')}</span>
                    <span className="text-destructive">*</span>
                </div>

                <div>
                    <span className="text-sm text-muted-foreground">{t('note.privacy')}</span>
                    {step < totalSteps && (
                        <>
                            <br/>
                            <span className="text-sm text-muted-foreground">{t('note.progress')}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
