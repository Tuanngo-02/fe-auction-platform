import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/form/input';
import { getErrorMessage } from '@/lib/api-client';
import { registerInputSchema, useRegister } from '@/lib/auth';

export const RegisterForm = ({ loginHref }) => {
  const registering = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerInputSchema),
    defaultValues: { login: '', email: '', password: '', confirmPassword: '' },
  });

  if (registering.isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.
        </p>
        <Link to={loginHref} className="font-medium text-brand-600 hover:underline">
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((values) => registering.mutate(values))}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Tên đăng nhập"
        autoComplete="username"
        error={errors.login}
        registration={register('login')}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email}
        registration={register('email')}
      />
      <Input
        label="Mật khẩu"
        type="password"
        autoComplete="new-password"
        error={errors.password}
        registration={register('password')}
      />
      <Input
        label="Xác nhận mật khẩu"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword}
        registration={register('confirmPassword')}
      />

      {registering.isError && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {getErrorMessage(registering.error)}
        </p>
      )}

      <Button type="submit" className="w-full" isLoading={registering.isPending}>
        Đăng ký
      </Button>

      <p className="text-center text-sm text-slate-600">
        Đã có tài khoản?{' '}
        <Link to={loginHref} className="font-medium text-brand-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
};
