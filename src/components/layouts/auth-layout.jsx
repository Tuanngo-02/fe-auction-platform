import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/seo/head';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

export const AuthLayout = ({ children, title }) => {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  // Đã đăng nhập thì không ở lại trang login/register
  useEffect(() => {
    if (user.data) {
      navigate(redirectTo || paths.home.getHref(), { replace: true });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link
            to={paths.home.getHref()}
            className="block text-center text-2xl font-bold text-brand-600"
          >
            {env.APP_NAME}
          </Link>
          <h2 className="mt-4 text-center text-xl font-semibold text-slate-900">{title}</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">{children}</div>
        </div>
      </div>
    </>
  );
};
