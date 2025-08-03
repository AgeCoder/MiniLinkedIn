# 🧑‍💼 Mini LinkedIn – Full Stack Community App

A **Mini LinkedIn-like platform** developed as part of the Full Stack Development Internship challenge by CIAAN Cyber Tech Pvt Ltd. This app enables users to register, create profiles, share posts, and connect through a responsive and modern interface.

---

## 🚀 Live Demo

🔗 [Visit the Live App](https://mini-linked-in-tawny.vercel.app/))

---

## 📂 GitHub Repository

🔗 [View Source Code on GitHub](https://github.com/AgeCoder/MiniLinkedIn)

---

## 🛠 Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| **Frontend** | Next.js (App Router, TypeScript) |
| **Styling**  | Tailwind CSS                  |
| **Backend**  | Server Actions + Middleware   |
| **Auth**     | NextAuth.js (Email/Password)  |
| **ORM**      | Drizzle ORM                   |
| **Database** | PostgreSQL (Neon DB)          |
| **Hosting**  | Vercel                        |

---

## ✅ Features

### 1. User Authentication
- Register and log in with email and password
- View and update profile (name, email, bio)

### 2. Post Feed
- Create text-based posts
- View a feed displaying posts with author names and timestamps

### 3. Profile Page
- Public profile pages showcasing user info and their posts

### 4. Responsive UI
- Clean, modern, and intuitive design
- Fully responsive for mobile and desktop devices

---

## 🧪 Demo Credentials

| Role       | Email               | Password   |
|------------|---------------------|------------|
| Demo User  | guest@gmail.com    | 12345678   |

*You can also create your own account to explore the app.*

---

## 🛠️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AgeCoder/MiniLinkedIn
   cd MiniLinkedIn
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` File**
   ```env
   DATABASE_URL=your_neon_postgres_url
   NEXTAUTH_SECRET=your_random_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Push Schema and Run Dev Server**
   ```bash
   npx drizzle-kit push
   npm run dev
   ```

---



*Built with 💻 and ☕ by Vedant Navale.*
