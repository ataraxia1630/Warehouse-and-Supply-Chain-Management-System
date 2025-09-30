
```
project-root/
│── public/ # File tĩnh (index.html, favicon, images...)
│── src/
│ ├── assets/ # Hình ảnh, icon, font, css/scss global
│ ├── components/ # Component tái sử dụng (Button, Input, Modal...)
│ ├── layouts/ # Layout (Header, Sidebar, Footer)
│ ├── pages/ # Các trang chính (Home, Login, Dashboard...)
│ ├── hooks/ # Custom hooks (useAuth, useFetch...)
│ ├── contexts/ # React Context (AuthContext, ThemeContext...)
│ ├── services/ # Gọi API, kết nối backend (axios/fetch)
│ ├── utils/ # Hàm helper (formatDate, calculatePrice...)
│ ├── routes/ # Định nghĩa route của app
│ ├── store/ # State management (Redux, Zustand, Recoil...)
│ ├── App.js / App.tsx # Gốc của React app
│ ├── index.js / index.tsx # Entry point
│ └── styles/ # Global styles (Tailwind, SCSS, theme...)
│
│── package.json
│── vite.config.js / webpack.config.js
```
