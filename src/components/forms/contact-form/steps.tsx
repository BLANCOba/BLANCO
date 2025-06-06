'use client';

import {Check} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Dispatch, SetStateAction} from "react";

interface StepsProps {
    currentStep: number,
    totalSteps: number,
    setStep: Dispatch<SetStateAction<number>>
}

export function Steps({currentStep, totalSteps, setStep}: StepsProps) {
    return (
        <div className="relative">
            <div className="absolute top-4 w-full h-0.5 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`}}
                />
            </div>

            <div className="relative flex justify-between">
                {Array.from({length: totalSteps}).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                            index + 1 <= currentStep
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {index + 1 < currentStep ? (
                            <button className="size-full flex items-center justify-center"
                                    onClick={() => setStep(index + 1)}>
                                <Check className="w-4 h-4"/>
                            </button>
                        ) : (
                            <span className="text-sm">{index + 1}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}