import { Button } from '@/components/ui/button/button';

export const MainErrorFallback = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4" role="alert">
      <h2 className="text-lg font-semibold">Đã có lỗi xảy ra :(</h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>Tải lại trang</Button>
    </div>
  );
};
