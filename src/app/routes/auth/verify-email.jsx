import { useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { Head } from '@/components/seo/head';
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form';

const VerifyEmailRoute = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <AuthLayout title="Xác thực email">
      <Head title="Xác thực email" />
      <VerifyOtpForm defaultEmail={email} />
    </AuthLayout>
  );
};

export default VerifyEmailRoute;
