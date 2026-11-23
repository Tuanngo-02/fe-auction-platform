import { Link } from 'react-router';

import { paths } from '@/config/paths';
import { formatCurrency, formatDateTime } from '@/utils/format';

export const AuctionCard = ({ auction }) => {
  return (
    <Link
      to={paths.auction.getHref(auction.id)}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-[4/3] bg-slate-100">
        {auction.imageUrl && (
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 font-semibold group-hover:text-brand-600">{auction.title}</h3>
        <p className="text-lg font-bold text-brand-600">
          {formatCurrency(auction.currentPrice ?? auction.startingPrice)}
        </p>
        <p className="text-xs text-slate-500">Kết thúc: {formatDateTime(auction.endTime)}</p>
      </div>
    </Link>
  );
};
