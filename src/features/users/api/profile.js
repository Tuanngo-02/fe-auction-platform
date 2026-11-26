import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useNotifications } from '@/stores/notifications';

export const updateProfile = (data) => api.put('/users/me', data);

export const changePassword = (data) => api.patch('/users/me/password', data);

export const submitSellerVerification = (data) =>
  api.post('/users/me/seller-verification', data);

export const getSellerPublicProfile = async (sellerId) => {
  const res = await api.get(`/sellers/${sellerId}/profile`);
  return res?.data ?? res;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
      addNotification({ type: 'success', title: 'Thành công', message: 'Đã cập nhật hồ sơ' });
    },
  });
};

export const useChangePassword = ({ onSuccess } = {}) => {
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (...args) => {
      addNotification({ type: 'success', title: 'Thành công', message: 'Đã đổi mật khẩu' });
      onSuccess?.(...args);
    },
  });
};

export const useSubmitSellerVerification = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: submitSellerVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
      addNotification({
        type: 'success',
        title: 'Đã gửi yêu cầu',
        message: 'Hồ sơ xác minh người bán đang chờ duyệt',
      });
    },
  });
};

export const useSellerPublicProfile = (sellerId) =>
  useQuery({
    queryKey: ['seller-profile', sellerId],
    queryFn: () => getSellerPublicProfile(sellerId),
    enabled: Boolean(sellerId),
  });
