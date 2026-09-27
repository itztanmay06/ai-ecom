# 🛍️ ShopIntel AI - E-Commerce Price Intelligence & Comparison Platform

A beginner-friendly, full-stack AI-powered e-commerce platform built with **React + Vite** on the frontend and **Node.js + Express** on the backend.

---

## 📁 Project Structure Overview

```text
AI ECOM/
├── frontend/                     # ⚛️ React + Vite Web Application
│   ├── src/
│   │   ├── components/           # UI Layout Components (Header, Sidebar)
│   │   ├── pages/                # Page Views (Home, Browse, Compare, AI Assistant...)
│   │   ├── data/                 # Product Datasets (Laptops, Monitors, Smartphones)
│   │   └── utils/                # Helper functions (Activity tracker, LocalStorage sync)
│   ├── public/                   # Images, Icons, and Mascots (banner, robot, laptop)
│   ├── package.json              # Frontend dependencies and npm scripts
│   └── vercel.json               # Vercel deployment routing configuration
│
├── backend/                      # 🟢 Node.js Express REST API & AI Engine
│   ├── server.js                 # Express REST API endpoints
│   ├── agent.js                  # AI Shopping Assistant & Gemini agent
│   ├── data/                     # Cleaned product datasets
│   └── package.json              # Node.js backend dependencies
│
└── extra files ecom/             # 📁 Archived Python files & scripts
```

---

## 🚀 How to Run the Project Locally

### 1. Start the Backend API (Node.js Express)
Open a terminal and run:
```bash
cd backend
npm install
node server.js
```
> 🌐 Backend API will run at: `http://127.0.0.1:8000`

### 2. Start the Frontend App (React + Vite)
Open a second terminal and run:
```bash
cd frontend
npm install
npm run dev
```
> 💻 Frontend App will run at: `http://localhost:5173`

---

## 💡 Key Features & Pages

1. **Home (`Home.jsx`)**: Overview dashboard showing Best Price Today, Fake Discounts detected, Cross-Market Arbitrage, Best Value Champions, and Live Recently Viewed products.
2. **Browse (`Browse.jsx`)**: Filter products by category (Laptops, Smartphones, Monitors), brand, price range, and keyword search.
3. **Compare (`Compare.jsx`)**: Side-by-side spec comparisons for up to 4 products with value density scores.
4. **AI Assistant (`Assistant.jsx`)**: Natural language buying recommendation assistant powered by Gemini.
5. **Price Drop Alerts (`PriceDropAlerts.jsx`)**: Set target price alerts for products.
