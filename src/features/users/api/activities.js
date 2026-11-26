import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export const getMyActivities = async ({ page = 0, size = 10 } = {}) => {
  const res = await api.get('/users/me/activities', { params: { page, size } });
  return res?.data ?? res;
};

export const useMyActivities = ({ page = 0, size = 10 } = {}) =>
  useQuery({
    queryKey: ['user-activities', { page, size }],
    queryFn: () => getMyActivities({ page, size }),
  });
