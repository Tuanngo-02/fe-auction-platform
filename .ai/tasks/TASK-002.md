# TASK-002: Triển khai Module User & Seller (Frontend)

- Repo: fe
- Phụ thuộc: SETUP (Đã hoàn thành), BE TASK-002 (API Contract)
- Ước lượng: L

## Bối cảnh
Triển khai toàn bộ giao diện và luồng tương tác người dùng cho Module Xác thực & Module Người dùng - Người bán dựa trên các màn hình đã thiết kế trên Stitch (`AuctionHub - UI Consistency`) và hợp đồng API trong `be-auction-platform/.ai/API_CONTRACT.md`.

## Yêu cầu
1. **Màn hình Xác thực (`features/auth/`):**
   - Đăng ký tài khoản (bổ sung họ tên, số điện thoại, ngày sinh).
   - Xác thực OTP qua email (`Xác thực email tài khoản - AuctionHub`).
   - Quên mật khẩu & Đặt lại mật khẩu (gửi OTP, nhập OTP, nhập mật khẩu mới).
2. **Màn hình Hồ sơ & Tài khoản (`features/users/`):**
   - Xem & Chỉnh sửa hồ sơ (`Hồ sơ cá nhân`, `Chỉnh sửa hồ sơ`).
   - Đổi mật khẩu tài khoản (`Đổi mật khẩu`).
   - Sổ địa chỉ: Danh sách địa chỉ, modal thêm địa chỉ mới, nút xóa địa chỉ (`Sổ địa chỉ`).
   - Quản lý phiên đăng nhập: Danh sách thiết bị/IP đang hoạt động, nút đăng xuất từ xa (`Phiên đăng nhập và thiết bị`).
   - Xác minh người bán: Form nhập số CCCD, link/upload ảnh mặt trước & sau (`Xác minh người bán`).
   - Thông tin người bán công khai: Trang hiển thị uy tín, tổng số phiên đấu giá (`Thông tin người bán và uy tín`).
3. **API & State Management:**
   - Tạo các API functions trong `features/auth/api/` và `features/users/api/`.
   - Tạo custom hooks TanStack Query (`useMutation`, `useQuery`).
   - Cập nhật paths trong `src/config/paths.js`.
   - Khai báo routes trong `src/app/routes/app/` và `src/app/routes/auth/`.

## Phạm vi
- Được sửa/thêm: `src/features/`, `src/config/paths.js`, `src/app/routes/`.
- KHÔNG được tạo file TypeScript (`.ts`, `.tsx`), chỉ dùng JavaScript thuần (`.js`, `.jsx`).
- Tuân thủ nghiêm ngặt luật kiến trúc phân lớp của Bulletproof React.

## Tiêu chí chấp nhận
- [ ] `npm run lint` đạt 0 lỗi (không vi phạm luật kiến trúc).
- [ ] `npm test` vượt qua toàn bộ unit test.
- [ ] `npm run build` thành công không có cảnh báo nghiêm trọng.

## Kiểm tra
```powershell
npm run lint
npm test -- --run
npm run build
```
