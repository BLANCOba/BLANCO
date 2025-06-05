import {getRequestConfig} from 'next-intl/server';
import {Formats} from "use-intl";
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {getMessageFallback} from "@/i18n/error";

export const formats: Formats = {
    dateTime: {
        short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    },
    number: {
        precise: {
            maximumFractionDigits: 5
        }
    },
    list: {
        enumeration: {
            style: 'long',
            type: 'conjunction'
        }
    }
};

export default getRequestConfig(async ({requestLocale}) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        getMessageFallback,
        formats
    };
});