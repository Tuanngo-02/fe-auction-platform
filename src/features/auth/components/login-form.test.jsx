import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '@/lib/api-client';
import { storage } from '@/lib/storage';
import { renderWithProviders } from '@/testing/test-utils';

import { LoginForm } from './login-form';

vi.mock('@/lib/api-client', () => ({
  api: { get: vi.fn(), post: vi.fn() },
  getErrorMessage: (e) => e?.message,
}));

const setup = (onSuccess = vi.fn()) =>
  renderWithProviders(<LoginForm onSuccess={onSuccess} registerHref="/auth/register" />);

describe('LoginForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('hiển thị lỗi validate khi bỏ trống', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    expect(await screen.findByText('Vui lòng nhập email hoặc số điện thoại')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập mật khẩu')).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('đăng nhập thành công: lưu token và gọi onSuccess', async () => {
    api.post.mockResolvedValue({ data: { accessToken: 'jwt-123', refreshToken: 'ref-123' } });
    api.get.mockResolvedValue({ data: { userId: 1, fullName: 'Nguyễn Văn A' } });
    const onSuccess = vi.fn();

    const { user } = setup(onSuccess);
    await user.type(screen.getByLabelText(/Email hoặc Số điện thoại/), 'user@example.com');
    await user.type(screen.getByLabelText(/Mật khẩu/), 'Password123!');
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledWith(expect.objectContaining({ fullName: 'Nguyễn Văn A' })),
    );
    expect(api.post).toHaveBeenCalledWith(
      '/auth/login',
      { emailOrPhone: 'user@example.com', password: 'Password123!' },
      { skipErrorNotification: true },
    );
    expect(storage.getToken()).toBe('jwt-123');
  });

  it('báo sai mật khẩu khi server trả 401', async () => {
    api.post.mockRejectedValue({ response: { status: 401 } });

    const { user } = setup();
    await user.type(screen.getByLabelText(/Email hoặc Số điện thoại/), 'user@example.com');
    await user.type(screen.getByLabelText(/Mật khẩu/), 'sai');
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    expect(await screen.findByText('Sai email/số điện thoại hoặc mật khẩu')).toBeInTheDocument();
  });
});
