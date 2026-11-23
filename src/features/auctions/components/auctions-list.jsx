import { useState } from 'react';

import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';

import { useAuctions } from '../api/get-auctions';

import { AuctionCard } from './auction-card';

const PAGE_SIZE = 12;

export const AuctionsList = () => {
  const [page, setPage] = useState(0);
  const auctions = useAuctions({ page, size: PAGE_SIZE });

  if (auctions.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (auctions.isError) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">
        Chưa tải được danh sách phiên đấu giá.
      </div>
    );
  }

  const { data, total } = auctions.data;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (!data.length) {
    return <p className="py-12 text-center text-slate-500">Chưa có phiên đấu giá nào.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Trước
        </Button>
        <span className="text-sm">
          Trang {page + 1} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Sau
        </Button>
      </div>
    </div>
  );
};
