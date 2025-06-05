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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    painPoints: z.string().min(10, 'Please describe your challenges in more detail'),
    competitors: z.string().min(2, 'Please provide competitor information'),
    targetAudience: z.string().min(10, 'Please describe your target audience'),
    marketingBudget: z.string().min(1, 'Please select a budget range'),
    timeline: z.string().min(1, 'Please select a timeline'),
});

interface BusinessChallengesProps {
    onNext: (data: z.infer<typeof formSchema>) => void;
    onBack: () => void;
    initialData?: Partial<z.infer<typeof formSchema>>; // ✅ Add initialData prop
}

export function BusinessChallenges({ onNext, onBack, initialData }: BusinessChallengesProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {} // ✅ Set the initial form values
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form submitted with values:', values);
        onNext(values); // Pass the form data to onNext
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="painPoints"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Marketing/Branding Challenges</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your main marketing and branding challenges..."
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
                    name="competitors"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Main Competitors</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="List your main competitors..."
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target Audience Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your target audience..."
                                    className="min-h-[80px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="marketingBudget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marketing Budget Range</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select budget range" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0-5k">$0 - $5,000</SelectItem>
                                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                        <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                        <SelectItem value="50k+">$50,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Desired Timeline</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select timeline" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1-month">Within 1 month</SelectItem>
                                        <SelectItem value="3-months">Within 3 months</SelectItem>
                                        <SelectItem value="6-months">Within 6 months</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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
