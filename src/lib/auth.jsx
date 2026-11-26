import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { Spinner } from '@/components/ui/spinner/spinner';
import { paths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { storage } from '@/lib/storage';

const USER_KEY = ['authenticated-user'];

export const getUser = async () => {
  if (!storage.getToken()) return null;
  try {
    const res = await api.get('/users/me');
    return res?.data ?? res;
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};

export const loginInputSchema = z.object({
  emailOrPhone: z.string().trim().min(1, 'Vui lòng nhập email hoặc số điện thoại'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  rememberMe: z.boolean().optional(),
});

export const registerInputSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Vui lòng nhập họ tên').max(100, 'Họ tên quá dài'),
    email: z.email('Email không hợp lệ').max(254, 'Email quá dài'),
    phone: z.string().trim().min(9, 'Số điện thoại không hợp lệ').max(20, 'Số điện thoại quá dài'),
    birthDate: z.string().optional(),
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').max(100, 'Tối đa 100 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const useUser = () => useQuery({ queryKey: USER_KEY, queryFn: getUser });

export const useLogin = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ emailOrPhone, password, rememberMe = false }) => {
      const res = await api.post(
        '/auth/login',
        { emailOrPhone, password },
        { skipErrorNotification: true },
      );
      const tokenData = res?.data ?? res;
      const accessToken = tokenData?.accessToken || tokenData?.id_token;
      if (accessToken) {
        storage.setToken(accessToken, rememberMe);
      }
      if (tokenData?.refreshToken) {
        localStorage.setItem('auctionhub_refresh_token', tokenData.refreshToken);
      }
      return getUser();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(USER_KEY, user);
      onSuccess?.(user);
    },
  });
};

export const useRegister = ({ onSuccess } = {}) => {
  return useMutation({
    mutationFn: ({ fullName, email, phone, password, birthDate }) =>
      api.post(
        '/auth/register',
        { fullName, email, phone, password, birthDate: birthDate || null },
        { skipErrorNotification: true },
      ),
    onSuccess,
  });
};

export const useLogout = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('auctionhub_refresh_token');
      try {
        if (storage.getToken()) {
          await api.post('/auth/logout', { refreshToken }, { skipErrorNotification: true });
        }
      } finally {
        storage.clearToken();
        localStorage.removeItem('auctionhub_refresh_token');
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(USER_KEY, null);
      queryClient.removeQueries({ predicate: (q) => q.queryKey[0] !== USER_KEY[0] });
      onSuccess?.();
    },
  });
};

export const ProtectedRoute = ({ children }) => {
  const user = useUser();
  const location = useLocation();

  if (user.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!user.data) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
  }

  return children;
};
