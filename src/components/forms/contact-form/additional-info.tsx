'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';

const formSchema = z.object({
    referralSource: z.string().min(1, 'Please select how you heard about us'),
    projectBudget: z.string().min(1, 'Please select a budget range'),
    previousEfforts: z.string().optional(),
    additionalInfo: z.string().optional(),
});

interface AdditionalInfoProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void; // ✅ Add onSubmit prop
    onBack: () => void; // ✅ Navigation back
    initialData?: Partial<z.infer<typeof formSchema>>; // ✅ Pre-filled data
}

export function AdditionalInfo({onSubmit, onBack, initialData}: AdditionalInfoProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {}, // ✅ Set initial data if available
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values); // ✅ Pass the form data to the parent component
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="referralSource"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select source"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="search">Search Engine</SelectItem>
                                    <SelectItem value="social">Social Media</SelectItem>
                                    <SelectItem value="referral">Professional Referral</SelectItem>
                                    <SelectItem value="event">Event/Conference</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
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
                            <FormLabel>Preferred Project Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select budget range"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                    <SelectItem value="100k+">$100,000+</SelectItem>
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
                            <FormLabel>Previous Branding/Marketing Efforts</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe any previous branding or marketing initiatives..."
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
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any other details you'd like to share..."
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
                        Previous
                    </Button>
                    <Button type="submit" className="flex-1">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
