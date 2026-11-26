import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { getErrorMessage } from '@/lib/api-client';
import { registerInputSchema, useRegister } from '@/lib/auth';
import { cn } from '@/utils/cn';

export const RegisterForm = ({ loginHref }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('BIDDER');
  const [showPassword, setShowPassword] = useState(false);

  const registering = useRegister({
    onSuccess: (_, variables) => {
      navigate(paths.auth.verifyEmail.getHref(variables.email));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div>
      {/* Form Header */}
      <div className="mb-6 border-b border-[#E5E5E9] pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#09080E]">Tạo tài khoản mới</h1>
        <p className="mt-1 text-sm text-[#605d65]">
          Bắt đầu hành trình đấu giá và sở hữu tài sản giá trị được bảo đảm pháp lý.
        </p>
      </div>

      {/* Role Selector (Segmented Tabs) */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-[#09080E]">
          Chọn vai trò tham gia
        </label>
        <div className="grid grid-cols-2 gap-1.5 rounded-lg bg-[#F1F1F0] p-1" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'BIDDER'}
            onClick={() => setRole('BIDDER')}
            className={cn(
              'flex h-10 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all',
              role === 'BIDDER'
                ? 'bg-white text-[#09080E] shadow-sm'
                : 'bg-transparent text-[#62626C] hover:text-[#09080E]',
            )}
          >
            <span
              className={cn(
                'material-symbols-outlined text-[18px]',
                role === 'BIDDER' && 'text-[#a23f00]',
              )}
            >
              person
            </span>
            <span>Đấu giá viên (Bidder)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'SELLER'}
            onClick={() => setRole('SELLER')}
            className={cn(
              'flex h-10 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all',
              role === 'SELLER'
                ? 'bg-white text-[#09080E] shadow-sm'
                : 'bg-transparent text-[#62626C] hover:text-[#09080E]',
            )}
          >
            <span
              className={cn(
                'material-symbols-outlined text-[18px]',
                role === 'SELLER' && 'text-[#a23f00]',
              )}
            >
              storefront
            </span>
            <span>Người bán (Seller)</span>
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#605d65]">
          <span className="material-symbols-outlined text-[16px] text-[#a23f00]">info</span>
          <span>
            {role === 'BIDDER'
              ? 'Bidder: Tham gia trả giá và sở hữu tài sản đã được thẩm định pháp lý công khai.'
              : 'Seller: Sau khi kích hoạt tài khoản, bạn có thể gửi CCCD để xác minh mở phiên đấu giá.'}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <form
        onSubmit={handleSubmit((values) => registering.mutate(values))}
        className="space-y-4"
        noValidate
      >
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="fullName">
            Họ và tên <span className="text-[#ba1a1a]">*</span>{' '}
            <span className="text-xs font-normal text-[#605d65]">(Theo CCCD / Hộ chiếu)</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="NGUYEN VAN A"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] px-3.5 text-sm text-[#09080E] placeholder-[#9E9EA7] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="email">
              Địa chỉ email <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="vidu@domain.vn"
              className="h-[44px] w-full rounded-lg border border-[#7B7B85] px-3.5 text-sm text-[#09080E] placeholder-[#9E9EA7] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="phone">
              Số điện thoại <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-[#7B7B85] bg-[#F7F7F5] px-3 text-sm font-semibold text-[#62626C]">
                +84
              </span>
              <input
                id="phone"
                type="tel"
                placeholder="0905123456"
                className="h-[44px] w-full rounded-r-lg border border-[#7B7B85] px-3.5 text-sm text-[#09080E] placeholder-[#9E9EA7] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
                {...register('phone')}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              className="mb-1.5 block text-sm font-semibold text-[#09080E]"
              htmlFor="birthDate"
            >
              Ngày sinh
            </label>
            <input
              id="birthDate"
              type="date"
              className="h-[44px] w-full rounded-lg border border-[#7B7B85] px-3.5 text-sm text-[#09080E] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
              {...register('birthDate')}
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-semibold text-[#09080E]"
              htmlFor="reg-password"
            >
              Mật khẩu <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Tối thiểu 6 ký tự"
                className="h-[44px] w-full rounded-lg border border-[#7B7B85] pl-3.5 pr-10 text-sm text-[#09080E] placeholder-[#9E9EA7] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-0 flex h-[44px] items-center px-3 text-[#62626C] hover:text-[#09080E]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            className="mb-1.5 block text-sm font-semibold text-[#09080E]"
            htmlFor="confirmPassword"
          >
            Xác nhận mật khẩu <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] px-3.5 text-sm text-[#09080E] placeholder-[#9E9EA7] transition-all focus:border-2 focus:border-[#09080E] focus:outline-none focus:ring-0"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {registering.isError && (
          <p
            role="alert"
            className="rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 p-3 text-sm font-medium text-[#93000a]"
          >
            {getErrorMessage(registering.error)}
          </p>
        )}

        <Button
          type="submit"
          className="w-full text-base font-bold"
          isLoading={registering.isPending}
        >
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
          <span>Đăng ký tài khoản</span>
        </Button>

        <div className="border-t border-[#E5E5E9] pt-4 text-center">
          <p className="text-sm text-[#62626C]">
            Đã có tài khoản?{' '}
            <Link to={loginHref} className="ml-1 font-bold text-[#a23f00] hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
