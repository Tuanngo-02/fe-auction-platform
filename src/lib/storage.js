const TOKEN_KEY = 'auction.jwt';

// rememberMe = true -> localStorage (giữ sau khi tắt trình duyệt), false -> sessionStorage
export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY),
  setToken: (token, rememberMe = false) => {
    storage.clearToken();
    (rememberMe ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },
};
