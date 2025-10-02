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

**Lưu ý quan trọng:**
- File `.env.example` đã chứa đầy đủ các biến cần thiết (JWT, Database)
- Không cần chỉnh sửa gì thêm cho development
- Chỉ cần copy và chạy `docker compose up --build`

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

#### Lỗi thường gặp:

**1. "JWT_ACCESS_SECRET is required"**
```bash
# Kiểm tra file .env có đầy đủ biến JWT không
cat backend/.env | grep JWT
# Nếu thiếu, copy lại từ .env.example
cp backend/.env.example backend/.env
```

**2. Backend không khởi động được**
```bash
# Kiểm tra container status
docker ps
# Xem log chi tiết
docker logs backend --tail 50
```

**3. Database connection failed**
```bash
# Reset volumes và khởi động lại
docker compose down -v
docker compose up --build
```

**4. Migration errors**
```bash
# Vào container và chạy migrate
docker exec -it backend sh
npx prisma migrate deploy
```

#### Commands hữu ích:
- Kiểm tra container: `docker ps`
- Xem log backend: `docker logs backend`
- Restart backend: `docker compose restart backend`

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

### Mongo Express – truy cập MongoDB (tùy chọn)
- URL: http://localhost:8081
- Username: `mongo_user`, Password: `mongo_pass`

### Quick Setup Checklist
- [ ] Clone repo
- [ ] Copy `.env.example` to `.env`
- [ ] Run `docker compose up --build`
- [ ] Wait for "Nest application successfully started" in logs
- [ ] Test: http://localhost:3000 (should return "Hello World!")
- [ ] Test Swagger: http://localhost:3000/api
- [ ] Test Auth: POST to `/auth/signup` with new email