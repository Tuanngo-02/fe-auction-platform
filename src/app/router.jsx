import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { paths } from '@/config/paths';

// Lazy-load từng route: mỗi module route export default component
const convert = (m) => ({ Component: m.default });

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.auth.login.path,
      lazy: () => import('./routes/auth/login').then(convert),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import('./routes/auth/register').then(convert),
    },
    {
      path: paths.auth.verifyEmail.path,
      lazy: () => import('./routes/auth/verify-email').then(convert),
    },
    {
      path: paths.auth.forgotPassword.path,
      lazy: () => import('./routes/auth/forgot-password').then(convert),
    },
    // Các trang công khai, dùng layout chính
    {
      lazy: () => import('./routes/root').then(convert),
      children: [
        { path: paths.home.path, lazy: () => import('./routes/landing').then(convert) },
        {
          path: paths.auctions.path,
          lazy: () => import('./routes/auctions/auctions').then(convert),
        },
        {
          path: paths.auction.path,
          lazy: () => import('./routes/auctions/auction').then(convert),
        },
        {
          path: paths.seller.path,
          lazy: () => import('./routes/sellers/seller').then(convert),
        },
      ],
    },
    // Các trang cần đăng nhập
    {
      path: paths.app.root.path,
      lazy: () => import('./routes/app/root').then(convert),
      children: [
        {
          path: paths.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert),
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
