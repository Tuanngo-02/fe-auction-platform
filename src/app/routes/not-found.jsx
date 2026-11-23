import { Link } from 'react-router';

import { Head } from '@/components/seo/head';
import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Head title="Không tìm thấy trang" />
      <h1 className="text-6xl font-bold text-slate-300">404</h1>
      <p className="text-lg">Không tìm thấy trang bạn yêu cầu.</p>
      <Link to={paths.home.getHref()} replace className="text-brand-600 underline">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFoundRoute;
