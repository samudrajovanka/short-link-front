'use client';

import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { getLinksKeyQuery } from '@/query/shortLink';
import { deleteLink } from '@/repositories/shortLink';

import { ConfirmDeleteModalProps } from './types';

const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
  const queryClient = useQueryClient();
  
  const handleDelete = useMutation({
    mutationFn: () => deleteLink(props.shortLink.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLinksKeyQuery() });
      props.onClose();
    }
  });

  return (
    <AlertDialog open={props.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete &quot;{props.shortLink.slug}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete short link.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClose} disabled={handleDelete.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete.mutate()}
            disabled={handleDelete.isPending}
          >
            {handleDelete.isPending ? 'Deleting...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteModal;