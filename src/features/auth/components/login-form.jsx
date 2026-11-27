import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { api, getErrorMessage } from '@/lib/api-client';
import { loginInputSchema, useLogin } from '@/lib/auth';

export const LoginForm = ({ onSuccess, registerHref }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedIdentifier, setUnverifiedIdentifier] = useState('');
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  const login = useLogin({ onSuccess });
  const resendOtp = useMutation({
    mutationFn: (emailOrPhone) =>
      api.post('/auth/resend-verify-email-otp', { emailOrPhone }, { skipErrorNotification: true }),
    onSuccess: (res) => {
      const targetEmail = res?.data?.email || res?.email || unverifiedIdentifier;
      setShowVerifyPopup(false);
      navigate(paths.auth.verifyEmail.getHref(targetEmail));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { emailOrPhone: '', password: '', rememberMe: false },
  });

  const status = login.error?.response?.status;
  const errorMessageKey = login.error?.response?.data?.message;
  const isEmailNotVerified = status === 400 && errorMessageKey === 'error.emailnotverified';
  const serverError =
    login.isError && !isEmailNotVerified
      ? status === 401
        ? 'Sai email/số điện thoại hoặc mật khẩu'
        : getErrorMessage(login.error)
      : null;

  return (
    <div>
      {/* Form Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#09080E]">Đăng nhập</h1>
        <p className="mt-1 text-base text-[#62626C]">
          Truy cập tài khoản để tham gia các phiên đấu giá trực tuyến
        </p>
      </div>
      <div className="mb-6 h-px w-full bg-[#E5E5E9]" />

      <form
        onSubmit={handleSubmit((values) => {
          login.mutate(values, {
            onError: (err) => {
              if (
                err?.response?.status === 400 &&
                err?.response?.data?.message === 'error.emailnotverified'
              ) {
                setUnverifiedIdentifier(values.emailOrPhone);
                setShowVerifyPopup(true);
              }
            },
          });
        })}
        className="space-y-5"
        noValidate
      >
        {/* Email / Phone Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#09080E]" htmlFor="emailOrPhone">
            Email hoặc Số điện thoại{' '}
            <span aria-hidden="true" className="text-[#ba1a1a]">
              *
            </span>
          </label>
          <input
            id="emailOrPhone"
            type="text"
            autoComplete="username"
            placeholder="vidu@domain.vn hoặc 0905111222"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] placeholder:text-[#62626C] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#09080E]"
            {...register('emailOrPhone')}
          />
          {errors.emailOrPhone && (
            <p className="mt-1.5 text-xs font-medium text-[#ba1a1a]">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#09080E]" htmlFor="password">
            Mật khẩu{' '}
            <span aria-hidden="true" className="text-[#ba1a1a]">
              *
            </span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu của bạn"
              className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white pl-3.5 pr-11 text-sm text-[#09080E] placeholder:text-[#62626C] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#09080E]"
              {...register('password')}
            />
            <button
              type="button"
              aria-label="Ẩn/hiện mật khẩu"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-0 flex h-[44px] items-center justify-center px-3.5 text-[#62626C] transition-colors hover:text-[#09080E]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-[#ba1a1a]">{errors.password.message}</p>
          )}
        </div>

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer select-none items-center gap-2.5">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="h-5 w-5 cursor-pointer rounded border-[#7B7B85] text-[#09080E] focus:ring-2 focus:ring-[#09080E] focus:ring-offset-0"
            />
            <span className="text-sm font-semibold text-[#09080E]">Ghi nhớ đăng nhập</span>
          </label>
          <Link
            to={paths.auth.forgotPassword.getHref()}
            className="text-sm font-semibold text-[#a23f00] hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {serverError && (
          <p
            role="alert"
            className="rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 p-3 text-sm font-medium text-[#93000a]"
          >
            {serverError}
          </p>
        )}

        {/* Primary CTA Button */}
        <div className="pt-2">
          <Button type="submit" className="w-full text-base font-bold" isLoading={login.isPending}>
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
              lock_open
            </span>
            <span>Đăng nhập</span>
          </Button>
        </div>

        
        {/* Redirect to Sign-up */}
        <div className="border-t border-[#E5E5E9] pt-4 text-center">
          <p className="text-sm text-[#62626C]">
            Chưa có tài khoản?{' '}
            <Link to={registerHref} className="ml-1 font-bold text-[#a23f00] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </form>
      {/* Popup xác minh email khi tài khoản chưa kích hoạt OTP */}
      {showVerifyPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="verify-email-popup-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E5E9] bg-white p-6 shadow-xl">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-2xl text-[#FE6807]">
                mark_email_unread
              </span>
              <h2 id="verify-email-popup-title" className="text-lg font-bold text-[#09080E]">
                Email chưa được xác minh
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#62626C]">
              Email của tài khoản chưa được xác minh, hãy xác minh để tiếp tục đăng nhập.
            </p>
            {resendOtp.isError && (
              <p role="alert" className="mt-3 rounded-md bg-red-50 p-2.5 text-xs text-red-700">
                {getErrorMessage(resendOtp.error)}
              </p>
            )}
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowVerifyPopup(false)}
                disabled={resendOtp.isPending}
              >
                Để sau
              </Button>
              <Button
                type="button"
                isLoading={resendOtp.isPending}
                onClick={() => resendOtp.mutate(unverifiedIdentifier)}
              >
                Gửi OTP đến email
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
