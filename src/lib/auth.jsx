import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { Spinner } from '@/components/ui/spinner/spinner';
import { paths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { storage } from '@/lib/storage';

// Tích hợp với JHipster:
//   POST /api/authenticate -> { id_token }
//   GET  /api/account      -> AdminUserDTO
//   POST /api/register     -> 201 (tài khoản cần kích hoạt qua email)

const USER_KEY = ['authenticated-user'];

export const getUser = async () => {
  if (!storage.getToken()) return null;
  try {
    return await api.get('/account');
  } catch (error) {
    if (error.response?.status === 401) return null;
    throw error;
  }
};

export const loginInputSchema = z.object({
  username: z.string().trim().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  rememberMe: z.boolean().optional(),
});

export const registerInputSchema = z
  .object({
    login: z
      .string()
      .trim()
      .min(1, 'Vui lòng nhập tên đăng nhập')
      .max(50, 'Tối đa 50 ký tự')
      .regex(/^[_.@A-Za-z0-9-]+$/, 'Chỉ dùng chữ, số và các ký tự _ . @ -'),
    email: z.email('Email không hợp lệ').max(254, 'Email quá dài'),
    password: z.string().min(4, 'Mật khẩu tối thiểu 4 ký tự').max(100, 'Tối đa 100 ký tự'),
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
    mutationFn: async ({ username, password, rememberMe = false }) => {
      const res = await api.post(
        '/authenticate',
        { username, password, rememberMe },
        { skipErrorNotification: true },
      );
      storage.setToken(res.id_token, rememberMe);
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
    mutationFn: ({ login, email, password }) =>
      api.post(
        '/register',
        { login, email, password, langKey: 'vi' },
        { skipErrorNotification: true },
      ),
    onSuccess,
  });
};

export const useLogout = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // JWT stateless: chỉ cần xóa token phía client
      storage.clearToken();
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
