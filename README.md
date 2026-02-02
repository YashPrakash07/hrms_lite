# HRMS Lite 🚀

HRMS Lite is a modern, lightweight Human Resource Management System designed for small teams to manage employee records and daily attendance with a premium user experience.

## ✨ Features

- **Modern Dashboard**: Real-time stats on workforce presence, cumulative attendance rates, and a "Recent Activity" feed.
- **Employee Management**: Full CRUD operations for team members with a curated "Total Present Days" summary column.
- **Attendance Tracking**: Smart, date-based attendance marking with immediate feedback and persistence.
- **Intelligent UI**:
  - **Skeletons & Empty States**: Robust handling of loading and no-data scenarios for a smooth user journey.
  - **Global Error Handling**: Integrated error boundaries to capture and recover from backend failures gracefully.
  - **Premium UX**: Glassmorphic interface with Framer Motion animations and a persistent "HR Admin" sidebar.
- **Full-Stack Performance**: Fast and scalable Python backend paired with a type-safe Next.js frontend.

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Jest & React Testing Library
- **Styling**: Modern Vanilla CSS (Custom Design System)

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
│   ├── main.py         # API entry point & routes
│   ├── database.py     # SQLAlchemy configuration
│   ├── schemas.py      # Pydantic data models
│   └── test_main.py    # Backend unit tests
├── src/                # Next.js frontend
│   ├── app/            # App router pages & layouts
│   ├── components/     # Reusable UI components
│   └── lib/            # API client & utility logic
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
- **Local Dev**: Uses SQLite (`hrms.db`) for zero-config local setup.

---

Developed with ❤️ by [Yashprakash](https://github.com/Yashprakash07)
