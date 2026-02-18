# HRMS Lite 🚀

HRMS Lite is a modern, lightweight Human Resource Management System designed for small teams to manage employee records and daily attendance with a premium user experience.

## ✨ Features

- **Modern Dashboard**: Real-time stats with animated progress bars, live attendance volume charts, and a "Recent Activity" feed.
- **Smart Data Sync**: Zero-latency updates across pages using Next.js Server Actions and cache revalidation (`cache: 'no-store'`).
- **Employee Management**: Full CRUD operations with staggered row animations and initials-based avatars.
- **Attendance Tracking**:
  - **Dynamic Marking**: Real-time attendance status updates.
  - **Bulk Actions**: "Mark All Present" feature for efficient morning check-ins.
- **Improved Feedback**:
  - **Professional Notifications**: Context-aware toast notifications using `sonner`.
  - **Skeletons & Empty States**: Polished loading and no-data scenarios.
- **Premium UX**:
  - Framer Motion animations for staggered lists, entry transitions, and interactive sidebar elements.
  - Responsive, glassmorphic design system.

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Testing**: Jest & React Testing Library
- **Styling**: Modern Vanilla CSS (Custom tokens)

### **Backend**

- **Framework**: FastAPI (Python 3.10+)
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL (Production) / SQLite (Local)
- **Testing**: Pytest & HTTPX

## 🚀 Getting Started

### **1. Setup Backend**

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
# or source venv/bin/activate on Mac/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```

### **2. Setup Frontend**

```bash
# In the root directory
npm install
npm run dev
```

Open `http://localhost:3000` to view the app!

## 🧪 Testing

The project is built with reliability in mind, featuring comprehensive unit tests.

### **Backend Tests**

Verifies API endpoints and database integrity.

```bash
cd backend
pytest test_main.py
```

### **Frontend Tests**

Validates core utility logic and data formatting.

```bash
npm test
```

## 📂 Project Structure

```text
├── backend/            # FastAPI source code
├── src/                # Next.js frontend
│   ├── app/            # App router pages, layouts & server actions
│   ├── components/     # Reusable UI & Dashboard components
│   └── lib/            # API client, revalidation logic & utils
├── public/             # Static assets
└── jest.config.mjs     # Frontend test configuration
```

## ☁️ Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend**: Hosted on [Render](https://render.com/)
- **Database**: Managed PostgreSQL instance

## 📝 Assumptions & Limitations

- **Authentication**: For this demo, a mock admin profile is used.
- **Attendance**: Binary status (Present/Absent) tracked per business day.
- **Environment**: Optimized for zero-config local setup with SQLite.

---

Developed with ❤️ by [Yashprakash](https://github.com/Yashprakash07)
