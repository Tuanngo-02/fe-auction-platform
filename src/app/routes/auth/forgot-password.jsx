import { AuthLayout } from '@/components/layouts/auth-layout';
import { Head } from '@/components/seo/head';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

const ForgotPasswordRoute = () => {
  return (
    <AuthLayout title="Khôi phục mật khẩu">
      <Head title="Quên mật khẩu" />
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordRoute;
