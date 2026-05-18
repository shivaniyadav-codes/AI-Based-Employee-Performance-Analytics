# 🧠 PerformanceAI – HR Analytics & Recommendation System

PerformanceAI is a modern, full-stack MERN application designed to help HR departments track employee performance, manage details, and utilize **AI-driven insights** to generate promotion recommendations, identifying skill gaps, and providing actionable feedback.

This project was built for the **AI Driven Full Stack Development (AI308B)** ESE Examination.

---

## ✨ Features

- **🔒 Secure Authentication:** JWT-based HR/Admin Login & Signup with bcrypt password hashing.
- **👥 Employee Management:** Full CRUD operations to add, view, update, and delete employees.
- **🔍 Advanced Search:** Instantly filter employees by department.
- **📊 Performance Tracking:** Track skills, experience, and custom performance scores out of 100.
- **🤖 AI Integration:** Uses OpenRouter API (`openai/gpt-3.5-turbo`) to analyze the entire employee database and generate smart recommendations for promotions and training.
- **🎨 Premium Dark UI:** Fully responsive, "pure black aesthetic" design utilizing deep contrast, minimal borders, and color-coded status badges.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios
- Lucide React (Icons)
- Vanilla CSS (Custom Pure Black Aesthetic Theme)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) & bcryptjs
- Axios (for external OpenRouter API requests)

---

## 🚀 Live Deployment

- **Frontend:** [Insert Live Frontend URL Here]
- **Backend API:** [Insert Live Backend URL Here]

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new Admin/HR account
- `POST /api/auth/login` - Authenticate Admin/HR and receive a JWT token

### Employees (Requires Bearer Token)
- `GET /api/employees` - Retrieve all employees
- `POST /api/employees` - Add a new employee
- `GET /api/employees/search?department=HR` - Search employees by department
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Delete an employee

### AI Recommendations (Requires Bearer Token)
- `POST /api/ai/recommend` - Analyzes database and returns formatted AI insights

---

## Live LINK


---

## 📄 License
This project was created for academic/examination purposes.
