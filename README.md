# Online Course Management Dashboard

A comprehensive Angular application for managing an educational platform. This system features role-based access for Admins, Teachers, and Students, allowing for course creation, enrollment management, and data visualization.

## 🚀 Features

* **Role-Based Dashboards:**
    * **Admin:** Manage all courses, students, and teachers. View system-wide statistics.
    * **Teacher:** Manage assigned courses and view enrolled students.
    * **Student:** Browse courses, enroll, and view personal progress.
* **Data Management:** Full CRUD (Create, Read, Update, Delete) capabilities.
* **Real-time Feedback:** Interactive UI using Angular Material (Snackbars, Dialogs).
* **Backend Simulation:** Uses `json-server` to simulate a real REST API with data persistence.

## 🛠️ Tech Stack

* **Frontend:** Angular (20.3.10), Angular Material, RxJS
* **Backend:** JSON Server (Mock REST API)
* **Styling:** SCSS, Angular Material Components

## ⚙️ Installation & Setup (For Examiners)

To run this project, you need to open **two separate terminals**.

### Step 1: Install Dependencies
Open your project folder in a terminal and run:
```bash
npm install
```
Step 2: Start the Mock Backend (Terminal 1)
This simulates the database. Keep this terminal running.
```bash
npx json-server --watch db.json --port 3000
```
The API will be available at http://localhost:3000

Step 3: Start the Angular App (Terminal 2)
Open a second terminal window and run:
```bash
ng serve
```
Navigate to http://localhost:4200/ in your browser.

🔑 Login Credentials
You can use the buttons on the login page or these credentials:

Admin: admin@school.com / admin123

Teacher: teacher@school.com / teacher123

Student: student@school.com / student123

📂 Project Structure
src/app/components: Individual feature dashboards.

src/app/services: HTTP services communicating with the backend.

src/app/models: TypeScript interfaces for type safety.

db.json: The local database file containing all application data.
