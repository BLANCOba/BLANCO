import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'es', 'de', 'ja', 'fr', 'th'],
    localePrefix: 'always',
    defaultLocale: 'en'
});
