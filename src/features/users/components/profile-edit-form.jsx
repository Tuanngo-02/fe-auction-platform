import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { useUpdateProfile } from '@/features/users/api/profile';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Họ tên tối thiểu 2 ký tự').max(100),
  birthDate: z.string().optional(),
});

export const ProfileEditForm = ({ user }) => {
  const update = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || '',
      birthDate: user?.birthDate || '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => update.mutate(values))}
      className="space-y-5 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm"
      noValidate
    >
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">edit_note</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">Cập nhật thông tin cá nhân</h2>
          <p className="text-xs text-[#62626C]">
            Email và số điện thoại được bảo vệ, không thể tự thay đổi trực tiếp
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="editName">
            Họ và tên <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="editName"
            type="text"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="editDob">
            Ngày sinh
          </label>
          <input
            id="editDob"
            type="date"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('birthDate')}
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-[#E5E5E9] pt-4">
        <Button type="submit" isLoading={update.isPending}>
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Lưu thay đổi</span>
        </Button>
      </div>
    </form>
  );
};
