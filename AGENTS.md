# AGENTS.md — fe-auction-platform

File này được cả **Antigravity CLI (executor)** và **Codex CLI (verifier)** đọc.
Vai trò cụ thể: executor → `.ai/roles/executor.md`; verifier → `.ai/roles/verifier.md`. Quy trình: `.ai/README.md`.

## Dự án
Frontend nền tảng đấu giá trực tuyến (đồ án tốt nghiệp). Backend: repo `be-auction-platform` (JHipster, Spring Boot).
- Stack: React 19 + Vite, **JavaScript thuần (CẤM TypeScript, không tạo file .ts/.tsx)**, Axios, React Router, TanStack Query, Zustand, React Hook Form + Zod, Tailwind CSS v4, Vitest.
- Cấu trúc theo bulletproof-react — đọc mục "Cấu trúc thư mục" và "Luật kiến trúc" trong `README.md` trước khi code.
- Backend dev: `http://localhost:8080`, API prefix `/api`.
- Auth: `POST /api/authenticate` → `{ "id_token": "..." }`, gửi kèm `Authorization: Bearer <token>`. Thông tin user: `GET /api/account`.
- Ngôn ngữ giao diện: tiếng Việt.

## Lệnh
- Cài: `npm install`
- Dev: `npm run dev` (http://localhost:3000, proxy `/api` → 8080)
- Lint (gồm luật kiến trúc): `npm run lint`
- Format: `npm run format` / kiểm tra: `npm run format:check`
- Test: `npm test`
- Build: `npm run build`

Một task FE chỉ được coi là xong khi `npm run lint`, `npm test` và `npm run build` đều pass.

## Hợp đồng API
Nguồn chuẩn nằm ở `../be-auction-platform/.ai/API_CONTRACT.md`. Claude sẽ chép phần liên quan vào từng task FE. Không tự bịa endpoint; nếu thiếu → BLOCKED.

## Quy ước code
- Code nghiệp vụ nằm trong `src/features/<tên>/`; trang (route) nằm trong `src/app/routes/` và export default.
- Luồng import một chiều: shared → features → app. Feature không import feature khác. Dùng alias `@/`. (ESLint chặn tự động – không được tắt rule.)
- Gọi API chỉ qua `api` trong `src/lib/api-client.js`; mỗi request khai báo ở `features/<tên>/api/` kèm hook React Query.
- Đường dẫn route lấy từ `src/config/paths.js`, không hard-code.
- Tên file kebab-case (`auction-card.jsx`), component PascalCase, export có tên (trừ file route).
- Gọi API tập trung qua 1 lớp client (interceptor gắn token, xử lý 401 → logout).
- Không hard-code URL backend; dùng biến môi trường.
- Component nhỏ, có kiểu dữ liệu rõ ràng; hiển thị tiền VND, thời gian theo múi giờ Asia/Ho_Chi_Minh.

## Cấm
- Commit/push, sửa ngoài phạm vi task, đưa secret vào repo.
