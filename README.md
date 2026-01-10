# 🌟 Kalaam: The Poetry Club of NIT Rourkela

🎉 **Welcome to Kalaam!**  
Kalaam is a premium digital platform designed for the vibrant poetry community at NIT Rourkela. It's more than just a website; it's a creative sanctuary where poets can share their voice, discover fellow wordsmiths, and engage in meaningful artistic expression.

🔗 **Visit the Website**  
[https://kalaam-nitrkl.vercel.app/](https://kalaam-nitrkl.vercel.app/)

---

## 🚀 Tech Stack

| Layer          | Technology                                                                                                                           |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**   | [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend**    | [Prisma ORM](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/) (Supabase/Neon)                                      |
| **Auth**       | [Next-Auth](https://next-auth.js.org/) (Credentials & Google), [Firebase](https://firebase.google.com/)                              |
| **Caching**    | [Redis](https://redis.io/) (via ioredis) for real-time notifications                                                                 |
| **Media**      | [Cloudinary](https://cloudinary.com/) for optimized image hosting                                                                    |
| **Validation** | [VineJS](https://vinejs.dev/) for robust schema-based validation                                                                     |

---

## ✨ Features

### 🏠 **Smart Home Page**

- **Discover Poets**: Uses a shuffle algorithm to provide fresh, randomized member suggestions on every visit.
- **Infinite Feed**: Seamlessly explore posts with infinite scrolling for an uninterrupted reading experience.
- **Micro-Animations**: A polished UI with subtle transitions and interactive elements.

### 🔔 **Real-time Notifications**

- **Redis-Powered**: High-performance backend using Redis to store and manage user notifications.
- **Interaction Alerts**: Get notified instantly when someone likes your poetry or interacts with your profile.
- **Management**: Easy-to-use notification center to track and clear your alerts.

### 🔍 **Community Search**

- **Find Poets**: Dedicated search functionality to discover club members by name.
- **Instant Discovery**: Quickly connect with fellow students and faculty members in the poetry circle.

### 📝 **Membership & Authentication**

- **NITR Identity**: Secure registration restricted to NIT Rourkela email IDs and roll numbers.
- **Admin Oversight**: New accounts require admin approval, ensuring the community remains safe and exclusive.
- **Hybrid Auth**: Flexible login options via institutional credentials or Google OAuth.

### 🛠️ **Admin Control Center**

- **Member Management**: Centralized dashboard to approve, modify roles, or remove accounts.
- **Hierarchy Control**: Assign specific roles (Admin, Moderator, Member) to streamline club operations.

### 👤 **Creative Profiles**

- **Personal Gallery**: showcase all your poetic contributions in one elegant dashboard.
- **Full CRUD**: complete control over your profiles and posts - edit, update, or remove content with ease.
- **Rich Media**: Enhance your poetry with custom images hosted securely on Cloudinary.

### 🔐 **Permissions & Security**

- **Selective Posting**: Only verified and approved members can publish content.
- **Data Integrity**: VineJS ensures all user input is sanitized and validated before hitting the database.

---

## � Project Structure

```bash
Kalaam/
├── app/               # Next.js App Router (Routes & Components)
│   ├── api/           # Backend API routes (Auth, Notifications, Posts)
│   ├── components/    # Reusable UI components (Modals, Feed, Cards)
│   └── (authpage)/    # Authentication specialized layouts
├── lib/               # Utility functions and shared library clients (Redis, DB)
├── prisma/            # Database schema and migrations
├── public/            # Static assets
└── types/             # Global TypeScript interface definitions
```

---

## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/ashishsingh752/Kalaam.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**
   Create a `.env` file and add your `DATABASE_URL`, `REDIS_URL`, and Cloudinary/Firebase credentials.
4. **Run Migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Start Dev Server**
   ```bash
   npm run dev
   ```

---

## 💡 Highlights

- **Performance Optimized**: Leverages Next.js Server Components and Redis for lightning-fast response times.
- **User-Centric Design**: Focuses on a premium typography-heavy aesthetic suitable for a poetry club.
- **Scalable Architecture**: decoupled services for media, notifications, and data.

---

<img width="1918" height="1147" alt="Kalaam Home" src="https://github.com/user-attachments/assets/c7ffe3d1-990b-43b0-8f00-b2c3cc3ccdc1" />
<img width="1896" height="1147" alt="Poet Discovery" src="https://github.com/user-attachments/assets/53a1b953-bb89-4b5d-99d8-4ad6c9b3b407" />
<img width="1884" height="1136" alt="Profiles" src="https://github.com/user-attachments/assets/5c22575c-9df0-40c7-80c7-2a3f3b92495a" />
<img width="1919" height="1153" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/e4f1b325-8e14-4202-a941-8def44b40bb1" />
