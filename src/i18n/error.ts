"use client";

import {IntlError} from "use-intl";

export function getMessageFallback({key, namespace}: {
    error: IntlError;
    key: string;
    namespace?: string;
}): string {
    if (namespace === 'serverErrors') {
        return key;
    } else {
        return `${namespace}.${key}`;
    }
}