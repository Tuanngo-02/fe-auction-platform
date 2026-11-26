import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { useAddresses, useCreateAddress, useDeleteAddress } from '@/features/users/api/addresses';

const schema = z.object({
  addressText: z.string().trim().min(5, 'Địa chỉ tối thiểu 5 ký tự').max(500),
  isDefault: z.boolean().optional(),
});

export const AddressBook = () => {
  const { data: addresses, isLoading } = useAddresses();
  const deleteAddr = useDeleteAddress();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { addressText: '', isDefault: false },
  });

  const createAddr = useCreateAddress({ onSuccess: () => reset() });

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">pin_drop</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">Sổ địa chỉ giao nhận tài sản</h2>
          <p className="text-xs text-[#62626C]">
            Địa chỉ mặc định sẽ được dùng để giao nhận tài sản khi bạn thắng đấu giá
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((v) => createAddr.mutate(v))}
        className="space-y-3 rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] p-4"
        noValidate
      >
        <label className="block text-sm font-semibold text-[#09080E]" htmlFor="addressText">
          Thêm địa chỉ mới
        </label>
        <input
          id="addressText"
          type="text"
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành..."
          className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
          {...register('addressText')}
        />
        {errors.addressText && (
          <p className="text-xs font-medium text-[#ba1a1a]">{errors.addressText.message}</p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#09080E]">
            <input type="checkbox" {...register('isDefault')} className="h-4 w-4 rounded" />
            Đặt làm địa chỉ mặc định
          </label>
          <Button type="submit" size="sm" isLoading={createAddr.isPending}>
            <span className="material-symbols-outlined text-base">add_location_alt</span>
            <span>Thêm địa chỉ</span>
          </Button>
        </div>
      </form>

      <ul className="divide-y divide-[#E5E5E9]">
        {addresses?.length ? (
          addresses.map((addr) => (
            <li key={addr.addressId} className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-lg text-[#FE6807]">
                  location_on
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#09080E]">{addr.addressText}</p>
                  {addr.isDefault && (
                    <span className="mt-1 inline-block rounded border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
                      Địa chỉ mặc định
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteAddr.mutate(addr.addressId)}
                disabled={deleteAddr.isPending}
              >
                <span className="material-symbols-outlined text-base text-[#ba1a1a]">delete</span>
                <span>Xóa</span>
              </Button>
            </li>
          ))
        ) : (
          <li className="py-6 text-center text-sm text-[#62626C]">Chưa có địa chỉ nào được lưu</li>
        )}
      </ul>
    </div>
  );
};
