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
  - **MongoDB Memory Server** fallback: Zero-config presentation insurance (runs even if local MongoDB service isn't active).

---

## 📁 Project Structure

```text
canteen/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection & fallback
│   ├── controllers/
│   │   ├── authController.js     # User registration & login
│   │   ├── foodController.js     # Food CRUD & availability
│   │   └── orderController.js    # Order lifecycle & dynamic stats
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT & role protection (Student/Admin)
│   ├── models/
│   │   ├── FoodItem.js           # Food schema
│   │   ├── Order.js              # Order & items schema
│   │   └── User.js               # User schema with bcrypt hook
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   └── orderRoutes.js
│   ├── scripts/
│   │   └── seedData.js           # 14 sample foods & demo accounts
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminLayout.jsx
│   │   │   └── common/
│   │   │       ├── FoodCard.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Global user auth state
│   │   │   ├── CartContext.jsx   # Cart state & persistence
│   │   │   └── ToastContext.jsx  # Floating notifications
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageFood.jsx
│   │   │   │   └── ManageOrders.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios client with interceptors
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── test_workflow.js              # Automated E2E test verification script
├── package.json
└── README.md
```

---

## ⚡ How to Run Locally

### Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)
- *(Optional)* MongoDB locally or MongoDB Atlas URI (If not found, an in-memory database automatically boots up so you will never face connection errors during presentation!)

---

### Step 1: Start Backend Server
Open a terminal in the project root:
```bash
cd backend
npm install
node server.js
```
> Server runs on: `http://localhost:5000`  
> You will see:
> ```text
> 👤 Demo Admin created: admin@canteen.com / admin123
> 👤 Demo Student created: student@canteen.com / student123
> 🍔 Seeded 14 delicious food items!
> 📦 Sample orders seeded for instant dynamic presentation statistics!
> 🚀 Smart Canteen Server running on http://localhost:5000
> ```

---

### Step 2: Start Frontend Application
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
> Open your browser and navigate to: `http://127.0.0.1:5173`

---

### Step 3: Run the Automated Workflow Test (Optional)
To demonstrate end-to-end functionality to your evaluator or professor:
```bash
node test_workflow.js
```
Runs 13 sequential automated tests checking registration, login, food queries, order creation, dynamic stats calculation, status transitions, and admin food management.

---

## 🎯 Presentation Demonstration Walkthrough

When presenting to your professors, follow this smooth 5-minute demonstration sequence:

1. **Landing Page (`/`)**:
   - Showcase the modern Swiggy/Zomato style UI, banner, categories, and today's specials.
2. **Food Menu (`/menu`)**:
   - Demonstrate the real-time search (e.g. type *"coffee"* or *"pizza"*).
   - Filter by categories: *Snacks*, *Beverages*, *Fast Food*.
   - Click **Add to Cart** and show the instant quantity controls directly on the card.
3. **Shopping Cart (`/cart`)**:
   - Show dynamic calculation of subtotal.
   - Select payment mode and enter an instruction (e.g., *"Extra spicy"*).
   - Click **Place Order**.
4. **Student Order Tracker (`/orders`)**:
   - Point out the generated **Token Number** and the yellow **Pending** status badge.
5. **Admin Operations (`/admin`)**:
   - Click on **Admin Panel** in the top navigation or use 1-Click Admin Demo Login.
   - Show the dynamic dashboard metrics (Total Orders, Total Revenue, Pending Orders) calculated in real time from MongoDB.
   - Go to **Manage Orders**: Click `Start Prep` ➔ `Mark Ready`.
   - Switch back to the Student window and watch the status badge turn into glowing orange **Ready for Pickup!**.
   - Head to **Manage Food**: Add a custom dish or toggle an item's availability.

---

## 📜 Academic Acknowledgement

Developed as a College Mini-Project in Full-Stack Web Development demonstrating RESTful API design, database normalization, asynchronous state management, and modern component-driven UI architecture.
