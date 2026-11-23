import { Link, NavLink, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';
import { cn } from '@/utils/cn';

const navItems = [
  { name: 'Trang chủ', to: paths.home.getHref(), end: true },
  { name: 'Phiên đấu giá', to: paths.auctions.getHref() },
];

export const MainLayout = ({ children }) => {
  const user = useUser();
  const navigate = useNavigate();
  const logout = useLogout({ onSuccess: () => navigate(paths.home.getHref()) });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link to={paths.home.getHref()} className="text-lg font-bold text-brand-600">
              {env.APP_NAME}
            </Link>
            <nav className="flex gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium text-slate-600 hover:text-slate-900',
                      isActive && 'text-brand-600',
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user.data ? (
              <>
                <Link to={paths.app.profile.getHref()} className="text-sm font-medium">
                  {user.data.firstName || user.data.login}
                </Link>
                <Button variant="outline" size="sm" onClick={() => logout.mutate()}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to={paths.auth.login.getHref()} className="text-sm font-medium">
                  Đăng nhập
                </Link>
                <Link
                  to={paths.auth.register.getHref()}
                  className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {env.APP_NAME}
      </footer>
    </div>
  );
};
