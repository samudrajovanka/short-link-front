'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import LinkItem from '@/components/parts/Dashboard/LinkItem';
import Pagination from '@/components/parts/Pagination';
import ReactQuery from '@/components/parts/ReactQuery';
import { mapPaginationParams } from '@/lib/helpers/url';
import { useLinks } from '@/query/shortLink';

const LinkList = () => {
  const params = useSearchParams();

  const linksQuery = useLinks({
    ...mapPaginationParams({
      page: params.get('page'),
      limit: params.get('limit')
    })
  });
  
  return (
    <ReactQuery
      queryResult={linksQuery}
      render={({ data, meta }) => (
        <>
          {data.shortLinks.length ? (
            <div className="flex flex-col gap-4">
              {data.shortLinks.map(link => (
                <LinkItem key={link.id} shortLink={link} />
              ))}

              <Pagination
                totalData={meta.pagination.total}
                totalInView={data.shortLinks.length}
                totalPages={meta.pagination.totalPages}
              />
            </div>
          ) : <p>No short link data</p>}
        </>
      )}
    />
  );
};

export default LinkList;