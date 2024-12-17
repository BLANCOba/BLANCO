'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    objectives: z.string().min(10, 'Please describe your objectives in more detail'),
    keyResults: z.string().min(10, 'Please specify key results you aim to achieve'),
});

interface ProjectGoalsProps {
    onNext: (data: z.infer<typeof formSchema>) => void;
    onBack: () => void;
    initialData?: Partial<z.infer<typeof formSchema>>;
}

export function ProjectGoals({ onNext, onBack, initialData }: ProjectGoalsProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        onNext(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="objectives"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Objectives</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="What is your main objective for this project?"
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="keyResults"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Key Results</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="What results do you want to achieve from this project?"
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                        Previous
                    </Button>
                    <Button type="submit" className="flex-1">
                        Next Step
                    </Button>
                </div>
            </form>
        </Form>
    );
}
