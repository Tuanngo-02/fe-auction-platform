import { useNavigate } from 'react-router';

import { Head } from '@/components/seo/head';
import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';

const SellerHomeRoute = () => {
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(), { replace: true }),
  });

  const u = user.data;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Head title="Trang chủ Seller" />
      <div className="rounded-2xl border border-[#E5E5E9] bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-[#09080E]">Trang chủ Seller</h1>
        <p className="mt-2 text-sm text-[#62626C]">
          Người bán: <span className="font-semibold text-[#09080E]">{u?.fullName || u?.email}</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => navigate(paths.home.getHref())}>
            Chuyển sang giao diện Bidder
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => logout.mutate()}
            isLoading={logout.isPending}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerHomeRoute;
