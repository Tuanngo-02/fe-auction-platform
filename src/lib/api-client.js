import axios from 'axios';

import { env } from '@/config/env';
import { storage } from '@/lib/storage';
import { useNotifications } from '@/stores/notifications';

/**
 * Axios instance dùng chung cho toàn app.
 * - Tự gắn JWT vào header Authorization.
 * - Trả về response.data (truyền { rawResponse: true } trong config nếu cần headers,
 *   ví dụ X-Total-Count khi phân trang của JHipster).
 * - Lỗi của request GET để UI tự hiển thị; lỗi của POST/PUT/PATCH/DELETE hiện thông báo chung
 *   (tắt bằng { skipErrorNotification: true }).
 */
export const api = axios.create({
  baseURL: env.API_URL,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  return data?.detail || data?.title || data?.message || error?.message || 'Đã có lỗi xảy ra';
};

api.interceptors.response.use(
  (response) => (response.config.rawResponse ? response : response.data),
  (error) => {
    const status = error.response?.status;
    const method = (error.config?.method || 'get').toLowerCase();

    if (status === 401) {
      // Token hết hạn / không hợp lệ
      storage.clearToken();
    }

    if (method !== 'get' && !error.config?.skipErrorNotification) {
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Lỗi',
        message: getErrorMessage(error),
      });
    }

    return Promise.reject(error);
  },
);
