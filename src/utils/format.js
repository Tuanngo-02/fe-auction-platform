const TIME_ZONE = 'Asia/Ho_Chi_Minh';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

const dateTimeFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  return Number.isFinite(n) ? currencyFormatter.format(n) : '—';
};

export const formatDateTime = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : dateTimeFormatter.format(d);
};

// Thời gian còn lại (ms) đến mốc kết thúc, không âm
export const getRemainingMs = (endTime, now = Date.now()) =>
  Math.max(0, new Date(endTime).getTime() - now);
