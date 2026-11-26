import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';

import { Head } from '@/components/seo/head';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

export const AuthLayout = ({
  children,
  title,
  breadcrumbLabel,
  headline = (
    <>
      Minh bạch tuyệt đối.
      <br />
      Giá trị đích thực.
    </>
  ),
  tagline = 'Hệ thống đấu giá trực tuyến được cấp phép, bảo lãnh pháp lý và kết nối giao dịch an toàn hàng đầu Việt Nam.',
}) => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const isLoginPage = location.pathname.includes('/login');

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo || paths.home.getHref(), { replace: true });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col bg-[#F7F7F5] text-[#1a1b23]">
        {/* TOPNAVBAR */}
        <header className="z-50 w-full bg-[#2f3039] shadow-md">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <Link
                to={paths.home.getHref()}
                className="flex items-center gap-2 text-lg font-bold tracking-tight text-[#fe6807]"
              >
                <span className="material-symbols-outlined filled-symbol text-[26px] text-[#fe6807]">
                  gavel
                </span>
                <span>AuctionHub</span>
              </Link>
              <nav className="hidden items-center gap-6 md:flex">
                <Link
                  to={paths.auctions.getHref()}
                  className="text-sm font-semibold text-[#e3e1ed] transition-colors hover:text-white"
                >
                  Quy chế đấu giá
                </Link>
                <a
                  href="#support"
                  className="text-sm font-semibold text-[#e3e1ed] transition-colors hover:text-white"
                >
                  Hỗ trợ pháp lý
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:19008899"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#e3e1ed] transition-colors hover:text-[#fe6807] sm:flex"
              >
                <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                <span>Hỗ trợ trực tuyến</span>
              </a>
              <div className="hidden h-4 w-px bg-[#605d65]/30 sm:block" />
              {isLoginPage ? (
                <Link
                  to={paths.auth.register.getHref()}
                  className="inline-flex h-[38px] items-center justify-center rounded-lg border border-[#fe6807] px-4 text-sm font-semibold text-[#fe6807] transition-colors hover:bg-[#fe6807] hover:text-white"
                >
                  Đăng ký
                </Link>
              ) : (
                <Link
                  to={paths.auth.login.getHref()}
                  className="inline-flex h-[38px] items-center justify-center rounded-lg border border-[#fe6807] px-4 text-sm font-semibold text-[#fe6807] transition-colors hover:bg-[#fe6807] hover:text-white"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* BREADCRUMB */}
        <section className="border-b border-[#E5E5E9] bg-[#F7F7F5]">
          <div className="mx-auto max-w-[1440px] px-6 py-3.5 lg:px-8">
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#62626C]">
              <Link to={paths.home.getHref()} className="transition-colors hover:text-[#09080E]">
                Trang chủ
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Xác thực danh tính</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-semibold text-[#09080E]">{breadcrumbLabel || title}</span>
            </nav>
          </div>
        </section>

        {/* MAIN 2-COLUMN LAYOUT */}
        <main className="flex flex-grow items-center justify-center py-10">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid grid-cols-12 items-stretch gap-8">
              {/* LEFT COLUMN: Branding & Trust Panel */}
              <aside className="relative col-span-12 flex min-h-[460px] flex-col justify-between overflow-hidden rounded-xl border border-[#2f3039] bg-[#09080E] p-8 text-white shadow-xl lg:col-span-5">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(254,104,7,0.28),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(254,104,7,0.18),_transparent_50%)]" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#fe6807]">
                    <span className="material-symbols-outlined filled-symbol text-[26px] text-[#fe6807]">
                      gavel
                    </span>
                    <span>AuctionHub</span>
                  </div>
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#fe6807]/40 bg-[#fe6807]/20 px-3 py-1 backdrop-blur-sm">
                    <span className="material-symbols-outlined filled-symbol text-[16px] text-[#fe6807]">
                      verified
                    </span>
                    <span className="text-xs font-semibold tracking-tight text-[#fe6807]">
                      Sàn đấu giá tài sản quốc gia
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-12">
                  <h2 className="mb-3 text-3xl font-bold leading-snug tracking-tight text-white">
                    {headline}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-[#dad9e4] opacity-90">
                    {tagline}
                  </p>
                </div>
              </aside>

              {/* RIGHT COLUMN: Form Card */}
              <section className="col-span-12 rounded-xl border border-[#E5E5E9] bg-white p-8 shadow-[0_4px_12px_rgba(9,8,14,0.04)] lg:col-span-7">
                {children}
              </section>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer id="support" className="bg-[#2f3039] text-[#e6e1ea]">
          <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 border-b border-[#605d65]/20 pb-6 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#fe6807]/20 text-[#fe6807]">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#dad9e4]">
                    Tổng đài hỗ trợ pháp lý &amp; thủ tục đấu giá:
                  </div>
                  <div className="text-lg font-bold text-white">
                    1900-8899{' '}
                    <span className="text-xs font-normal text-[#fe6807]">(24/7)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
                <a className="transition-colors hover:text-white" href="#terms">
                  Điều khoản dịch vụ
                </a>
                <a className="transition-colors hover:text-white" href="#privacy">
                  Bảo mật thông tin
                </a>
                <a className="transition-colors hover:text-white" href="#ekyc">
                  Xác minh danh tính (eKYC)
                </a>
                <a className="transition-colors hover:text-white" href="#deposit">
                  Quy định đặt cọc
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 pt-6 md:flex-row">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="material-symbols-outlined filled-symbol text-[18px] text-[#fe6807]">
                  gavel
                </span>
                <span>AuctionHub Platform</span>
              </div>
              <div className="text-center text-xs text-[#e6e1ea] md:text-right">
                © {new Date().getFullYear()} AuctionHub. Nền tảng đấu giá trực tuyến được cấp phép
                và chứng thực pháp lý.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
