import { useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <RegisterForm loginHref={paths.auth.login.getHref(redirectTo)} />
    </AuthLayout>
  );
};

export default RegisterRoute;
