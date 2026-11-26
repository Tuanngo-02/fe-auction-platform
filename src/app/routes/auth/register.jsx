import { useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      breadcrumbLabel="Tạo tài khoản thành viên"
      headline="Không gian đấu giá đỉnh cao & minh bạch"
      tagline="Khám phá và sở hữu kiệt tác nghệ thuật, tài sản giá trị cùng hệ thống giám sát chuẩn mực quốc tế."
    >
      <RegisterForm loginHref={paths.auth.login.getHref(redirectTo)} />
    </AuthLayout>
  );
};

export default RegisterRoute;
