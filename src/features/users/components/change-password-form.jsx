import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { useChangePassword } from '@/features/users/api/profile';

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
    newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const changePwd = useChangePassword({ onSuccess: () => reset() });

  return (
    <form
      onSubmit={handleSubmit(({ currentPassword, newPassword }) =>
        changePwd.mutate({ currentPassword, newPassword }),
      )}
      className="space-y-4 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm"
      noValidate
    >
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">lock_reset</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">Thay đổi mật khẩu</h2>
          <p className="text-xs text-[#62626C]">
            Sử dụng mật khẩu mạnh để bảo vệ tài sản và ví ký quỹ của bạn
          </p>
        </div>
      </div>

      <div className="max-w-md space-y-4 pt-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="curPwd">
            Mật khẩu hiện tại <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="curPwd"
            type="password"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('currentPassword')}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="newPwd">
            Mật khẩu mới <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="newPwd"
            type="password"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="cnfPwd">
            Xác nhận mật khẩu mới <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="cnfPwd"
            type="password"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" isLoading={changePwd.isPending}>
          <span className="material-symbols-outlined text-[18px]">key</span>
          <span>Cập nhật mật khẩu</span>
        </Button>
      </div>
    </form>
  );
};
