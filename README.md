# 🍔 Smart Canteen Management System – CampusBites
> **College Mini-Project Presentation & Prototype**  
> Built with modern MERN Stack: **React (Vite) + Tailwind CSS + Node.js + Express.js + MongoDB + Mongoose**

---

## 🌟 Overview

**CampusBites** is a modern, responsive, and intuitive Smart Canteen Management System designed specifically for college campuses. It bridges the gap between students and canteen staff by eliminating long counter queues through an intelligent digital ordering, token issuance, and live status tracking pipeline.

Inspired by industry-standard food delivery platforms like **Swiggy** and **Zomato**, CampusBites features a warm orange & slate palette, interactive food cards, rich photography, instant cart calculations, and real-time order lifecycle tracking.

---

## 🎓 Demo Credentials for Presentation

The system is pre-seeded with ready-to-present sample accounts and 14 delicious food items. You can also use the **"1-Click Presentation Demo Login"** buttons located directly on the Sign-In page.

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@canteen.com` | `admin123` | Admin Dashboard, Food CRUD, Order Lifecycle Management |
| **Student** | `student@canteen.com` | `student123` | Food Menu, Cart, Digital Token Ordering, Order History |

---

## 🚀 Key Features

### 👨‍🎓 Student Portal
- **Home Landing**: Hero banner with instant search, fast-order CTA, category tiles, "Today's Special", and "Popular Dishes".
- **Food Catalog**:
  - Filter by category: **Snacks**, **Meals**, **Beverages**, **Fast Food**.
  - Real-time search across dish titles and descriptions.
  - Sort by Price (Low to High, High to Low) and Ratings.
  - Live **Available** / **Out of Stock** badges.
  - Direct quantity counter (`+` / `-`) on food cards.
- **Interactive Shopping Cart**:
  - Add/remove items and adjust quantities.
  - Dynamic pricing and subtotals.
  - Kitchen instructions / notes field.
  - Flexible payment mode: *Pay at Canteen Counter* or *Simulated UPI/Online Payment*.
- **Live Order Tracker (My Orders)**:
  - Generates unique digital **Token Numbers** (e.g., `#101`, `#102`).
  - Real-time status badges:
    - 🟡 **Pending** (Received by counter)
    - 🔵 **Preparing** (Cooked in kitchen)
    - 🟠 **Ready** (Ready for pickup!)
    - 🟢 **Completed** (Delivered & settled)
  - Auto-refreshes every 10 seconds and includes manual **Refresh Status** button.

### 🛡️ Admin Dashboard
- **Live Database Statistics**:
  - **Total Orders** (Calculated from DB)
  - **Total Revenue** (Calculated from completed/paid DB orders)
  - **Active Food Items** count
  - **Pending Orders** alert badge
  - Visual status distribution breakdown bar.
- **Manage Food Catalog**:
  - Add new food items with name, description, category, price, prep time, tags, and image preview.
  - Edit existing food details and pricing in a responsive modal.
  - One-click live availability toggle (`Available` vs `Out of Stock`).
  - Delete food items with confirmation.
- **Manage Orders**:
  - View all student orders with token numbers, timestamps, student details, and ordered items.
  - Instant status transition buttons: `Start Prep` ➔ `Mark Ready` ➔ `Complete Order`.
  - Filter orders by status (*Pending, Preparing, Ready, Completed, Cancelled*).

---

## ☁️ Deploying to Vercel

The application is pre-configured with a serverless Express bridge ([api/index.js](file:///c:/Users/madhur/OneDrive/Desktop/projects/canteen/api/index.js)) and [vercel.json](file:///c:/Users/madhur/OneDrive/Desktop/projects/canteen/vercel.json) to deploy both frontend and backend seamlessly under a single URL!

### Option A: Deploy via Vercel CLI (Fastest)

1. Open your terminal in the project root:
   ```bash
   npx vercel login
   ```
   *(Confirm the login in your browser)*

2. Deploy the application:
   ```bash
   npx vercel
   ```
   *(Press **Enter** to accept all default settings: Link to project: Yes, Scope: your account, Project name: smart-canteen, Directory: `.`)*

3. Deploy to production:
   ```bash
   npx vercel --prod
   ```

---

### Option B: Deploy via GitHub (Recommended for College Presentations)

1. Create a new repository on your GitHub account (e.g. `smart-canteen`).
2. Push your project code:
   ```bash
   git remote add origin https://github.com/<your-username>/smart-canteen.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new), select your GitHub repository, and click **Import**.
4. In **Project Settings** ➔ **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI (`mongodb+srv://...`)
   - `JWT_SECRET`: Any secret string (e.g. `super_secret_college_project_jwt_key_2026`)
5. Click **Deploy**. Vercel will build both the React frontend and Express serverless API automatically!

---

## 🛠️ Technology Stack

- **Frontend**:
  - **React 18** with **Vite** (Lightning-fast HMR)
  - **Tailwind CSS v4** (Modern utility-first styling)
  - **Lucide React** (Consistent icons)
  - **React Router DOM v7** (Declarative routing & protected routes)
  - **Axios** (REST API client with JWT bearer interceptor)
- **Backend**:
  - **Node.js** & **Express.js** (RESTful API architecture)
  - **MongoDB** & **Mongoose ODM**
  - **JWT (JSON Web Tokens)** for stateless session authorization
  - **bcryptjs** for secure password hashing
  - **Vercel Serverless Function** bridge & MongoDB connection caching

---

## ⚡ How to Run Locally

### Step 1: Start Backend Server
```bash
cd backend
npm install
node server.js
```
> Server runs on: `http://localhost:5000`

### Step 2: Start Frontend Application
```bash
cd frontend
npm install
npm run dev
```
> Open in your browser: `http://127.0.0.1:5173`

---

## 📜 Academic Acknowledgement

Developed as a College Mini-Project in Full-Stack Web Development demonstrating RESTful API design, database normalization, asynchronous state management, and modern component-driven UI architecture.
