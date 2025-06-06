'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useTranslations} from "use-intl";

const useFormSchema = () => {
    const t = useTranslations('contactForm');
    return z.object({
        painPoints: z.string().min(10, t('businessChallenges.painPoints.invalid')).optional(),
        competitors: z.string().optional(),
        targetAudience: z.string().min(10, t('businessChallenges.targetAudience.invalid')).optional(),
        marketingBudget: z.string().optional(),
        timeline: z.string().optional(),
    });
};

export type BusinessChallengesSchema = z.infer<ReturnType<typeof useFormSchema>>;

interface BusinessChallengesProps {
    onNext: (data: BusinessChallengesSchema) => void;
    onBack: () => void;
    initialData?: Partial<BusinessChallengesSchema>; // ✅ Add initialData prop
}

export function BusinessChallenges({onNext, onBack, initialData}: BusinessChallengesProps) {
    const t = useTranslations('contactForm');

    const form = useForm<BusinessChallengesSchema>({
        resolver: zodResolver(useFormSchema()),
        defaultValues: initialData || {} // ✅ Set the initial form values
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="painPoints"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('businessChallenges.painPoints.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('businessChallenges.timeline.placeholder')}
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="competitors"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('businessChallenges.competitors.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('businessChallenges.competitors.placeholder')}
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
                    name="targetAudience"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('businessChallenges.targetAudience.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('businessChallenges.targetAudience.placeholder')}
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="marketingBudget"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('businessChallenges.budget.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('businessChallenges.budget.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value="0-5k">{t('businessChallenges.budget.values.lessThan', {amount: 5000})}</SelectItem>
                                        <SelectItem value="5k-10k">{t('businessChallenges.budget.values.range', {
                                            from: 5000,
                                            to: 10000
                                        })}</SelectItem>
                                        <SelectItem value="10k-25k">{t('businessChallenges.budget.values.range', {
                                            from: 10000,
                                            to: 25000
                                        })}</SelectItem>
                                        <SelectItem value="25k-50k">{t('businessChallenges.budget.values.range', {
                                            from: 25000,
                                            to: 50000
                                        })}</SelectItem>
                                        <SelectItem
                                            value="50k+">{t('businessChallenges.budget.values.moreThan', {amount: 50000})}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timeline"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{t('businessChallenges.timeline.label')}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('businessChallenges.timeline.placeholder')}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value="1-month">{t('businessChallenges.timeline.values.within', {months: 1})}</SelectItem>
                                        <SelectItem
                                            value="3-months">{t('businessChallenges.timeline.values.within', {months: 3})}</SelectItem>
                                        <SelectItem
                                            value="6-months">{t('businessChallenges.timeline.values.within', {months: 6})}</SelectItem>
                                        <SelectItem
                                            value="flexible">{t('businessChallenges.timeline.values.flexible')}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

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
