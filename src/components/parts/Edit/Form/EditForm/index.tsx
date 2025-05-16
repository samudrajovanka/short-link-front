'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/Text';
import { getLinkKeyQuery, getLinksKeyQuery, useLink } from '@/query/shortLink';
import { updateLink } from '@/repositories/shortLink';
import { updateShortLinkSchema } from '@/schema/shortLink';

const TEN_MINUTES = 1000 * 60 * 10;

const EditForm = () => {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const { slug } = params;
  const { data: { data } } = useLink(slug);
  type UpdateShortLinkSchema = z.infer<typeof updateShortLinkSchema>

  const isUnderTenMinutes = Date.now() - new Date(data.shortLink.created_at).getTime() < TEN_MINUTES;

  const queryClient = useQueryClient();
  const form = useForm<UpdateShortLinkSchema>({
    resolver: zodResolver(updateShortLinkSchema),
    defaultValues: {
      originalUrl: data.shortLink.originalUrl,
      slug: data.shortLink.slug
    }
  });

  const updateShortLink = useMutation({
    mutationFn: (data: UpdateShortLinkSchema) => updateLink(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLinksKeyQuery() });
      queryClient.invalidateQueries({ queryKey: getLinkKeyQuery(slug) });
      router.push('/app/dashboard');
    },
    onError: (error: any) => {
      let errorMessage = 'An error occurred while updating the short link.';

      if (error instanceof Response) {
        if (error.status === 409) {
          errorMessage = 'The slug already exists. Please choose a different slug.';
        }
      }

      toast.error(errorMessage);
    }
  });

  const handleSubmit = async (values: UpdateShortLinkSchema) => {
    updateShortLink.mutate(values);
  };
  
  return (
    <div>
      <Link href="/app/dashboard">
        <Button variant="ghost">
          <ArrowLeft />
          Back
        </Button>
      </Link>

      <div className="bg-white border rounded-lg p-4 mt-5">
        <Form {...form}>
          <Text className="font-medium">Update Short Link</Text>
            
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
                      <Input disabled={!isUnderTenMinutes} placeholder="ex: short-link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-3" disabled={updateShortLink.isPending}>
                {updateShortLink.isPending ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditForm;