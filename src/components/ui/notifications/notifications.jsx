import { useEffect } from 'react';

import { useNotifications } from '@/stores/notifications';
import { cn } from '@/utils/cn';

const styles = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  error: 'border-red-200 bg-red-50 text-red-900',
};

const Notification = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto w-80 rounded-md border p-4 shadow-md',
        styles[notification.type],
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{notification.title}</p>
          {notification.message && <p className="mt-1 text-sm">{notification.message}</p>}
        </div>
        <button
          type="button"
          aria-label="Đóng"
          onClick={() => onDismiss(notification.id)}
          className="text-lg leading-none opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const Notifications = () => {
  const notifications = useNotifications((s) => s.notifications);
  const dismissNotification = useNotifications((s) => s.dismissNotification);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-3"
    >
      {notifications.map((n) => (
        <Notification key={n.id} notification={n} onDismiss={dismissNotification} />
      ))}
    </div>
  );
};
