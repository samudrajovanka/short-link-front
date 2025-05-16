'use client';

import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { EllipsisVertical, Trash2, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ConfirmDeleteModal from '@/components/parts/Dashboard/Modal/ConfirmDeleteModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import env from '@/config/env';
import { formatDuration } from '@/lib/helpers/time';

import { LinkItemProps } from './types';

const TEN_MINUTES = 1000 * 60 * 10;

const LinkItem = ({ shortLink }: LinkItemProps) => {
  const shortUrl = env.NEXT_PUBLIC_BASE_URL + '/' + shortLink.slug;
  const createdAtFormatted = dayjs(shortLink.created_at).format('DD MMM YYYY');

  const [isOpenModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const router = useRouter();

  const [countDown, setCountDown] = useState<number | null>(null);

  useEffect(() => {
    const restTime = Date.now() - new Date(shortLink.created_at).getTime();
    const initialCountdown = TEN_MINUTES - restTime;

    if (initialCountdown > 0) {
      setCountDown(initialCountdown);

      const interval = setInterval(() => {
        setCountDown(prev => {
          if (prev !== null && prev <= 1000) {
            clearInterval(interval);
            return 0;
          }
          return (prev ?? 0) - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [shortLink.created_at]);

  const handleToggleModalCofirmDelete = () => {
    setOpenModalConfirmDelete(!isOpenModalConfirmDelete);
  };

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between gap-2">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">
            {shortLink.slug}
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup className="[&>*]:cursor-pointer">
                <DropdownMenuItem onClick={() => router.push(`/app/dashboard/edit/${shortLink.slug}`)}>
                  <Pencil />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleModalCofirmDelete}>
                  <Trash2 className="text-red-500" />
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <a href={shortLink.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">
          {shortLink.originalUrl}
        </a>
        
        <div className="flex gap-2 mt-3">
          <Badge variant="outline">{shortLink.totalAccess} accessed</Badge>
          <Badge variant="outline">{createdAtFormatted}</Badge>
          {countDown !== null && countDown > 0 && (
            <Badge variant="outline">Slug editable: {formatDuration(countDown)}</Badge>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isOpenModalConfirmDelete}
        shortLink={shortLink}
        onClose={handleToggleModalCofirmDelete}
      />
    </>
  );
};

export default LinkItem;