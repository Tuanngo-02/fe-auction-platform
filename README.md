# fe-auction-platform

Frontend cho nền tảng đấu giá trực tuyến. Cấu trúc theo [bulletproof-react](https://github.com/alan2207/bulletproof-react), viết bằng **JavaScript (không TypeScript)**.

## Công nghệ

| Mục đích | Thư viện |
|---|---|
| Build / dev server | Vite |
| UI | React 19 |
| Routing | React Router (lazy route) |
| Gọi API | **Axios** (`src/lib/api-client.js`) |
| Server state | TanStack Query |
| Client state | Zustand |
| Form + validate | React Hook Form + Zod |
| CSS | Tailwind CSS v4 |
| Test | Vitest + Testing Library |
| Lint / format | ESLint (có luật kiến trúc) + Prettier |

## Bắt đầu

Yêu cầu Node.js 20.19+ (khuyên dùng 22).

```bash
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev                 # http://localhost:3000
```

Backend (`be-auction-platform`) chạy ở `http://localhost:8080`. Mọi request `/api/*` từ dev server được proxy sang backend nên không cần cấu hình CORS.

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy dev |
| `npm run build` | Build production ra `dist/` |
| `npm run preview` | Xem bản build |
| `npm run lint` | Kiểm tra lint + luật kiến trúc |
| `npm run format` | Format code |
| `npm test` | Chạy test |

## Cấu trúc thư mục

```
src
├── app/                 # Tầng ứng dụng: router, provider, các route (trang)
│   ├── routes/          #   mỗi file = 1 trang, export default component
│   ├── index.jsx        #   App
│   ├── provider.jsx     #   QueryClient, ErrorBoundary, Suspense, Notifications
│   └── router.jsx       #   khai báo route (lazy)
├── assets/              # Ảnh, font
├── components/          # Component dùng chung
│   ├── ui/              #   button, input, spinner, notifications…
│   ├── layouts/         #   main-layout, auth-layout
│   ├── errors/          #   màn hình lỗi
│   └── seo/             #   <Head>
├── config/              # env.js, paths.js (toàn bộ đường dẫn route)
├── features/            # Mỗi tính năng là 1 module độc lập
│   ├── auth/            #   components/ (login-form, register-form)
│   └── auctions/        #   api/ (axios + react-query), components/
├── hooks/               # Hook dùng chung
├── lib/                 # Thư viện đã cấu hình sẵn: api-client (axios), auth, authorization, react-query
├── stores/              # Store Zustand toàn cục (notifications)
├── testing/             # Setup và tiện ích test
├── types/               # (để trống – dự án dùng JS, có thể đặt JSDoc typedef)
└── utils/               # Hàm tiện ích (cn, format tiền/ngày)
```

Một feature chỉ tạo những thư mục nó cần: `api/`, `components/`, `hooks/`, `stores/`, `utils/`.

### Luật kiến trúc (ESLint tự kiểm tra)

1. **Một chiều:** `shared (components, config, hooks, lib, stores, utils) → features → app`.
   - Thư mục dùng chung **không** được import `features/` hay `app/`.
   - `features/` **không** được import `app/`.
2. **Feature không import feature khác.** Cần ghép nhiều feature thì làm ở `app/routes`.
3. Dùng import tuyệt đối `@/...`; không dùng `../../` trở lên.
4. Import trực tiếp từ file, không tạo barrel `index.js` trong feature.

### Gọi API

```js
import { api } from '@/lib/api-client';

const auction = await api.get(`/auctions/${id}`);          // trả thẳng data
const res = await api.get('/auctions', { rawResponse: true }); // cần headers (X-Total-Count)
```
- JWT tự gắn vào header `Authorization`.
- Lỗi của GET để component tự hiển thị; lỗi POST/PUT/DELETE tự hiện thông báo (tắt bằng `{ skipErrorNotification: true }`).
- Mỗi feature khai báo request trong `features/<tên>/api/<hành-động>.js` kèm `queryOptions` và hook `useXxx` (xem `features/auctions/api`).

### Xác thực

Dùng API có sẵn của JHipster: `POST /api/authenticate`, `GET /api/account`, `POST /api/register`. Hook nằm trong `src/lib/auth.jsx` (`useUser`, `useLogin`, `useLogout`, `useRegister`, `ProtectedRoute`). Trang dưới `/app/*` bắt buộc đăng nhập.

## Ghi chú

- Endpoint `/api/auctions` trong `features/auctions` là **dự kiến**, chờ backend làm xong (xem `../be-auction-platform/.ai/API_CONTRACT.md`).
- Đăng ký tài khoản JHipster cần kích hoạt qua email. Khi dev có thể dùng sẵn tài khoản `admin/admin` hoặc `user/user`.
