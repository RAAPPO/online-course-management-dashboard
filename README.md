# 🎓 Online Course Management System (Live Demo)

> **Status:** Live / Deployment Ready

🔗 **[Click Here to View Live Demo- https://raappo.github.io/online-course-management-dashboard/ ](https://raappo.github.io/online-course-management-dashboard/)**

## 📖 Demo Overview
This is the **Live Demonstration** version of the Online Course Management System.

Unlike the main architectural version (which uses a persistent REST API), this specific build is optimized for **static hosting (GitHub Pages)**. It utilizes the **Angular In-Memory Web API** to intercept HTTP requests and simulate a database entirely within the browser's memory. This allows the application to be fully interactive without needing a running backend server.

---

## ⚠️ Important Note for Users
**Data Persistence:**
Because this demo runs serverless, **all data is stored in your browser's RAM**.
* If you **Refresh the Page**, the data (new enrollments, added students) will **reset** to the default state.
* This is intentional behavior for the demo version.

---

## ✨ Key Features

### 👨‍💼 Admin Module
* **User Management:** Full control to add, edit, or remove Student and Teacher records.
* **Course Administration:** Create new courses with details (Code, Capacity, Duration, Syllabus).
* **System Monitoring:** View aggregate statistics (Total Students, Active Courses, etc.).

### 👨‍🏫 Teacher Module
* **Course Dashboard:** View courses specifically assigned to the logged-in teacher.
* **Student Tracking:** View the list of students enrolled in their specific courses.
* **Profile Management:** Update professional details and qualifications.

### 👨‍🎓 Student Module
* **Course Catalog:** Browse all available courses with search and filtering options.
* **Self-Enrollment:** One-click enrollment logic with capacity validation.
* **My Learning:** Dedicated dashboard to view active enrollments and grades.

---

## 🛠️ Technology Stack (Demo Version)

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend Framework** | Angular | 17+ |
| **Mock Database** | **Angular In-Memory Web API** | Simulates Backend |
| **Styling** | Angular Material & SCSS | UI Components |
| **Routing** | Angular Router | Hash Strategy (for GitHub Pages support) |

---

## 🚀 How to Run This Demo Locally

If you wish to run this **specific serverless version** on your own machine:

### Step 1: Clone the Demo Branch
```bash
git clone -b deploy-demo [https://github.com/raappo/online-course-management-dashboard.git](https://github.com/raappo/online-course-management-dashboard.git)
cd online-course-management-dashboard
```
Step 2: Install Dependencies
```bash
npm install
```
Step 3: Run the AppUnlike the main branch, you do not need to start a json-server.
```bash
ng serve
```
Navigate to http://localhost:4200/.
🔐 Login CredentialsThe demo comes pre-loaded with these accounts:

© 2026 Online Course Management System.

To view the full architectural version with persistent data storage, please switch to the master branch.
