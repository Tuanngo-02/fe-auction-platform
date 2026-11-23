import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/form/input';
import { loginInputSchema, useLogin } from '@/lib/auth';

export const LoginForm = ({ onSuccess, registerHref }) => {
  const login = useLogin({ onSuccess });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { username: '', password: '', rememberMe: false },
  });

  const status = login.error?.response?.status;
  const serverError = login.isError
    ? status === 401
      ? 'Sai tên đăng nhập hoặc mật khẩu'
      : 'Không thể đăng nhập, vui lòng thử lại'
    : null;

  return (
    <form
      onSubmit={handleSubmit((values) => login.mutate(values))}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Tên đăng nhập"
        autoComplete="username"
        error={errors.username}
        registration={register('username')}
      />
      <Input
        label="Mật khẩu"
        type="password"
        autoComplete="current-password"
        error={errors.password}
        registration={register('password')}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register('rememberMe')}
          className="h-4 w-4 rounded border-slate-300"
        />
        Ghi nhớ đăng nhập
      </label>

      {serverError && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <Button type="submit" className="w-full" isLoading={login.isPending}>
        Đăng nhập
      </Button>

      <p className="text-center text-sm text-slate-600">
        Chưa có tài khoản?{' '}
        <Link to={registerHref} className="font-medium text-brand-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  );
};
