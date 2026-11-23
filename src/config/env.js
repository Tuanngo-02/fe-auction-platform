const raw = import.meta.env;

export const env = {
  APP_NAME: raw.VITE_APP_NAME || 'Đấu giá trực tuyến',
  API_URL: raw.VITE_APP_API_URL || '/api',
};
