# Task Tracker Web Application (Full Stack Mini Project)

A modern, responsive, full-stack **Task Management System** with basic collaboration features, interactive analytics dashboard, filtering, searching, pagination, and dark mode support.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router v6
* **Backend:** Node.js, Express.js, JWT Authentication, BcryptJS
* **Database:** MongoDB, Mongoose ODM

---

## ✨ Core Features

1. **User Authentication:** JWT-based signup & login with password hashing and session persistence.
2. **Task Management (CRUD):**
   * Create tasks with Title, Description, Status (`Todo`, `In Progress`, `Done`), Priority (`Low`, `Medium`, `High`), and Due Date.
   * View, edit, update, delete, and mark tasks complete.
3. **Filtering & Search:**
   * Filter tasks by status and priority.
   * Live text search by title.
   * Sorting by due date, priority, or creation date.
4. **Analytics Dashboard:**
   * Total tasks count, completed tasks count, pending tasks count.
   * Completion percentage progress bar.
   * Priority breakdown metrics.
5. **Product Enhancements:**
   * Pagination for task list navigation.
   * Light & Dark mode toggle.
   * Centralized global error handling middleware in Express.
   * MongoDB compound database indexing on `user`, `status`, `priority`, and `title`.

---

## 📁 Project Structure

```text
Task management system/
├── backend/
│   ├── src/
│   │   ├── config/db.js           # MongoDB Connection
│   │   ├── controllers/           # Auth, Task, and Analytics controllers
│   │   ├── middleware/            # JWT Protect & Global Error Handlers
│   │   ├── models/                # User & Task Mongoose Schemas with Indexes
│   │   ├── routes/                # Express API routes
│   │   ├── utils/                 # JWT helper
│   │   ├── app.js                 # Express Application config
│   │   └── server.js              # Server entrypoint
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                   # Axios client & API endpoints
│   │   ├── components/            # Task Cards, Modals, Filters, Stats Cards
│   │   ├── context/               # AuthContext & ThemeContext (Dark mode)
│   │   ├── pages/                 # TasksPage, DashboardPage, Login, Signup
│   │   ├── App.jsx                # Router & Protected routes
│   │   └── main.jsx               # React entrypoint
│   ├── index.html
│   └── package.json
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites
* Node.js (v16+ recommended)
* MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI string.

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management_db
JWT_SECRET=super_secret_jwt_key_task_tracker_2026
NODE_ENV=development
```

Start the backend development server:
```bash
npm run dev
# or
npm start
```
The backend API will run at `http://localhost:5000`.

---

### 2. Frontend Setup

Open a new terminal tab:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the Vite development web server:
```bash
npm run dev
```
The React frontend will run at `http://localhost:3000`.

---

## 📑 API Endpoints Specification

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Private | Get authenticated user profile |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Private | Create a new task |
| `GET` | `/api/tasks` | Private | List tasks with filters (`status`, `priority`, `search`, `sortBy`, `page`, `limit`) |
| `GET` | `/api/tasks/:id` | Private | Fetch single task by ID |
| `PUT` | `/api/tasks/:id` | Private | Update task details / status |
| `DELETE` | `/api/tasks/:id` | Private | Delete task |

### Analytics Routes (`/api/analytics`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics` | Private | Fetch task stats summary & completion rate |

---

## 🎯 Design & Architecture Decisions

1. **JWT Authentication & Bearer Tokens:** Stateless JWT tokens enable secure session management without server-side session stores. Axios interceptors automatically inject `Authorization: Bearer <token>` for all requests.
2. **MongoDB Schemas & Compound Indexing:** Added indexes on `user`, `status`, `priority`, and text index on `title` to ensure optimized DB query execution as task dataset grows.
3. **Centralized Error Handling:** All Express routes pass errors to global error middleware (`errorMiddleware.js`), ensuring standardized JSON error responses across the API.
4. **Clean UI & Dark Mode:** Built with Tailwind CSS and React Context (`ThemeContext`), storing theme preferences in `localStorage` for a smooth dark/light mode transition.
