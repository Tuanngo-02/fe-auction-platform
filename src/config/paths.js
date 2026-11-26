const withRedirect = (base, redirectTo) =>
  `${base}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`;

export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo) => withRedirect('/auth/login', redirectTo),
    },
    register: {
      path: '/auth/register',
      getHref: (redirectTo) => withRedirect('/auth/register', redirectTo),
    },
    verifyEmail: {
      path: '/auth/verify-email',
      getHref: (email) => `/auth/verify-email${email ? `?email=${encodeURIComponent(email)}` : ''}`,
    },
    forgotPassword: {
      path: '/auth/forgot-password',
      getHref: () => '/auth/forgot-password',
    },
  },
  auctions: {
    path: '/auctions',
    getHref: () => '/auctions',
  },
  auction: {
    path: '/auctions/:auctionId',
    getHref: (id) => `/auctions/${id}`,
  },
  seller: {
    path: '/sellers/:sellerId',
    getHref: (id) => `/sellers/${id}`,
  },
  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
};
