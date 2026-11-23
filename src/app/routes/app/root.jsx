import { Outlet } from 'react-router';

import { MainLayout } from '@/components/layouts/main-layout';
import { ProtectedRoute } from '@/lib/auth';

const AppRoot = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  );
};

export default AppRoot;
