🚀 React Portfolio + Express Backend

Project ini adalah website portofolio pribadi yang dibangun menggunakan React (frontend) dan Express (backend).
Fitur utama termasuk multi-language (EN/ID), daftar project dinamis, dan animasi UI modern.

📁 Struktur Folder
react-porto/
│── client/        # Frontend React + Vite
│── server/        # Backend Express + JSON storage
└── README.md

✨ Features

✅ Multi-language (English & Indonesian)
✅ Fetch project list dari backend
✅ JSON-based project storage
✅ Animasi scroll & efek UI modern
✅ API endpoint untuk project & translate

🛠 Tech Stack
Frontend

React + Vite

TailwindCSS

Framer Motion

i18next (multi-language)

Backend

Node.js + Express

CORS

JSON file as DB

⚙️ Setup & Installation
1️⃣ Clone Repo
git clone https://github.com/achmad-gg/react-porto.git
cd react-porto

2️⃣ Install Dependencies
🔹 Frontend
cd client
npm install

🔹 Backend
cd ../server
npm install

3️⃣ Jalankan App
🔹 Jalankan Backend
cd server
npm start


Backend running at:

http://localhost:5000

🔹 Jalankan Frontend
cd ../client
npm run dev


Frontend running at:

http://localhost:5173

🌐 Environment Variables
Client

Create .env in client/:

VITE_API_URL=http://localhost:5000/api

Server

Create .env in server/:

CLIENT_URL=http://localhost:5173
PORT=5000

📡 API Routes
Route	Method	Description
/api/projects	GET	Get projects
/api/projects	POST	Add project
/api/locales/:lang	GET	Get translations (en / id)
🧪 Sample Data

server/data.json

{
  "projects": []
}


server/locales/en.json, id.json → for translation strings

📦 Deployment
✅ Push to GitHub

Frontend & backend disimpan dalam satu repo.

🚀 Hosting Options
Layer	Options
Frontend	Vercel / Netlify / Cloudflare Pages
Backend	Render / Railway / VPS
Database	JSON (local) / MongoDB optional

Untuk deployment Render + Vercel, nanti bisa bantu setup ✅

📝 License

MIT © 2025 — Achmad Habibu

⭐ Support

Kalau project ini membantu, kasih ⭐ di GitHub ya 🙂
