# 📦 Inventory & Order Management System

A full-stack **Inventory & Order Management System** built using **FastAPI, React, PostgreSQL, and Docker**.
This application allows users to manage products, customers, and orders with proper inventory tracking and business rules.

---

## 🚀 Live Demo

* 🌐 Frontend: https://inventory-management-system-1-dbt1.onrender.com/
* ⚙️ Backend API:https://inventory-management-system-b2uj.onrender.com/

---

## 🧠 Features

### 📦 Product Management

* Add, view, and manage products
* Each product has:

  * Unique SKU (enforced)
  * Name, price, and stock quantity

### 👤 Customer Management

* Add and manage customers
* Each customer has:

  * Unique email (enforced)

### 🛒 Order Management

* Create orders with product selection and quantity
* Automatic stock deduction on order creation
* Prevents order creation if stock is insufficient

### 🔒 Business Rules

* Unique Product SKU
* Unique Customer Email
* Inventory validation before order placement
* Automatic stock updates

---

## 🏗️ Tech Stack

### Backend

* **FastAPI** (Python)
* SQLAlchemy ORM
* PostgreSQL Database

### Frontend

* **React.js**
* Axios for API calls

### DevOps

* Docker & Docker Compose
* Render (Deployment)

---

## 📁 Project Structure

```
inventory-system/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── crud.py
│   │   └── routes/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── .env
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the repository

```bash
git clone https://github.com/your-username/inventory-system.git
cd inventory-system
```

---

### 🔹 2. Run using Docker

```bash
docker compose up --build
```

---

### 🔹 3. Access the application

* Frontend → http://localhost:3000
* Backend → http://localhost:8000/docs

---

## 🌍 Deployment

The application is deployed using **Render**:

* Backend as a Web Service (Docker)
* Frontend as a Static Site
* PostgreSQL as Managed Database

---

## 🔑 Environment Variables

### Backend

```
DATABASE_URL=postgresql://user:password@host:port/dbname
```

---

### Frontend

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 📡 API Endpoints

### Products

* `GET /products`
* `POST /products`
* `DELETE /products/{id}`

### Customers

* `GET /customers`
* `POST /customers`

### Orders

* `GET /orders`
* `POST /orders`

---

## 🧪 Future Improvements

* Authentication & Authorization
* Update/Delete APIs for all entities
* UI enhancements with Material UI / Tailwind
* Pagination & search
* Unit and integration testing

---

## 👨‍💻 Author

**Mohammad Anas**
M.Tech CSE | NIT Delhi
📧 [anasm9038@gmail.com](mailto:anasm9038@gmail.com)

---

## ⭐ Acknowledgment

This project was developed as part of a technical assessment to demonstrate full-stack development skills, API design, and deployment using modern tools.

---
