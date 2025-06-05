'use client';

import {Globe} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useLocale, useTranslations} from "use-intl";
import {Locale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

const languages: { code: Locale, name: string }[] = [
    {code: 'en', name: 'English'},
    {code: 'es', name: 'Español'},
    {code: 'de', name: 'Deutsch'},
    {code: 'ja', name: '日本語'},
    {code: 'fr', name: 'Français'},
    {code: 'th', name: 'ไทย'},
];

export function LanguagePicker() {
    const locale = useLocale();
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                    <Globe className="size-5"/>
                    <span className="sr-only">{t('language.select')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={locale} onValueChange={value => {
                    router.replace(
                        pathname,
                        {locale: value as Locale}
                    )
                }}>
                    {languages.map((lang) => (
                        <DropdownMenuRadioItem key={lang.code} value={lang.code}>{lang.name}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}