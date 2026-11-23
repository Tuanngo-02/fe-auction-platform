import { Outlet } from 'react-router';

import { MainLayout } from '@/components/layouts/main-layout';

const PublicRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default PublicRoot;
