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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  objectives: z.string().min(10, 'Please describe your objectives in more detail'),
  areas: z.array(z.string()).min(1, 'Please select at least one area'),
  kpis: z.string().min(10, 'Please describe your KPIs'),
  expectations: z.string().min(10, 'Please describe your expected outcomes'),
});

const areas = [
  { id: 'logo', label: 'Logo Design' },
  { id: 'website', label: 'Website' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'marketing-materials', label: 'Marketing Materials' },
  { id: 'brand-strategy', label: 'Brand Strategy' },
  { id: 'content-creation', label: 'Content Creation' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'seo', label: 'SEO' },
];

interface ProjectGoalsProps {
  onNext: () => void;
  onBack: () => void;
}

export function ProjectGoals({ onNext, onBack }: ProjectGoalsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areas: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Objectives</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your main objectives for brand improvement..."
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
          name="areas"
          render={() => (
            <FormItem>
              <FormLabel>Areas Requiring Attention</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {areas.map((area) => (
                  <FormField
                    key={area.id}
                    control={form.control}
                    name="areas"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(area.id)}
                            onCheckedChange={(checked) => {
                              const updatedAreas = checked
                                ? [...field.value, area.id]
                                : field.value?.filter((value) => value !== area.id);
                              field.onChange(updatedAreas);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {area.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kpis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Performance Indicators (KPIs)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What metrics would define success for you?"
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
          name="expectations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Outcomes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What specific results do you hope to achieve?"
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