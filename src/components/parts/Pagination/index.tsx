'use client';

import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Pagination as PaginationShadCn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from '@/components/ui/pagination';
import Text from '@/components/ui/Text';

import { PaginationProps } from './types';

const Pagination = ({
  totalData,
  totalInView,
  totalPages
}: PaginationProps) => {
  const MAX_TOTAL_PAGES = 3;
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  
  const isUnderMaxTotalPages = totalPages <= MAX_TOTAL_PAGES;
  const thirdLastPage = totalPages - MAX_TOTAL_PAGES + 1;
  const isLastSegment = page >= thirdLastPage;

  const renderPageNumbers = () => {    
    const pageNumbers: React.ReactNode[] = [];
    let maxNumberRendered = page + MAX_TOTAL_PAGES - 1;
    let startPage = page;

    if (isUnderMaxTotalPages) {
      maxNumberRendered = totalPages;
      startPage = 1;
    } else if (isLastSegment) {
      maxNumberRendered = totalPages;
      startPage = thirdLastPage;

      pageNumbers.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    for (let i = startPage; i <= maxNumberRendered; i++) {
      const variant = i === page ? 'default' : 'ghost';
      pageNumbers.push(
        <PaginationItem key={i}>
          <Link href={`?page=${i}`}>
            <Button variant={variant} size="icon">
              {i}
            </Button>
          </Link>
        </PaginationItem>
      );
    }

    if (totalPages >= MAX_TOTAL_PAGES && !isLastSegment) {
      pageNumbers.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      router.push(`?page=${nextPage}`);
    }
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      router.push(`?page=${prevPage}`);
    }
  };


  return (
    <div>
      <PaginationShadCn>
        <PaginationContent>
          <PaginationItem>
            <Button variant="secondary" size="icon" onClick={handlePrevPage} disabled={page === 1}>
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {renderPageNumbers()}
          <PaginationItem>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleNextPage}
              disabled={page === totalPages || totalPages === 0}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </PaginationShadCn>

      <Text color="subtitle" typography="small" className="text-center mt-2">
        Total pages is {totalPages} with {totalInView} of {totalData} data
      </Text>
    </div>
  );
};

export default Pagination;