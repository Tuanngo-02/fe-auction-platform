import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { useSubmitSellerVerification } from '@/features/users/api/profile';

const schema = z.object({
  idCardNumber: z.string().trim().min(9, 'Số CCCD không hợp lệ').max(30),
  idCardFrontUrl: z.string().trim().min(5, 'Vui lòng nhập đường dẫn ảnh mặt trước CCCD'),
  idCardBackUrl: z.string().trim().min(5, 'Vui lòng nhập đường dẫn ảnh mặt sau CCCD'),
});

export const SellerVerificationForm = ({ sellerStatus }) => {
  const submit = useSubmitSellerVerification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { idCardNumber: '', idCardFrontUrl: '', idCardBackUrl: '' },
  });

  if (sellerStatus === 'VERIFIED') {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-6 text-[#166534]">
        <span className="material-symbols-outlined filled-symbol text-3xl">verified_user</span>
        <div>
          <h2 className="text-lg font-bold">Tài khoản Người bán đã được xác minh (eKYC)</h2>
          <p className="mt-1 text-sm">
            Bạn có đầy đủ quyền đăng sản phẩm, thiết lập giá khởi điểm và mở phiên đấu giá trực
            tuyến trên AuctionHub.
          </p>
        </div>
      </div>
    );
  }

  if (sellerStatus === 'PENDING') {
    return (
      <div className="flex items-start gap-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-6 text-[#854D0E]">
        <span className="material-symbols-outlined filled-symbol text-3xl">hourglass_top</span>
        <div>
          <h2 className="text-lg font-bold">Hồ sơ xác minh đang chờ kiểm duyệt</h2>
          <p className="mt-1 text-sm">
            Hồ sơ CCCD của bạn đã được tiếp nhận và đang chờ Quản trị viên thẩm định pháp lý.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((v) => submit.mutate(v))}
      className="space-y-5 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm"
      noValidate
    >
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">storefront</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">
            Đăng ký &amp; Xác minh Người bán (eKYC)
          </h2>
          <p className="text-xs text-[#62626C]">
            Cung cấp thông tin CCCD/CMND để nâng cấp tài khoản thành Người bán được bảo chứng
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="cccd">
            Số CCCD / CMND <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            id="cccd"
            type="text"
            placeholder="048000123456"
            className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 font-mono text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
            {...register('idCardNumber')}
          />
          {errors.idCardNumber && (
            <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
              {errors.idCardNumber.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="front">
              Đường dẫn ảnh mặt trước CCCD <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="front"
              type="text"
              placeholder="https://..."
              className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
              {...register('idCardFrontUrl')}
            />
            {errors.idCardFrontUrl && (
              <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
                {errors.idCardFrontUrl.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#09080E]" htmlFor="back">
              Đường dẫn ảnh mặt sau CCCD <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="back"
              type="text"
              placeholder="https://..."
              className="h-[44px] w-full rounded-lg border border-[#7B7B85] bg-white px-3.5 text-sm text-[#09080E] focus:border-2 focus:border-[#09080E] focus:outline-none"
              {...register('idCardBackUrl')}
            />
            {errors.idCardBackUrl && (
              <p className="mt-1 text-xs font-medium text-[#ba1a1a]">
                {errors.idCardBackUrl.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-[#E5E5E9] pt-4">
        <Button type="submit" isLoading={submit.isPending}>
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Gửi hồ sơ xác minh</span>
        </Button>
      </div>
    </form>
  );
};
