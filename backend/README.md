IN DEVELOPING...

🚀 Backend Setup – Warehouse and Supply Chain Management System

### Yêu cầu môi trường
- Docker Desktop (>= 4.x)
- Node.js (>= 20 LTS) + npm
- Git
- Editor khuyến nghị: VS Code + plugin Prisma và NestJS

👉 Không cần cài PostgreSQL hay MongoDB trực tiếp trên máy, mọi thứ đã containerized.

### Clone repo
```bash
git clone <repo_url>
cd Warehouse-and-Supply-Chain-Management-System
```

### Chuẩn bị biến môi trường
Tạo file `.env` trong thư mục `backend` dựa trên mẫu:
```bash
cp backend/.env.example backend/.env
```

### Khởi động dịch vụ
```bash
docker compose up --build
```

Các service chính:
- Postgres: localhost:5432
- pgAdmin: http://localhost:5050  (Email: admin@admin.com / Password: admin)
- MongoDB: localhost:27017
- Mongo Express: http://localhost:8081
- Backend (NestJS): http://localhost:3000
- Swagger API Docs: http://localhost:3000/api

### Làm việc với Prisma
Vào container backend:
```bash
docker exec -it backend sh
```
Chạy migrate:
```bash
npx prisma migrate dev
```
Sinh Prisma Client:
```bash
npx prisma generate
```
Mở Prisma Studio (GUI):
```bash
npx prisma studio
```

### Cấu trúc dự án
```
backend/
 ┣ src/
 ┃ ┣ modules/         # Các module nghiệp vụ
 ┃ ┣ database/        # Prisma service, schemas
 ┃ ┣ common/          # DTO base, guard, interceptor
 ┃ ┗ main.ts          # Entrypoint app
 ┣ prisma/
 ┃ ┣ schema.prisma    # Định nghĩa schema
 ┃ ┗ migrations/      # Lưu migration history
 ┣ .env               # Config env (không commit)
 ┗ package.json
```

### Dev workflow
- Phát triển module → code trong `src/modules/...`
- Nếu thay đổi schema:
```bash
npx prisma migrate dev
```
- Swagger API Docs: http://localhost:3000/api

### Test
```bash
npm run test
npm run test:e2e
```

### Troubleshooting
- Kiểm tra container:
```bash
docker ps
```
- Reset volumes nếu DB lỗi:
```bash
docker compose down -v
docker compose up --build
```
- Xem log backend:
```bash
docker logs backend
```

---

## Phụ lục – Hướng dẫn nhanh cho Frontend/QA (BỔ SUNG, không thay đổi setup)

Chỉ để test nhanh API, không chỉnh sửa cấu hình hiện có.

### Flow test Auth
1) POST `/auth/signup` (dùng email mới mỗi lần)
2) POST `/auth/login` → nhận `accessToken`, `refreshToken`
3) POST `/auth/refresh` (body: `{ "refreshToken": "..." }`)
4) GET `/auth/me` với header `Authorization: Bearer <accessToken>`

### pgAdmin – đăng ký Postgres (tùy chọn)
Register Server → Connection:
- Host: `db`, Port: `5432`, DB: `warehouse_db`, User: `warehouse_user`, Password: `warehouse_pass`