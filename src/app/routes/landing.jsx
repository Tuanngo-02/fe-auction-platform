import { Link } from 'react-router';

import { Head } from '@/components/seo/head';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
  const user = useUser();

  return (
    <>
      <Head />
      <section className="py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Nền tảng <span className="text-brand-600">đấu giá trực tuyến</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Đặt giá theo thời gian thực, minh bạch và an toàn.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to={paths.auctions.getHref()}
            className="rounded-md bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700"
          >
            Xem phiên đấu giá
          </Link>
          {!user.data && (
            <Link
              to={paths.auth.register.getHref()}
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 font-medium hover:bg-slate-100"
            >
              Tạo tài khoản
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default LandingRoute;
