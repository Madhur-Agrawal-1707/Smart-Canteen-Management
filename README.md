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

## 🚀 Deploying to Render (Unified 1-Service Architecture)

The system is configured to serve both the React frontend and Express backend from **one single Render Web Service** on Render's Free Tier! This means zero CORS issues and a single clean `.onrender.com` domain.

### Step-by-Step Render Deployment Guide

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Render"
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/smart-canteen.git
   git branch -M main
   git push -u origin main
   ```

2. **Open Render Dashboard**:
   - Go to [dashboard.render.com](https://dashboard.render.com).
   - Click **New +** ➔ **Web Service**.
   - Connect your GitHub repository (`smart-canteen`).

3. **Configure Service Settings**:
   - **Name**: `smart-canteen` (or any name you prefer)
   - **Runtime**: `Node`
   - **Region**: Choose the closest region (e.g. `Singapore` or `Oregon`)
   - **Branch**: `main`
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Add Environment Variables**:
   Click on the **Environment Variables** section and add:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `super_secret_college_project_jwt_key_2026`
   - `MONGODB_URI`: Your MongoDB Atlas URI (e.g. `mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart-canteen?retryWrites=true&w=majority`)

5. **Click "Deploy Web Service"**:
   Render will automatically run `npm run render-build` (which installs all dependencies and builds the Vite frontend), then run `npm start` (starting the Express server, which serves both the API and the React frontend).

Once deployed, your full-stack application will be live at `https://smart-canteen.onrender.com`!

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
  - Unified static asset server for production hosting

---

## ⚡ How to Run Locally

### Option 1: Run Full System Together (Production Mode)
```bash
npm run render-build
npm start
```
> Open in your browser: `http://localhost:5000`  
> Express serves both the React UI and the REST API simultaneously!

### Option 2: Run Development Mode (HMR Enabled)
- **Terminal 1 (Backend)**:
  ```bash
  npm run dev:backend
  ```
- **Terminal 2 (Frontend)**:
  ```bash
  npm run dev:frontend
  ```
> Open in your browser: `http://127.0.0.1:5173`

---

## 📜 Academic Acknowledgement

Developed as a College Mini-Project in Full-Stack Web Development demonstrating RESTful API design, database normalization, asynchronous state management, and modern component-driven UI architecture.
