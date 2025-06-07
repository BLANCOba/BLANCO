'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useLocale, useTranslations} from "use-intl";
import {PhoneInput} from "@/components/ui/phone-input";
import {isValidPhoneNumber} from "react-phone-number-input";

const useFormSchema = () => {
    const t = useTranslations('contactForm');

    return z.object({
        fullName: z.string().min(2, t('contactPerson.fullName.required')).max(100),
        position: z.string().optional(),
        email: z.string().min(1, t('contactPerson.email.required')).email(t('contactPerson.email.invalid')),
        phone: z.string().min(1, t('contactPerson.phone.required')).refine(isValidPhoneNumber, {message: t('contactPerson.phone.invalid')}),
        preferredContact: z.string().optional(),
    });
};


export type ContactPersonSchema = z.infer<ReturnType<typeof useFormSchema>>;

interface ContactPersonProps {
    onNext: (data: ContactPersonSchema) => void;
    onBack: () => void;
    initialData?: ContactPersonSchema;
}

export function ContactPerson({onNext, onBack, initialData}: ContactPersonProps) {
    const t = useTranslations('contactForm');
    const locale = useLocale();

    const form = useForm<ContactPersonSchema>({
        resolver: zodResolver(useFormSchema()),
        defaultValues: initialData || {
            fullName: '',
            position: '',
            email: '',
            phone: '',
            preferredContact: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
                <div className="text-sm text-muted-foreground mb-6">
                    {t('contactPerson.description')}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    {t('contactPerson.fullName.label')} <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder={t('contactPerson.fullName.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="position"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('contactPerson.position.label')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('contactPerson.position.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    {t('contactPerson.email.label')} <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder={t('contactPerson.email.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    {t('contactPerson.phone.label')} <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                    <PhoneInput locales={locale}
                                                placeholder={t('contactPerson.phone.placeholder')} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="preferredContact"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('contactPerson.preferredContact.label')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('contactPerson.preferredContact.placeholder')}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem
                                        value="email">{t('contactPerson.preferredContact.values.email')}</SelectItem>
                                    <SelectItem
                                        value="phone">{t('contactPerson.preferredContact.values.phone')}</SelectItem>
                                    <SelectItem
                                        value="both">{t('contactPerson.preferredContact.values.both')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                        {t('actions.previous')}
                    </Button>
                    <Button type="submit" className="flex-1">
                        {t('actions.next')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}