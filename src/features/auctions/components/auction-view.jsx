import { Head } from '@/components/seo/head';
import { Spinner } from '@/components/ui/spinner/spinner';
import { formatCurrency, formatDateTime } from '@/utils/format';

import { useAuction } from '../api/get-auction';

export const AuctionView = ({ auctionId }) => {
  const auction = useAuction({ auctionId });

  if (auction.isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (auction.isError || !auction.data) {
    return <p className="py-12 text-center text-slate-500">Không tìm thấy phiên đấu giá.</p>;
  }

  const a = auction.data;
  return (
    <>
      <Head title={a.title} />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          {a.imageUrl && (
            <img src={a.imageUrl} alt={a.title} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{a.title}</h1>
          <p className="text-3xl font-bold text-brand-600">
            {formatCurrency(a.currentPrice ?? a.startingPrice)}
          </p>
          <p className="text-sm text-slate-500">Kết thúc: {formatDateTime(a.endTime)}</p>
          {a.description && <p className="whitespace-pre-line text-slate-700">{a.description}</p>}
          {/* TODO: form đặt giá (feature "bids") – ghép ở tầng app */}
        </div>
      </div>
    </>
  );
};
