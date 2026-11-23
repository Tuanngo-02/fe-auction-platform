import { Head } from '@/components/seo/head';
import { useUser } from '@/lib/auth';

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 py-3">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className="col-span-2 text-sm text-slate-900">{value || '—'}</dd>
  </div>
);

const ProfileRoute = () => {
  const user = useUser();
  const u = user.data;
  if (!u) return null;

  return (
    <>
      <Head title="Hồ sơ" />
      <h1 className="mb-6 text-2xl font-bold">Hồ sơ của tôi</h1>
      <dl className="divide-y divide-slate-200 rounded-lg bg-white px-6 shadow-sm">
        <Row label="Tên đăng nhập" value={u.login} />
        <Row label="Họ" value={u.lastName} />
        <Row label="Tên" value={u.firstName} />
        <Row label="Email" value={u.email} />
        <Row label="Quyền" value={u.authorities?.join(', ')} />
      </dl>
    </>
  );
};

export default ProfileRoute;
