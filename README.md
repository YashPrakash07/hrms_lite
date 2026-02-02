# HRMS Lite 🚀

HRMS Lite is a modern, lightweight Human Resource Management System designed for small teams to manage employee records and daily attendance with a premium user experience.

## ✨ Features

- **Modern Dashboard**: Real-time stats on workforce presence and department overviews.
- **Employee Management**: Full CRUD operations for team members with a sleek hover-reveal action menu.
- **Attendance Tracking**: Simple, date-based attendance marking for "Present" and "Absent" statuses.
- **Premium UX**: Smooth page transitions using Framer Motion and a high-end "Glassmorphic" interface.
- **FastAPI Backend**: A high-performance Python backend with persistent PostgreSQL integration.

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Premium Slate & Indigo Theme)

### **Backend**

- **Framework**: FastAPI (Python 3)
- **ORM**: SQLAlchemy
- **Data Validation**: Pydantic
- **Database**:
  - **Local**: SQLite
  - **Production**: PostgreSQL

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18+)
- Python (v3.10+)

### **1. Setup Backend**

```bash
cd backend
# Create a virtual environment
python -m venv venv
# Activate it
.\venv\Scripts\Activate  # Windows
source venv/bin/activate # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the API
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

### **2. Setup Frontend**

Go back to the root directory:

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file or use existing
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Run the dev server
npm run dev
```

Open `http://localhost:3000` to view the app!

## 🧪 Testing

The project includes unit tests for both the backend API and frontend utility logic.

### **Backend Tests**

Uses `pytest` and `httpx` to verify API endpoints.

```bash
cd backend
pip install pytest httpx
pytest test_main.py
```

### **Frontend Tests**

Utility functions for attendance calculation and formatting are tested using `Jest`.

```bash
npm install --save-dev jest ts-jest @types/jest
npm test
```

## ☁️ Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend & Database**: Hosted on [Render](https://render.com/)

## 📝 Assumptions & Limitations

- **No Auth**: For this demonstration version, authentication is not implemented. It is assumed the system is accessed by an admin.
- **Single Slot Attendance**: Attendance is currently tracked as a binary status (Present/Absent) per day per employee.
- **Persistent Storage**: Data persists in PostgreSQL on Render; however, local development uses a local `hrms.db` file (SQLite).

---

Developed with ❤️ by [Yashprakash](https://github.com/Yashprakash07)
