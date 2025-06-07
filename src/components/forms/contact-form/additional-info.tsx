'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useTranslations} from "use-intl";
import {LoadingButton} from "@/components/ui/loading-button";

const useFormSchema = () => {
    return z.object({
        referralSource: z.string().optional(),
        projectBudget: z.string().optional(),
        previousEfforts: z.string().optional(),
        additionalInfo: z.string().optional(),
    });
};

export type AdditionalInfoSchema = z.infer<ReturnType<typeof useFormSchema>>;

interface AdditionalInfoProps {
    onSubmit: (data: AdditionalInfoSchema) => void; // ✅ Add onSubmit prop
    onBack: () => void; // ✅ Navigation back
    initialData?: Partial<AdditionalInfoSchema>; // ✅ Pre-filled data
    submitting: boolean; // ✅ Optional submitting state
}

export function AdditionalInfo({onSubmit, onBack, initialData, submitting}: AdditionalInfoProps) {
    const t = useTranslations('contactForm');

    const form = useForm<AdditionalInfoSchema>({
        resolver: zodResolver(useFormSchema()),
        defaultValues: initialData || {}, // ✅ Set initial data if available
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="referralSource"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('additionalInfo.referralSource.label')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('additionalInfo.referralSource.placeholder')}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem
                                        value="search">{t('additionalInfo.referralSource.values.search')}</SelectItem>
                                    <SelectItem
                                        value="social">{t('additionalInfo.referralSource.values.social')}</SelectItem>
                                    <SelectItem
                                        value="referral">{t('additionalInfo.referralSource.values.referral')}</SelectItem>
                                    <SelectItem
                                        value="event">{t('additionalInfo.referralSource.values.event')}</SelectItem>
                                    <SelectItem
                                        value="other">{t('additionalInfo.referralSource.values.other')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="projectBudget"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('additionalInfo.projectBudget.label')}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('additionalInfo.projectBudget.placeholder')}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="5k-10k">{t('additionalInfo.projectBudget.values.range', {
                                        from: 5000,
                                        to: 10000
                                    })}</SelectItem>
                                    <SelectItem value="10k-25k">{t('additionalInfo.projectBudget.values.range', {
                                        from: 10000,
                                        to: 25000
                                    })}</SelectItem>
                                    <SelectItem value="25k-50k">{t('additionalInfo.projectBudget.values.range', {
                                        from: 25000,
                                        to: 50000
                                    })}</SelectItem>
                                    <SelectItem value="50k-100k">{t('additionalInfo.projectBudget.values.range', {
                                        from: 50000,
                                        to: 100000
                                    })}</SelectItem>
                                    <SelectItem
                                        value="100k+">{t('additionalInfo.projectBudget.values.moreThan', {amount: 100000})}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="previousEfforts"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('additionalInfo.previousEfforts.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('additionalInfo.previousEfforts.placeholder')}
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('additionalInfo.additionalInfo.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('additionalInfo.additionalInfo.placeholder')}
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                        {t('actions.previous')}
                    </Button>
                    <LoadingButton loading={submitting} type="submit" className="flex-1">
                        {t('actions.submit')}
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}
