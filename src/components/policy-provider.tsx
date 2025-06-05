'use client';

import {PolicyType} from "@/lib/legal/types";
import {createContext, PropsWithChildren, useContext, useState} from "react";

interface PolicyContextProps {
    openPolicy: (type: PolicyType) => void;
    closePolicy: () => void;
    policyType?: PolicyType;
}

const PolicyContext = createContext<PolicyContextProps | undefined>(undefined);

// ✅ Export usePolicy directly (no need for export { usePolicy } later)
export function usePolicy() {
    const context = useContext(PolicyContext);
    if (!context) {
        throw new Error('usePolicy must be used within PolicyProvider');
    }
    return context;
}

const PolicyProvider = ({
                            children,
                        }: PropsWithChildren) => {
    const [policyType, setPolicyType] = useState<PolicyType>();

    const openPolicy = (type: PolicyType) => {
        setPolicyType(type);
    };

    const closePolicy = () => {
        setPolicyType(undefined);
    };

    return (
        <PolicyContext.Provider value={{openPolicy, closePolicy, policyType}}>
            {children}
        </PolicyContext.Provider>)
};

export default PolicyProvider;