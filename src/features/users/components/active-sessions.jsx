import { Button } from '@/components/ui/button/button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { useActiveSessions, useRevokeSession } from '@/features/users/api/sessions';
import { formatDateTime } from '@/utils/format';

export const ActiveSessions = () => {
  const { data: sessions, isLoading } = useActiveSessions();
  const revoke = useRevokeSession();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-4 rounded-xl border border-[#E5E5E9] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2.5 border-b border-[#E5E5E9] pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E9] bg-[#F7F7F5] text-[#FE6807]">
          <span className="material-symbols-outlined text-xl">devices</span>
        </div>
        <div>
          <h2 className="text-base font-bold text-[#09080E]">Phiên đăng nhập &amp; Thiết bị</h2>
          <p className="text-xs text-[#62626C]">
            Kiểm soát các trình duyệt và thiết bị đang truy cập vào tài khoản của bạn
          </p>
        </div>
      </div>

      <ul className="divide-y divide-[#E5E5E9]">
        {sessions?.length ? (
          sessions.map((s) => (
            <li key={s.sessionId} className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-xl text-[#605d65]">
                  computer
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#09080E]">
                    {s.deviceInfo || 'Trình duyệt không xác định'}
                    {s.isCurrent && (
                      <span className="ml-2 rounded border border-[#BBF7D0] bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
                        Phiên hiện tại
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#62626C]">
                    IP: {s.ipAddress || '—'} · Đăng nhập lúc {formatDateTime(s.createdAt)}
                  </p>
                </div>
              </div>
              {!s.isCurrent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => revoke.mutate(s.sessionId)}
                  disabled={revoke.isPending}
                >
                  Đăng xuất
                </Button>
              )}
            </li>
          ))
        ) : (
          <li className="py-6 text-center text-sm text-[#62626C]">Không có phiên đăng nhập nào</li>
        )}
      </ul>
    </div>
  );
};
