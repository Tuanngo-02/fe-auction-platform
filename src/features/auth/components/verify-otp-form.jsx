import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/form/input';
import { paths } from '@/config/paths';
import { useVerifyEmailOtp } from '@/features/auth/api/verify-otp';
import { getErrorMessage } from '@/lib/api-client';

const schema = z.object({
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
    defaultValues: { otpCode: '' },
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

  if (!defaultEmail) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-md bg-amber-50 p-4 text-sm text-amber-800">
          Không tìm thấy thông tin email cần xác thực. Vui lòng đăng ký hoặc đăng nhập lại.
        </p>
        <Link
          to={paths.auth.login.getHref()}
          className="inline-block rounded-md bg-[#09080E] px-4 py-2 text-sm font-semibold text-white"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((v) => verify.mutate({ email: defaultEmail, otpCode: v.otpCode }))}
      className="space-y-4"
      noValidate
    >
      <div className="rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] p-3.5 text-sm text-[#62626C]">
        Mã OTP đã được gửi đến{' '}
        <span className="font-semibold text-[#09080E]">{defaultEmail}</span>. Vui lòng kiểm tra
        hộp thư và nhập mã gồm 6 chữ số bên dưới để kích hoạt tài khoản.
      </div>
      <Input
        label="Mã OTP"
        placeholder="Nhập 6 chữ số (VD: 123456)"
        maxLength={6}
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
