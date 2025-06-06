'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {useTranslations} from "use-intl";

const useFormSchema = () => {
    const t = useTranslations('contactForm');

    return z.object({
        objectives: z.string().min(10, t('projectGoals.objectives.invalid')).optional(),
        keyResults: z.string().min(10, t('projectGoals.keyResults.invalid')).optional(),
    });
};

export type ProjectGoalsSchema = z.infer<ReturnType<typeof useFormSchema>>;

interface ProjectGoalsProps {
    onNext: (data: ProjectGoalsSchema) => void;
    onBack: () => void;
    initialData?: Partial<ProjectGoalsSchema>;
}

export function ProjectGoals({onNext, onBack, initialData}: ProjectGoalsProps) {
    const t = useTranslations('contactForm');

    const form = useForm<ProjectGoalsSchema>({
        resolver: zodResolver(useFormSchema()),
        defaultValues: initialData || {},
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="objectives"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('projectGoals.objectives.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('projectGoals.objectives.placeholder')}
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
                    name="keyResults"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('projectGoals.keyResults.label')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('projectGoals.keyResults.placeholder')}
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
                    <Button type="submit" className="flex-1">
                        {t('actions.next')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
