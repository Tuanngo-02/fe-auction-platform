import { Link, NavLink, useNavigate } from 'react-router';

import { paths } from '@/config/paths';
import { useLogout, useUser } from '@/lib/auth';
import { cn } from '@/utils/cn';

const navItems = [
  { name: 'Phiên đấu giá', to: paths.auctions.getHref(), icon: 'explore' },
  { name: 'Quy chế đấu giá', to: paths.home.getHref(), icon: 'policy', end: true },
];

export const MainLayout = ({ children }) => {
  const user = useUser();
  const navigate = useNavigate();
  const logout = useLogout({ onSuccess: () => navigate(paths.home.getHref()) });

  const displayName =
    user.data?.fullName || user.data?.firstName || user.data?.email || 'Thành viên';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#F7F7F5] text-[#09080E]">
      {/* TOPNAVBAR STITCH STYLE */}
      <header className="sticky top-0 z-50 border-b border-[#605d65]/20 bg-[#2f3039]">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8">
            <Link to={paths.home.getHref()} className="group flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FE6807] text-white shadow-sm">
                <span className="material-symbols-outlined filled-symbol text-xl">gavel</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Auction<span className="text-[#FE6807]">Hub</span>
              </span>
              <span className="ml-1 hidden rounded border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80 sm:inline">
                e-Auction
              </span>
            </Link>

            <nav className="hidden items-center space-x-6 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 text-sm font-semibold text-[#e3e1ed] transition-colors hover:text-white',
                      isActive && 'text-[#FE6807]',
                    )
                  }
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search bar */}
          <div className="mx-8 hidden max-w-md flex-1 items-center lg:flex">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-white/40">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm tài sản, phiên đấu giá, quyết định thi hành..."
                className="w-full rounded-lg border border-white/15 bg-white/10 py-2 pl-9 pr-10 text-sm text-white placeholder-white/40 transition-all focus:border-[#FE6807] focus:outline-none focus:ring-1 focus:ring-[#FE6807]"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[11px] font-medium text-white/60">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user.data ? (
              <>
                {/* Notification Bell */}
                <button
                  type="button"
                  title="Thông báo hệ thống"
                  className="relative rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span className="material-symbols-outlined text-2xl">notifications</span>
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FE6807] ring-2 ring-[#09080E]" />
                </button>
                <div className="h-6 w-px bg-white/20" />
                <Link
                  to={paths.app.profile.getHref()}
                  className="flex items-center gap-3 rounded-lg pl-1 transition-colors hover:bg-white/5"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#FE6807] to-amber-500 p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-[#1A1A24] text-xs font-bold text-white">
                      {initials}
                    </div>
                  </div>
                  <div className="hidden flex-col text-left sm:flex">
                    <span className="text-sm font-semibold leading-tight text-white">
                      {displayName}
                    </span>
                    <span className="text-[11px] font-medium text-[#FE6807]">
                      Mã: BID-{user.data.userId || '88294'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined hidden text-lg text-white/60 sm:inline">
                    expand_more
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  title="Đăng xuất"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#FE6807] hover:text-[#FE6807]"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span className="hidden sm:inline">Thoát</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={paths.auth.login.getHref()}
                  className="text-sm font-semibold text-[#e3e1ed] transition-colors hover:text-white"
                >
                  Đăng nhập
                </Link>
                <Link
                  to={paths.auth.register.getHref()}
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-[#FE6807] px-4 text-sm font-bold text-[#09080E] transition-colors hover:bg-[#e05600]"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-grow px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-[#2f3039] text-[#e6e1ea]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-6 text-xs sm:flex-row lg:px-8">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="material-symbols-outlined filled-symbol text-[18px] text-[#fe6807]">
              gavel
            </span>
            <span>AuctionHub Platform</span>
          </div>
          <div className="text-center text-[#dad9e4]">
            © {new Date().getFullYear()} AuctionHub. Nền tảng đấu giá trực tuyến minh bạch &amp; an
            toàn.
          </div>
        </div>
      </footer>
    </div>
  );
};
