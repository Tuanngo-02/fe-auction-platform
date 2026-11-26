import { Spinner } from '@/components/ui/spinner/spinner';
import { useSellerPublicProfile } from '@/features/users/api/profile';

export const SellerPublicCard = ({ sellerId }) => {
  const { data: seller, isLoading, isError } = useSellerPublicProfile(sellerId);

  if (isLoading) return <Spinner />;
  if (isError || !seller) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
        Không tìm thấy thông tin người bán
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{seller.fullName}</h1>
          <p className="mt-1 text-sm text-slate-500">Mã người bán: #{seller.sellerId}</p>
        </div>
        {seller.verified ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            ✓ Người bán đã xác minh
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Chưa xác minh
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium text-slate-500">Điểm uy tín</p>
          <p className="mt-1 text-xl font-bold text-amber-600">{seller.reputation} ★</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Tổng phiên đấu giá</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{seller.totalAuctions}</p>
        </div>
      </div>
    </div>
  );
};
