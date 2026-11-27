import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const ADMIN_ROLES = [
  'ROLE_SUPER_ADMIN',
  'ROLE_SYSTEM_ADMIN',
  'ROLE_AUCTION_ADMIN',
  'ROLE_FINANCE_ADMIN',
  'ROLE_SUPPORT_ADMIN',
];

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Đăng nhập" breadcrumbLabel="Đăng nhập tài khoản">
      <LoginForm
        registerHref={paths.auth.register.getHref(redirectTo)}
        onSuccess={(user) => {
          const roles = user?.roles || [];
          const isAdmin = roles.some((r) => ADMIN_ROLES.includes(r));
          if (isAdmin) {
            navigate(paths.app.admin.getHref(), { replace: true });
            return;
          }
          const isSellerAndBidder =
            roles.includes('ROLE_SELLER') && roles.includes('ROLE_BIDDER');
          if (isSellerAndBidder) {
            navigate(paths.app.sellerHome.getHref(), { replace: true });
            return;
          }
          navigate(redirectTo || paths.home.getHref(), { replace: true });
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
