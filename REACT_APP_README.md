# To-Do List React App

Một ứng dụng quản lý công việc được xây dựng với React.js, cho phép người dùng tạo, cập nhật, xóa và quản lý các công việc hàng ngày.

## Tính năng

- **Xác thực người dùng**: Đăng ký, đăng nhập và đăng xuất
- **Quản lý công việc**: Tạo, đọc, cập nhật, xóa công việc (CRUD)
- **Phân loại công việc**: Chia công việc thành 3 trạng thái: To Do, Doing, Done
- **Ưu tiên công việc**: 3 mức ưu tiên (High, Medium, Low)
- **Tìm kiếm và lọc**: Tìm kiếm công việc theo tiêu đề/mô tả, lọc theo trạng thái
- **Danh mục**: Phân loại công việc theo danh mục
- **Lưu trữ dữ liệu**: Tích hợp với API backend và localStorage
- **Giao diện thân thiện**: Thiết kế đẹp mắt với Tailwind CSS

## Công nghệ sử dụng

- **React 19**: Framework UI
- **React Router Dom**: Định tuyến trên phía client
- **Axios**: HTTP client
- **Tailwind CSS**: Framework CSS
- **Vite**: Build tool

## Cấu trúc thư mục

```
src/
├── components/         # React components
│   ├── Header.jsx      # Header component
│   ├── TaskBoard.jsx   # Main task board
│   ├── TaskColumn.jsx  # Task column display
│   ├── TaskCard.jsx    # Individual task card
│   ├── TaskModal.jsx   # Task create/edit modal
│   ├── LoginPage.jsx   # Login page
│   ├── RegisterPage.jsx # Register page
│   └── ProtectedRoute.jsx # Route protection component
├── contexts/           # React Context
│   ├── AuthContext.jsx # Authentication context
│   └── TaskContext.jsx # Task management context
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Auth hook
│   └── useTasks.js     # Tasks hook
├── services/           # API services
│   ├── api.js          # Axios instance & API calls
│   └── storage.js      # Local storage utilities
├── App.jsx             # Main App component
├── App.css             # App styles
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Cài đặt

1. Clone hoặc tải xuống dự án
2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Chạy development server:

   ```bash
   npm run dev
   ```

4. Build cho production:
   ```bash
   npm run build
   ```

## Sử dụng

### Đăng ký tài khoản

- Nhấp vào nút "Đăng ký"
- Nhập email hợp lệ và mật khẩu (tối thiểu 6 ký tự)
- Nhấp "Đăng ký"

### Đăng nhập

- Nhập email và mật khẩu
- Nhấp "Đăng nhập"

### Quản lý công việc

- **Thêm công việc**: Nhấp "+ Thêm công việc"
- **Chỉnh sửa**: Nhấp nút "Sửa" trên thẻ công việc
- **Xoá**: Nhấp nút "Xoá" (yêu cầu xác nhận)
- **Hoàn thành**: Nhấp "✓ Hoàn thành" để đánh dấu công việc đã xong
- **Tìm kiếm**: Nhập từ khóa trong ô tìm kiếm
- **Lọc**: Chọn trạng thái để lọc công việc

## API Backend

Ứng dụng kết nối với API backend tại:

```
https://api-class-o1lo.onrender.com/api/thangdq23
```

### Endpoints:

- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `GET /tasks` - Lấy danh sách công việc
- `POST /tasks` - Tạo công việc
- `PATCH /tasks/:id` - Cập nhật công việc
- `DELETE /tasks/:id` - Xoá công việc

## Lưu ý

- Ứng dụng sử dụng localStorage để lưu dữ liệu cục bộ làm bộ đệm
- Token JWT được lưu trong localStorage
- Có thể sử dụng ứng dụng offline (dữ liệu từ localStorage)

## Tác giả

Chuyển đổi từ Vanilla JavaScript sang React.js

---

Enjoy managing your tasks! 🎯
