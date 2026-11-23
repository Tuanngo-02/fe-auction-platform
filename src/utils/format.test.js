import { describe, expect, it } from 'vitest';

import { formatCurrency, formatDateTime, getRemainingMs } from './format';

describe('format utils', () => {
  it('định dạng tiền VND', () => {
    expect(formatCurrency(1500000)).toMatch(/1\.500\.000/);
    expect(formatCurrency(null)).toBe('—');
    expect(formatCurrency('abc')).toBe('—');
  });

  it('định dạng ngày giờ theo múi giờ Việt Nam', () => {
    expect(formatDateTime('2026-01-01T00:00:00Z')).toContain('07:00');
    expect(formatDateTime(undefined)).toBe('—');
  });

  it('tính thời gian còn lại không âm', () => {
    const now = Date.parse('2026-01-01T00:00:00Z');
    expect(getRemainingMs('2026-01-01T00:00:10Z', now)).toBe(10000);
    expect(getRemainingMs('2025-12-31T00:00:00Z', now)).toBe(0);
  });
});
