import { useNavigate } from 'react-router';

import { Head } from '@/components/seo/head';
import { Button } from '@/components/ui/button/button';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';

const AdminDashboardRoute = () => {
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(), { replace: true }),
  });

  const u = user.data;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Head title="Trang chủ Admin" />
      <div className="rounded-2xl border border-[#E5E5E9] bg-white p-6 shadow-xs">
        <h1 className="text-2xl font-bold text-[#09080E]">Trang chủ Admin</h1>
        <p className="mt-2 text-sm text-[#62626C]">
          Tài khoản: <span className="font-semibold text-[#09080E]">{u?.fullName || u?.email}</span>
        </p>
        <p className="mt-1 text-sm text-[#62626C]">
          Vai trò: <span className="font-semibold text-[#09080E]">{(u?.roles || []).join(', ')}</span>
        </p>
        <div className="mt-6">
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

export default AdminDashboardRoute;
