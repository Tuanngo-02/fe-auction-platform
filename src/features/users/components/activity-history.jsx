import { Spinner } from '@/components/ui/spinner/spinner';
import { useMyActivities } from '@/features/users/api/activities';
import { formatDateTime } from '@/utils/format';

export const ActivityHistory = () => {
  const { data, isLoading } = useMyActivities();

  if (isLoading) return <Spinner />;

  const items = data?.items || [];

  return (
    <div className="space-y-4 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">manage_search</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">Lịch sử hoạt động cá nhân</h2>
          <p className="text-xs text-[#62626C]">
            Nhật ký truy cập và các thao tác bảo mật gần đây trên tài khoản của bạn
          </p>
        </div>
      </div>

      <ul className="divide-y divide-[#E5E5E9]">
        {items.length ? (
          items.map((item) => (
            <li key={item.activityId} className="flex items-center justify-between gap-4 py-3.5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-lg text-[#FE6807]">
                  history
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#09080E]">
                    {item.action === 'LOGIN' ? 'Đăng nhập hệ thống' : item.action}
                  </p>
                  <p className="text-xs text-[#62626C]">{item.deviceInfo || 'Trình duyệt web'}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-[#62626C]">
                {formatDateTime(item.timestamp)}
              </span>
            </li>
          ))
        ) : (
          <li className="py-6 text-center text-sm text-[#62626C]">Chưa có nhật ký hoạt động nào</li>
        )}
      </ul>
    </div>
  );
};
