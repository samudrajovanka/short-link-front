'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/Text';
import { getLinksKeyQuery } from '@/query/shortLink';
import { createLink } from '@/repositories/shortLink';
import { createShortLinkSchema } from '@/schema/shortLink';

const CreateForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createShortLinkSchema>>({
    resolver: zodResolver(createShortLinkSchema),
    defaultValues: {
      originalUrl: '',
      slug: ''
    }
  });

  const createShortLink = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLinksKeyQuery() });
      form.reset();
    },
    onError: (error: any) => {
      let errorMessage = 'An error occurred while creating the short link.';

      if (error instanceof Response) {
        if (error.status === 409) {
          errorMessage = 'The slug already exists. Please choose a different slug.';
        }
      }

      toast.error(errorMessage);
    }
  });

  const handleSubmit = async (values: z.infer<typeof createShortLinkSchema>) => {
    createShortLink.mutate(values);
  };
  
  return (
    <div className="bg-white border rounded-lg p-4">
      <Form {...form}>
        <Text className="font-medium">Create Short Link</Text>
          
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4 mt-5">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original URL<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="ex: https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="ex: short-link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 items-center mt-3">
              <Button type="submit" className="flex-1" disabled={createShortLink.isPending}>
                {createShortLink.isPending ? 'Creating...' : 'Create'}
              </Button>

              <Button type="button" variant="secondary" size="icon" onClick={() => form.reset()}>
                <Trash2 className="text-red-500" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;