import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Đăng nhập" breadcrumbLabel="Đăng nhập tài khoản">
      <LoginForm
        registerHref={paths.auth.register.getHref(redirectTo)}
        onSuccess={() => navigate(redirectTo || paths.home.getHref(), { replace: true })}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
