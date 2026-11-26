import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useNotifications } from '@/stores/notifications';

const ADDRESSES_KEY = ['user-addresses'];

export const getAddresses = async () => {
  const res = await api.get('/users/me/addresses');
  return res?.data ?? res;
};

export const createAddress = (data) => api.post('/users/me/addresses', data);

export const deleteAddress = (addressId) => api.delete(`/users/me/addresses/${addressId}`);

export const useAddresses = () => useQuery({ queryKey: ADDRESSES_KEY, queryFn: getAddresses });

export const useCreateAddress = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: createAddress,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      addNotification({ type: 'success', title: 'Thành công', message: 'Đã thêm địa chỉ mới' });
      onSuccess?.(...args);
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      addNotification({ type: 'success', title: 'Thành công', message: 'Đã xóa địa chỉ' });
    },
  });
};
