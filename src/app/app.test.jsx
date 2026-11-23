import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from '@/app';

vi.mock('@/lib/api-client', () => ({
  api: { get: vi.fn().mockRejectedValue({ response: { status: 404 } }), post: vi.fn() },
  getErrorMessage: (e) => e?.message,
}));

const renderAt = (url) => {
  window.history.pushState({}, '', url);
  return render(<App />);
};

describe('App routing', () => {
  it('hiển thị trang chủ', async () => {
    renderAt('/');
    expect(await screen.findByRole('heading', { name: /đấu giá trực tuyến/i })).toBeInTheDocument();
  });

  it('chuyển về trang đăng nhập khi vào trang cần đăng nhập mà chưa đăng nhập', async () => {
    renderAt('/app/profile');
    await waitFor(() => expect(window.location.pathname).toBe('/auth/login'));
    expect(window.location.search).toBe('?redirectTo=%2Fapp%2Fprofile');
    expect(await screen.findByRole('button', { name: 'Đăng nhập' })).toBeInTheDocument();
  });

  it('hiển thị 404 cho đường dẫn không tồn tại', async () => {
    renderAt('/khong-ton-tai');
    expect(await screen.findByText('404')).toBeInTheDocument();
  });
});
