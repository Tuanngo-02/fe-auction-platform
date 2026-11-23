import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications/notifications';
import { Spinner } from '@/components/ui/spinner/spinner';
import { queryConfig } from '@/lib/react-query';

export const AppProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: queryConfig }));

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <Notifications />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
