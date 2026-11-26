import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/form/input';
import { paths } from '@/config/paths';
import { getErrorMessage } from '@/lib/api-client';
import {
  useForgotPasswordSendOtp,
  useForgotPasswordVerifyOtp,
  useResetPassword,
} from '@/features/auth/api/forgot-password';

const emailSchema = z.object({ email: z.email('Email không hợp lệ') });
const otpSchema = z.object({ otpCode: z.string().trim().length(6, 'Mã OTP gồm 6 chữ số') });
const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export const ForgotPasswordForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  const sendOtp = useForgotPasswordSendOtp({
    onSuccess: (_, vars) => {
      setEmail(vars.email);
      setStep(2);
    },
  });

  const verifyOtp = useForgotPasswordVerifyOtp({
    onSuccess: (res) => {
      const token = res?.data?.resetToken || res?.resetToken;
      setResetToken(token);
      setStep(3);
    },
  });

  const resetPwd = useResetPassword({
    onSuccess: () => setStep(4),
  });

  const emailForm = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: '' } });
  const otpForm = useForm({ resolver: zodResolver(otpSchema), defaultValues: { otpCode: '' } });
  const pwdForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: '' },
  });

  if (step === 4) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          Đặt lại mật khẩu thành công!
        </p>
        <Link
          to={paths.auth.login.getHref()}
          className="inline-block rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form
        onSubmit={emailForm.handleSubmit((v) => sendOtp.mutate(v))}
        className="space-y-4"
        noValidate
      >
        <p className="text-sm text-slate-600">Nhập email đã đăng ký để nhận mã OTP khôi phục.</p>
        <Input
          label="Email"
          type="email"
          error={emailForm.formState.errors.email}
          registration={emailForm.register('email')}
        />
        {sendOtp.isError && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {getErrorMessage(sendOtp.error)}
          </p>
        )}
        <Button type="submit" className="w-full" isLoading={sendOtp.isPending}>
          Gửi mã OTP
        </Button>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form
        onSubmit={otpForm.handleSubmit((v) => verifyOtp.mutate({ email, otpCode: v.otpCode }))}
        className="space-y-4"
        noValidate
      >
        <p className="text-sm text-slate-600">
          Mã OTP đã gửi đến <strong>{email}</strong>.
        </p>
        <Input
          label="Mã OTP"
          placeholder="123456"
          error={otpForm.formState.errors.otpCode}
          registration={otpForm.register('otpCode')}
        />
        {verifyOtp.isError && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {getErrorMessage(verifyOtp.error)}
          </p>
        )}
        <Button type="submit" className="w-full" isLoading={verifyOtp.isPending}>
          Xác minh OTP
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={pwdForm.handleSubmit((v) =>
        resetPwd.mutate({ resetToken, newPassword: v.newPassword }),
      )}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Mật khẩu mới"
        type="password"
        error={pwdForm.formState.errors.newPassword}
        registration={pwdForm.register('newPassword')}
      />
      {resetPwd.isError && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {getErrorMessage(resetPwd.error)}
        </p>
      )}
      <Button type="submit" className="w-full" isLoading={resetPwd.isPending}>
        Cập nhật mật khẩu
      </Button>
    </form>
  );
};
