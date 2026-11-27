import { useState } from 'react';
import { Link } from 'react-router';

import { Head } from '@/components/seo/head';
import { paths } from '@/config/paths';
import { ActiveSessions } from '@/features/users/components/active-sessions';
import { ActivityHistory } from '@/features/users/components/activity-history';
import { AddressBook } from '@/features/users/components/address-book';
import { ChangePasswordForm } from '@/features/users/components/change-password-form';
import { ProfileEditForm } from '@/features/users/components/profile-edit-form';
import { SellerVerificationForm } from '@/features/users/components/seller-verification-form';
import { useUser } from '@/lib/auth';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';

const profileMenuItems = [
  { id: 'overview', label: 'Hồ sơ cá nhân', icon: 'badge' },
  { id: 'edit', label: 'Chỉnh sửa hồ sơ', icon: 'edit_note' },
  { id: 'password', label: 'Đổi mật khẩu', icon: 'lock_reset' },
  { id: 'sessions', label: 'Phiên đăng nhập & thiết bị', icon: 'devices' },
  { id: 'addresses', label: 'Sổ địa chỉ', icon: 'pin_drop' },
  { id: 'seller', label: 'Xác minh người bán', badge: 'Nâng cấp', icon: 'storefront' },
  { id: 'activities', label: 'Lịch sử hoạt động', icon: 'manage_search' },
];

const ProfileOverview = ({ user, onTabChange }) => {
  const displayName = user.fullName || user.email || 'Thành viên';
  const initial = displayName.charAt(0).toUpperCase();
  const isVerified = user.sellerStatus === 'VERIFIED';

  return (
    <div className="space-y-6">
      {/* PROFILE OVERVIEW CARD */}
      <div className="rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full border-2 border-[#FE6807] bg-white p-1 shadow-sm">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#FE6807] to-[#E05600] text-2xl font-extrabold tracking-wider text-white">
                  {initial}
                </div>
              </div>
              <div
                className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#166534] text-white shadow-xs"
                title="Tài khoản hợp lệ"
              >
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-[#09080E]">{displayName}</h2>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#166534]">
                    <span className="material-symbols-outlined filled-symbol text-sm">
                      verified_user
                    </span>
                    Đã định danh eKYC Cấp 2
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E5E9] bg-[#F7F7F5] px-3 py-1 text-xs font-semibold text-[#62626C]">
                    Trạng thái: {user.sellerStatus || 'UNVERIFIED'}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#62626C]">
                <span className="flex items-center gap-1">
                  <strong className="text-[#09080E]">Mã thành viên:</strong>
                  <span className="rounded border border-[#E5E5E9] bg-[#F7F7F5] px-1.5 py-0.5 font-mono font-semibold text-[#09080E]">
                    BID-{user.userId}
                  </span>
                </span>
                <span className="text-[#605d65]/40">•</span>
                <span>
                  <strong className="text-[#09080E]">Điểm uy tín:</strong>{' '}
                  <span className="font-bold text-[#FE6807]">{user.reputation || '5.0'} ★</span>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 pt-2 sm:w-auto sm:pt-0">
            <button
              type="button"
              onClick={() => onTabChange('edit')}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#09080E] px-4 text-sm font-semibold text-[#09080E] shadow-xs transition-all hover:bg-[#09080E] hover:text-white active:translate-y-px sm:w-auto"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              <span>Chỉnh sửa hồ sơ</span>
            </button>
          </div>
        </div>
      </div>

      {/* THẺ 1: THÔNG TIN ĐỊNH DANH CÁ NHÂN */}
      <div className="rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between border-b border-[#E5E5E9] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
              <span className="material-symbols-outlined text-xl">id_card</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#09080E]">
                Thông tin cá nhân (Theo CCCD gắn chip)
              </h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-[#BBF7D0] bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-semibold text-[#166534]">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            {user.emailVerified ? 'Đã xác thực' : 'Chờ xác thực'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 py-5 text-sm md:grid-cols-2">
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-medium text-[#62626C]">Họ và tên</span>
            <div className="rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] px-3.5 py-2.5 text-sm font-bold text-[#09080E]">
              {user.fullName || '—'}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-medium text-[#62626C]">
              Số Căn cước công dân / Định danh
            </span>
            <div className="flex items-center justify-between rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] px-3.5 py-2.5 font-mono text-sm font-bold text-[#09080E]">
              <span>{user.maskedIdCard || 'Chưa cập nhật'}</span>
              <span
                className="material-symbols-outlined text-base text-[#605d65]/60"
                title="Bảo mật một phần thông tin"
              >
                visibility_off
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-medium text-[#62626C]">Ngày tháng năm sinh</span>
            <div className="rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] px-3.5 py-2.5 text-sm font-semibold text-[#09080E]">
              {user.birthDate || 'Chưa cập nhật'}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-medium text-[#62626C]">Quốc tịch</span>
            <div className="rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] px-3.5 py-2.5 text-sm font-semibold text-[#09080E]">
              Việt Nam
            </div>
          </div>
        </div>
      </div>

      {/* THẺ 2: THÔNG TIN LIÊN HỆ & THÔNG BÁO GIAO DỊCH */}
      <div className="rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E5E9] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
              <span className="material-symbols-outlined text-xl">contact_mail</span>
            </div>
            <h3 className="text-base font-bold text-[#09080E]">
              Thông tin liên hệ &amp; Thông báo giao dịch
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onTabChange('addresses')}
            className="flex items-center gap-1 text-xs font-semibold text-[#FE6807] hover:underline"
          >
            <span>Quản lý Sổ địa chỉ</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        <div className="mt-2 divide-y divide-[#E5E5E9]">
          <div className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-lg text-[#605d65]/70">
                mail
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#62626C]">
                    Địa chỉ Email chính thức:
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Đã xác thực
                  </span>
                </div>
                <div className="mt-0.5 text-sm font-semibold text-[#09080E]">{user.email}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-lg text-[#605d65]/70">
                phone_android
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#62626C]">
                    Số điện thoại đăng ký nhận OTP:
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded border border-[#BBF7D0] bg-[#F0FDF4] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
                    <span className="material-symbols-outlined text-xs">shield_person</span>
                    Đã kích hoạt OTP
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-sm font-semibold text-[#09080E]">
                  {user.phone || '—'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 pt-4 sm:flex-row sm:items-start">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-lg text-[#605d65]/70">
                home_pin
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#62626C]">
                    Địa chỉ liên hệ &amp; nhận bàn giao hồ sơ/tài sản:
                  </span>
                  <span className="inline-flex items-center rounded border border-[#E5E5E9] bg-[#F7F7F5] px-2 py-0.5 text-[11px] font-semibold text-[#09080E]">
                    Mặc định
                  </span>
                </div>
                <div className="mt-1 text-sm font-medium leading-snug text-[#09080E]">
                  {user.defaultAddress || 'Chưa có địa chỉ mặc định'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onTabChange('addresses')}
              className="h-8 self-start whitespace-nowrap rounded-lg border border-[#E5E5E9] px-3 text-xs font-semibold text-[#09080E] transition-colors hover:bg-[#F7F7F5] sm:self-auto"
            >
              Cập nhật địa chỉ
            </button>
          </div>
        </div>
      </div>

      {/* THẺ 3: VAI TRÒ & GIỚI HẠN ĐẤU GIÁ */}
      <div className="rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E5E9] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#09080E]">
                Vai trò tài khoản &amp; Hạn mức tham gia
              </h3>
              <p className="text-xs text-[#62626C]">
                Thông số bảo đảm pháp lý, điều kiện ký quỹ đặt cọc và quyền hạn trả giá.
              </p>
            </div>
          </div>
        </div>

        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#E5E5E9] bg-[#F7F7F5] p-4">
            <div className="text-xs font-medium text-[#62626C]">Vai trò hiện tại</div>
            <div className="mt-1 flex items-center gap-1.5 text-base font-bold text-[#09080E]">
              <span>{user.roles?.includes('ROLE_SELLER') ? 'Seller & Bidder' : 'Bidder'}</span>
              <span className="material-symbols-outlined text-base text-[#FE6807]">gavel</span>
            </div>
            <div className="mt-1 text-[11px] leading-normal text-[#62626C]">
              Được quyền đăng ký tham gia trả giá tất cả các phiên đấu giá công khai.
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E5E9] bg-[#F7F7F5] p-4">
            <div className="text-xs font-medium text-[#62626C]">Trạng thái ký quỹ Escrow</div>
            <div className="mt-1 flex items-center gap-1.5 text-base font-bold text-[#166534]">
              <span>Đủ điều kiện</span>
              <span className="material-symbols-outlined text-base">task_alt</span>
            </div>
            <div className="mt-1 text-[11px] leading-normal text-[#62626C]">
              Tài khoản liên kết thanh toán ký quỹ tự động đạt chuẩn thanh khoản.
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E5E9] bg-[#F7F7F5] p-4">
            <div className="text-xs font-medium text-[#62626C]">Xác minh Người bán</div>
            <div className="mt-1 flex items-center gap-1.5 text-base font-bold text-[#09080E]">
              <span>{user.sellerStatus || 'UNVERIFIED'}</span>
              <span className="material-symbols-outlined text-base text-[#FE6807]">storefront</span>
            </div>
            <div className="mt-1 text-[11px] leading-normal text-[#62626C]">
              {isVerified
                ? 'Đã được cấp quyền mở phiên bán tài sản.'
                : 'Nâng cấp eKYC để đăng bán tài sản đấu giá.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRoute = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const user = useUser();
  const u = user.data;
  if (!u) return null;

  const displayName = u.fullName || u.email || 'Thành viên';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  const auctionMenuItems = [
    {
      id: 'participated',
      label: 'Các phiên đã tham gia',
      icon: 'gavel',
      count: u.participatedCount ?? 0,
      to: paths.auctions.getHref(),
    },
    { id: 'bid-history', label: 'Lịch sử đấu giá cá nhân', icon: 'history', to: paths.auctions.getHref() },
    { id: 'results', label: 'Kết quả đấu giá của tôi', icon: 'emoji_events', to: paths.auctions.getHref() },
    {
      id: 'watchlist',
      label: 'Danh sách phiên yêu thích',
      icon: 'favorite',
      count: u.watchlistCount ?? 0,
      to: paths.auctions.getHref(),
    },
    {
      id: 'orders',
      label: 'Đơn hàng của tôi',
      icon: 'receipt_long',
      count: u.ordersCount ?? 0,
      to: paths.auctions.getHref(),
    },
    { id: 'wallet', label: 'Ví ký quỹ & thanh toán', icon: 'account_balance_wallet', to: paths.auctions.getHref() },
  ];

  const currentItem = profileMenuItems.find((m) => m.id === activeTab);

  return (
    <div>
      <Head title="Hồ sơ cá nhân" />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center space-x-2 text-xs font-medium text-[#62626C]"
      >
        <Link
          to={paths.home.getHref()}
          className="flex items-center gap-1 transition-colors hover:text-[#09080E]"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span>Trang chủ</span>
        </Link>
        <span className="material-symbols-outlined text-xs text-[#605d65]/40">chevron_right</span>
        <span>Tài khoản cá nhân</span>
        <span className="material-symbols-outlined text-xs text-[#605d65]/40">chevron_right</span>
        <span className="font-semibold text-[#09080E]">{currentItem?.label}</span>
      </nav>

      {/* Two-Column Layout */}
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        {/* LEFT SIDEBAR (280px) */}
        <aside className="w-full shrink-0 rounded-xl border border-[#E5E5E9] bg-white p-5 shadow-sm lg:w-[280px]">
          {/* 1. Header Card Mini-Profile + Ví ký quỹ */}
          <div className="border-b border-[#E5E5E9] pb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#FE6807] bg-[#FFF7ED] text-lg font-bold text-[#FE6807] shadow-sm">
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-[#166534] p-0.5 text-white shadow-xs">
                  <span className="material-symbols-outlined block text-[12px]">verified</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-bold text-[#09080E]">{displayName}</h2>
                <p className="font-mono text-xs text-[#62626C]">BID-{u.userId}</p>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded border border-[#BBF7D0] bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" />
                  <span>Đấu giá viên (Online)</span>
                </div>
              </div>
            </div>

            {/* Thẻ ví ký quỹ khả dụng */}
            <div className="mt-3.5 rounded-xl border border-[#E5E5E9] bg-[#F7F7F5] p-3">
              <div className="flex items-center justify-between text-xs font-medium text-[#62626C]">
                <span>Ví ký quỹ khả dụng</span>
                <button
                  type="button"
                  className="flex items-center gap-0.5 text-[11px] font-bold text-[#FE6807] hover:underline"
                >
                  + Nạp thêm
                </button>
              </div>
              <div className="mt-1 font-mono text-base font-bold text-[#09080E]">
                {formatCurrency(u.availableBalance ?? 0)}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-[#62626C]">
                <span className="material-symbols-outlined text-[12px] text-[#605d65]/60">lock</span>
                <span>
                  Đang phong tỏa cọc: <strong>{formatCurrency(u.lockedDeposit ?? 0)}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menus */}
          <div className="mt-4 space-y-5 text-sm">
            {/* Nhóm 1: ĐẤU GIÁ CỦA TÔI */}
            <div>
              <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#62626C]">
                Đấu giá của tôi
              </div>
              <nav className="space-y-0.5">
                {auctionMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 font-medium text-[#62626C] transition-colors hover:bg-[#F7F7F5] hover:text-[#09080E]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-lg text-[#605d65] group-hover:text-[#09080E]">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="rounded border border-[#E5E5E9] bg-[#F7F7F5] px-1.5 py-0.5 text-[11px] font-semibold text-[#09080E]">
                        {item.count}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Nhóm 2: HỒ SƠ & BẢO MẬT */}
            <div>
              <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#62626C]">
                Hồ sơ &amp; bảo mật
              </div>
              <nav className="space-y-0.5">
                {profileMenuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        'group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-all',
                        isActive
                          ? 'border-l-4 border-[#FE6807] bg-[#FFF1E8] font-semibold text-[#FE6807] shadow-xs'
                          : 'font-medium text-[#62626C] hover:bg-[#F7F7F5] hover:text-[#09080E]',
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'material-symbols-outlined text-lg',
                            isActive
                              ? 'text-[#FE6807]'
                              : 'text-[#605d65] group-hover:text-[#09080E]',
                          )}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="rounded border border-[#FEF08A] bg-[#FEFCE8] px-1.5 py-0.5 text-[10px] font-bold text-[#854D0E]">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Footer Sidebar: Legal Support */}
          <div className="mt-6 border-t border-[#E5E5E9] pt-4">
            <div className="rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] p-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#09080E]">
                <span className="material-symbols-outlined text-sm text-[#FE6807]">gavel</span>
                <span>Hỗ trợ pháp lý &amp; tranh chấp</span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-[#62626C]">
                Căn cứ Điều 38, 39 &amp; 48 Luật ĐGTS 2016
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-[#E5E5E9] pt-2 text-xs">
                <span className="text-[#62626C]">Hotline:</span>
                <a className="font-bold text-[#FE6807] hover:underline" href="tel:19008899">
                  1900 - 8899
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT (max-w-960px) */}
        <section className="w-full max-w-[960px] flex-1">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E5E5E9] pb-4 md:flex-row md:items-end">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#09080E] sm:text-3xl">
              {currentItem?.label}
            </h1>
          </div>

          {activeTab === 'overview' && <ProfileOverview user={u} onTabChange={setActiveTab} />}
          {activeTab === 'edit' && <ProfileEditForm user={u} />}
          {activeTab === 'addresses' && <AddressBook />}
          {activeTab === 'seller' && <SellerVerificationForm sellerStatus={u.sellerStatus} />}
          {activeTab === 'password' && <ChangePasswordForm />}
          {activeTab === 'sessions' && <ActiveSessions />}
          {activeTab === 'activities' && <ActivityHistory />}
        </section>
      </div>
    </div>
  );
};

export default ProfileRoute;
