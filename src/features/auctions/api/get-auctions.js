import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

// TODO(BE): endpoint dự kiến, chờ chốt trong be-auction-platform/.ai/API_CONTRACT.md
// JHipster phân trang: trả mảng + header X-Total-Count
export const getAuctions = async ({ page = 0, size = 12 } = {}) => {
  const res = await api.get('/auctions', {
    params: { page, size, sort: 'endTime,asc' },
    rawResponse: true,
  });
  return {
    data: res.data,
    total: Number(res.headers['x-total-count'] ?? res.data.length),
    page,
    size,
  };
};

export const getAuctionsQueryOptions = ({ page = 0, size = 12 } = {}) =>
  queryOptions({
    queryKey: ['auctions', { page, size }],
    queryFn: () => getAuctions({ page, size }),
  });

export const useAuctions = ({ page, size, queryConfig } = {}) =>
  useQuery({
    ...getAuctionsQueryOptions({ page, size }),
    placeholderData: keepPreviousData,
    ...queryConfig,
  });
