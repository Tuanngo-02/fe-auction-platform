import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/form/input';
import { paths } from '@/config/paths';
import { getErrorMessage } from '@/lib/api-client';
import { useVerifyEmailOtp } from '@/features/auth/api/verify-otp';

const schema = z.object({
  email: z.email('Email không hợp lệ'),
  otpCode: z.string().trim().length(6, 'Mã OTP gồm 6 chữ số'),
});

export const VerifyOtpForm = ({ defaultEmail = '' }) => {
  const verify = useVerifyEmailOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail, otpCode: '' },
  });

  if (verify.isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          Xác thực email thành công! Tài khoản của bạn đã được kích hoạt.
        </p>
        <Link
          to={paths.auth.login.getHref()}
          className="inline-block rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => verify.mutate(v))} className="space-y-4" noValidate>
      <p className="text-sm text-slate-600">
        Vui lòng nhập mã OTP 6 chữ số đã được gửi tới email của bạn để kích hoạt tài khoản.
      </p>
      <Input label="Email" type="email" error={errors.email} registration={register('email')} />
      <Input
        label="Mã OTP"
        placeholder="123456"
        error={errors.otpCode}
        registration={register('otpCode')}
      />

      {verify.isError && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {getErrorMessage(verify.error)}
        </p>
      )}

      <Button type="submit" className="w-full" isLoading={verify.isPending}>
        Xác thực tài khoản
      </Button>
    </form>
  );
};
