'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useTranslations} from "use-intl";

const useFormSchema = () => {
    const t = useTranslations('contactForm');

    return z.object({
        companyName: z.string().min(1, t('companyDetails.companyName.required')),
        industry: z.string().optional(),
        yearsInBusiness: z.string().optional(),
        companySize: z.string().optional(),
        revenue: z.string().optional(),
        website: z.string().url().optional().or(z.literal('')),
    });
};


export type CompanyDetailsSchema = z.infer<ReturnType<typeof useFormSchema>>;

interface CompanyDetailsProps {
    onNext: (data: CompanyDetailsSchema) => void;
    initialData?: CompanyDetailsSchema;
}

export function CompanyDetails({onNext, initialData}: CompanyDetailsProps) {
    const t = useTranslations('contactForm');

    const form = useForm<CompanyDetailsSchema>({
        resolver: zodResolver(useFormSchema()),
        defaultValues: initialData || {
            companyName: '',
            industry: '',
            yearsInBusiness: '',
            companySize: '',
            revenue: '',
            website: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
                <div className="text-sm text-muted-foreground mb-6">
                    {t('companyDetails.description')}
                </div>

                <FormField
                    control={form.control}
                    name="companyName"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('companyDetails.companyName.label')} <span
                                className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder={t('companyDetails.companyName.placeholder')} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="industry"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('companyDetails.industry.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('companyDetails.industry.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value="technology">{t('companyDetails.industry.values.technology')}</SelectItem>
                                        <SelectItem
                                            value="retail">{t('companyDetails.industry.values.retail')}</SelectItem>
                                        <SelectItem
                                            value="healthcare">{t('companyDetails.industry.values.healthcare')}</SelectItem>
                                        <SelectItem
                                            value="finance">{t('companyDetails.industry.values.finance')}</SelectItem>
                                        <SelectItem
                                            value="manufacturing">{t('companyDetails.industry.values.manufacturing')}</SelectItem>
                                        <SelectItem
                                            value="other">{t('companyDetails.industry.values.other')}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="yearsInBusiness"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('companyDetails.yearsInBusiness.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('companyDetails.yearsInBusiness.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value="0-1">{t('companyDetails.yearsInBusiness.values.lessThan', {years: 1})}</SelectItem>
                                        <SelectItem
                                            value="1-3">{t('companyDetails.yearsInBusiness.values.range', {
                                            from: 1,
                                            to: 3
                                        })}</SelectItem>
                                        <SelectItem value="3-5">{t('companyDetails.yearsInBusiness.values.range', {
                                            from: 3,
                                            to: 5
                                        })}</SelectItem>
                                        <SelectItem value="5-10">{t('companyDetails.yearsInBusiness.values.range', {
                                            from: 5,
                                            to: 10
                                        })}</SelectItem>
                                        <SelectItem
                                            value="10+">{t('companyDetails.yearsInBusiness.values.moreThan', {years: 10})}</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="companySize"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('companyDetails.companySize.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('companyDetails.companySize.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1-10">{t('companyDetails.companySize.values.range', {
                                            from: 1,
                                            to: 10
                                        })}</SelectItem>
                                        <SelectItem value="11-50">{t('companyDetails.companySize.values.range', {
                                            from: 11,
                                            to: 50
                                        })}</SelectItem>
                                        <SelectItem value="51-200">{t('companyDetails.companySize.values.range', {
                                            from: 51,
                                            to: 200
                                        })}</SelectItem>
                                        <SelectItem value="201-500">{t('companyDetails.companySize.values.range', {
                                            from: 201,
                                            to: 500
                                        })}</SelectItem>
                                        <SelectItem
                                            value="500+">{t('companyDetails.companySize.values.moreThan', {employees: 500})}</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="revenue"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('companyDetails.revenue.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('companyDetails.revenue.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0-100k">$0 - $100K</SelectItem>
                                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                                        <SelectItem value="5m+">$5M+</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="website"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('companyDetails.website.label')}</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">{t('actions.next')}</Button>
            </form>
        </Form>
    );
}