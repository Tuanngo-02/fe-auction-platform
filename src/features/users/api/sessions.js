import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useNotifications } from '@/stores/notifications';

const SESSIONS_KEY = ['user-sessions'];

export const getActiveSessions = async () => {
  const res = await api.get('/users/me/sessions');
  return res?.data ?? res;
};

export const revokeSession = (sessionId) => api.delete(`/users/me/sessions/${sessionId}`);

export const useActiveSessions = () =>
  useQuery({ queryKey: SESSIONS_KEY, queryFn: getActiveSessions });

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return useMutation({
    mutationFn: revokeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSIONS_KEY });
      addNotification({
        type: 'success',
        title: 'Đã thu hồi',
        message: 'Phiên đăng nhập đã bị đăng xuất',
      });
    },
  });
};
