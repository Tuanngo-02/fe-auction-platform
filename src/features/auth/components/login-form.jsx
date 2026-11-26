import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { loginInputSchema, useLogin } from '@/lib/auth';

export const LoginForm = ({ onSuccess, registerHref }) => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin({ onSuccess });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: { emailOrPhone: '', password: '', rememberMe: false },
  });

  const status = login.error?.response?.status;
  const serverError = login.isError
    ? status === 401
      ? 'Sai email/số điện thoại hoặc mật khẩu'
      : 'Không thể đăng nhập, vui lòng thử lại'
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
        onSubmit={handleSubmit((values) => login.mutate(values))}
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

        {/* Unactivated Account Notice Banner */}
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3.5">
          <span className="material-symbols-outlined filled-symbol mt-0.5 text-[20px] text-[#854D0E]">
            notifications_active
          </span>
          <div className="text-sm font-semibold text-[#854D0E]">
            <span>Tài khoản chưa kích hoạt? </span>
            <Link
              to={paths.auth.verifyEmail.getHref()}
              className="font-semibold text-[#854D0E] underline hover:text-[#561d00]"
            >
              Xác thực email ngay
            </Link>
          </div>
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
    </div>
  );
};
