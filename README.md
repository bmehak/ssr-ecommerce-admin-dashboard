# 🛍️ SSR E-Commerce Platform — Admin Dashboard & Storefront

This project is a **Server-Side Rendered (SSR) E-Commerce Platform** built using **Next.js App Router**, featuring a full admin dashboard, authentication system, product management, and order placement — all powered by **MongoDB & NextAuth**.

It supports both:

- **Admin users** – store management  
- **Registered users** – shopping & ordering  

---

## 🚀 Features

### 👩‍💼 Admin Features
- ✔ Secure Admin Authentication  
- ✔ Dashboard with Analytics & Insights  
- ✔ Manage Products (CRUD operations)  
- ✔ Upload Product Images (Cloudinary)  
- ✔ Track Stock Levels  
- ✔ Revenue Analytics (Past 7 Days)  
- ✔ Low-Stock Alerts  
- ✔ Create & Manage User/Admin Accounts  
- ✔ Server-Rendered UI for SEO & Performance  

---

### 🛒 Customer Features
- ✔ Browse Products  
- ✔ View Product Details  
- ✔ Secure Login & Signup  
- ✔ Place Orders  
- ✔ Auto-Login After Signup  
- ✔ Real-Time Stock Validation  

---

### 🔐 Authentication
- ✔ NextAuth Credentials Provider  
- ✔ Role-Based Authorization  
- ✔ Protected Admin Routes  
- ✔ Session-Based Access Control  

---

### 📊 Analytics
Bar charts for:

- Stock Levels by Product  
- Revenue in Last 7 Days  

Plus:

- ✔ Best-Selling Product Highlight  
- ✔ Total Revenue & Stock Value  
- ✔ Low Stock Notifications  

---

## 🏗️ Tech Stack

| Layer | Technology |
|------|-----------|
| Framework | Next.js (App Router, SSR) |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js |
| Charts | Recharts |
| UI | React + CSS |
| Storage | Cloudinary |
| Toasts | react-hot-toast |
| Language | TypeScript |

---

## 📂 Project Structure (Important Folders)

```text
ssr-ecommerce-admin-dashboard/
├── app/
│   ├── api/
│   │   ├── admins/          # API routes for admin management
│   │   ├── orders/
│   │   │   └── new/         # POST route for creating orders
│   │   └── products/        # API routes for product CRUD
│   ├── dashboard/
│   │   ├── admins/          # Admin management UI
│   │   ├── products/        # Product management UI
│   │   └── layout.tsx       # Shared dashboard sidebar/header
│   ├── login/               # Authentication: Login page
│   └── signup/              # Authentication: Registration page
├── components/              # Reusable UI components (Buttons, Cards, etc.)
├── lib/                     # Utility functions and shared logic
├── models/                  # Database schemas (Mongoose)
├── types/                   # TypeScript interfaces and type definitions
└── public/                  # Static assets (images, icons)
```
---

## 🗄️ Database Models

### 👤 Users
- email  
- password (hashed)  
- role (`admin | user`)  

### 📦 Products
- name  
- description  
- category  
- price  
- stock  
- image  

### 🧾 Orders
- productId  
- quantity  
- price  
- userId  
- createdAt  

---

## 🔑 Roles

### 🛠 Admin
- ✔ Full dashboard access  
- ✔ Manage products  
- ✔ Manage users  
- ✔ View analytics  

### 👤 User
- ✔ Browse store  
- ✔ Place orders  

---

## 🧠 Key Concepts Used
- ✔ Server-Side Rendering  
- ✔ Protected Routes  
- ✔ NextAuth JWT Session Extension  
- ✔ MongoDB Validation  
- ✔ Role-Based Access  
- ✔ API Routes  
- ✔ Cloudinary Upload Widget  
- ✔ Strong TypeScript Types  

---

## ▶️ Getting Started (Local Setup)

```bash
git clone <repo-url>
cd ssr-ecommerce-admin-dashboard
npm install
```
### Create .env.local :
```text
MONGODB_URI=...
AUTH_SECRET=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
```
---

## ▶️ Run the App

```bash
npm run dev
```

---
## 🔐 Default Admin Access (Optional)

If you seeded an admin account — login using those credentials.  
Admins can create additional users from the dashboard.

---

## 📈 Admin Dashboard Includes

- ✔ Revenue Chart  
- ✔ Stock Chart  
- ✔ KPI Cards  
- ✔ Low-Stock Alerts  

---

## 🛡️ Security Highlights

- ✔ Passwords are hashed  
- ✔ Users cannot access admin pages  
- ✔ Orders require login  
- ✔ Stock validation prevents overselling  

---

## 🚀 Live Demo

🔗 https://ssr-ecommerce-admin-dashboard.vercel.app

---

## 🔐 Demo Admin Login

**Email:** admin@example.com  
**Password:** admin123

---

## 💡 Learning Outcomes

This project demonstrates:

- ✅ Building SSR apps with Next.js  
- ✅ JWT-based authentication  
- ✅ Full-stack TypeScript  
- ✅ Role-based access  
- ✅ MongoDB data modeling  
- ✅ Real-world admin dashboards  

---

## 📌 Future Improvements (Optional Ideas)

- 🔹 Order history page  
- 🔹 Cart system  
- 🔹 Payment gateway integration  
- 🔹 Search & filters  

*(Not implemented — but good extensions!)* 

---

## 👩‍💻 Author
Bhoomika Chourasiya
