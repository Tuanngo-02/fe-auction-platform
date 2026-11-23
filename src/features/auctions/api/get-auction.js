import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

// TODO(BE): endpoint dự kiến
export const getAuction = ({ auctionId }) => api.get(`/auctions/${auctionId}`);

export const getAuctionQueryOptions = (auctionId) =>
  queryOptions({
    queryKey: ['auctions', auctionId],
    queryFn: () => getAuction({ auctionId }),
    enabled: Boolean(auctionId),
  });

export const useAuction = ({ auctionId, queryConfig } = {}) =>
  useQuery({ ...getAuctionQueryOptions(auctionId), ...queryConfig });
