# Store

A full-stack e-commerce application with a Spring Boot backend and React frontend. Browse products, add to cart, place orders, and manage orders as an admin.

## Features

- **Products**: Browse product catalog with images, prices, and details
- **Cart**: Add/remove items, update quantities, view total
- **Checkout**: Place orders (requires login), order confirmation
- **Authentication**: Login/Logout with HTTP Basic Auth
- **Admin Panel**: View all orders with item details (ADMIN role only)
- **Responsive UI**: Mobile-friendly layout with Tailwind CSS

## Getting Started

### Backend

```bash
cd backend && ./mvnw spring-boot:run
```

Backend runs at http://localhost:8080

### Frontend

```bash
cd frontend && npm install && npm run dev
```

Frontend runs at http://localhost:5173

## Default Credentials

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |

## Database (H2 Console)

The app uses an in-memory H2 database. To inspect the database:

1. Ensure the backend is running.
2. Open http://localhost:8080/h2-console
3. If prompted, use Basic Auth: **admin** / **admin123**
4. In the H2 console login form:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **User Name**: `sa`
   - **Password**: `password`
5. Click **Connect** to browse tables (products, orders, order_items, users).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│  React (Vite + Tailwind) @ localhost:5173                        │
│  - ProductList, ProductDetail, Cart, Checkout                    │
│  - Login, Admin Panel                                            │
│  - AuthContext, CartContext                                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP + Basic Auth
                            │ CORS: localhost:5173
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND                           │
│                      @ localhost:8080                            │
├─────────────────────────────────────────────────────────────────┤
│  REST API                                                        │
│  - GET  /api/products, /api/products/:id    (public)             │
│  - POST /api/orders                         (authenticated)      │
│  - GET  /api/orders                         (ADMIN only)         │
├─────────────────────────────────────────────────────────────────┤
│  Security: Spring Security + HTTP Basic Auth + BCrypt            │
├─────────────────────────────────────────────────────────────────┤
│  Data: Spring Data JPA + H2 (in-memory)                          │
│  - Product, Order, OrderItem, User                               │
└─────────────────────────────────────────────────────────────────┘
```

**Project structure:**

- `backend/` – Spring Boot (Maven), Java 21
- `frontend/` – React, Vite, Tailwind CSS
