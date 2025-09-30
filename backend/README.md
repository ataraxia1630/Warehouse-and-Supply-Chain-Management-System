IN DEVELOPING...

🚀 Backend Setup – Warehouse and Supply Chain Management System
1. Yêu cầu môi trường

Docker Desktop
 (>= 4.x)

Node.js
 (>= 20 LTS) + npm

Git

Editor khuyến nghị: VS Code + plugin Prisma và NestJS

👉 Không cần cài PostgreSQL hay MongoDB trực tiếp trên máy, mọi thứ đã containerized.

2. Clone repo
git clone <repo-url>
cd Warehouse-and-Supply-Chain-Management-System

3. Chuẩn bị biến môi trường

Tạo file .env trong thư mục backend dựa trên mẫu:

cp backend/.env.example backend/.env

4. Khởi động dịch vụ
docker compose up --build


Các service chính:

Postgres: localhost:5432

pgAdmin: http://localhost:5050

Email: admin@admin.com

Password: admin

MongoDB: localhost:27017

Mongo Express: http://localhost:8081

Backend (NestJS): http://localhost:3000

5. Làm việc với Prisma

Vào container backend:

docker exec -it backend sh


Chạy migrate:

npx prisma migrate dev


Sinh Prisma Client:

npx prisma generate


Mở Prisma Studio (GUI):

npx prisma studio

6. Cấu trúc dự án
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
8. Dev workflow

Phát triển module → code trong src/modules/...

Nếu thay đổi schema:

npx prisma migrate dev


Swagger API Docs: http://localhost:3000/api

Test:

npm run test
npm run test:e2e

8. Troubleshooting

Kiểm tra container:

docker ps


Reset volumes nếu DB lỗi:

docker compose down -v
docker compose up --build


Xem log backend:

docker logs backend
