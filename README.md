# E-Commerce Multi-Vendor Backend

A multi-vendor e-commerce backend application built with NestJS and Prisma, focused on robust modular architecture, advanced dynamic RBAC, and secure database seeding.

---

## Features

- **Modular NestJS Architecture** following SOLID design principles
- **Secure Authentication**: JWT-based user authentication and bcrypt password hashing
- **Advanced Dynamic RBAC**: Fine-grained access control using a custom global `AccessControlGuard` that automatically translates route paths and HTTP verbs into permission keys (`[route]_[action]`)
- **Multi-Vendor Role Assignments**: Flexible mapping of users to specific vendor stores with unique store-level roles
- **Zod Schema Validation**: Strict type-safe request validation and response serialization using `nestjs-zod`
- **Structured Winston Logger**: Centrally managed request/response logging using custom interceptors to track api latency
- **Clean Swagger Docs**: Automated Swagger documentation with a custom filter to hide internal metadata fields (e.g., `createdAt`, `updatedAt`, `createdBy`) for a cleaner API consumer experience
- **Fidelity Database Seeding**: Automatic local database provisioning and seeding with realistic mock data

---

## Tech Stack

### Backend
- NestJS (Node.js framework)
- TypeScript
- Zod & nestjs-zod
- JWT (JSON Web Tokens) & Bcrypt

### Database & ORM
- PostgreSQL
- Prisma ORM

### Tools
- Swagger UI (OpenAPI)
- Winston Logger (`nest-winston`)
- Docker
- Git & GitHub

---

## Database Architecture

The PostgreSQL database models are fully designed and migrated using Prisma to support complete catalog and transaction logic, serving as a solid blueprint for future developments.

### ERD Schema
Below is the database relationship schema represented via Mermaid:

```mermaid
erDiagram
    User ||--o{ Vendor : "owns"
    User ||--o{ Order : "places"
    User ||--o{ UserVendorRole : "has"
    Vendor ||--o{ UserVendorRole : "associates"
    Role ||--o{ UserVendorRole : "assigns"
    Role ||--o{ RolePermission : "contains"
    Permission ||--o{ RolePermission : "defines"
    
    Vendor ||--o{ Product : "manages"
    Product ||--o{ ProductVariant : "has"
    Product ||--o{ ProductImage : "contains"
    ProductVariant ||--o{ ProductImage : "has_specific"
    
    Category ||--o{ Category : "parent/child"
    Product ||--o{ ProductCategory : "belongs_to"
    Category ||--o{ ProductCategory : "associates"
    
    Cart ||--o{ CartItem : "contains"
    ProductVariant ||--o{ CartItem : "added_to"
    User ||--|| Cart : "owns"
    
    Order ||--o{ OrderItem : "has"
    ProductVariant ||--o{ OrderItem : "purchased"
    Order ||--o{ OrderAddress : "ships_to"
    Order ||--o{ OrderPromotion : "applies"
    Promotion ||--o{ OrderPromotion : "used_in"
    Order ||--o{ Payment : "tracks"
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/mtan7805/ECommerce-BE.git
```

Move to project folder:

```bash
cd ecommerce_system
```

Install dependencies:

```bash
npm install
```

Configure Environment Variables:
1. Create a `.env` file in the root directory by copying the keys from the `.env.example` file.
2. Spin up a local PostgreSQL database instance instantly with Docker:
   ```bash
   docker run --name pg_nestjs_ecommerce -e POSTGRES_USER=user_nestjs_ecommerce -e POSTGRES_PASSWORD=password_nestjs_ecommerce -e POSTGRES_DB=db_nestjs_ecommerce -p 5432:5432 -d postgres
   ```
3. Set your database connection string and JWT secret inside `.env`:
   ```env
   PORT=7777
   HOST=localhost
   APP_PREFIX=/api
   APP_NAME=nestjs_ecommerce
   DATABASE_URL="postgresql://user_nestjs_ecommerce:password_nestjs_ecommerce@localhost:5432/db_nestjs_ecommerce?schema=public"
   JWT_SECRET="YOUR_LOCAL_JWT_SECRET"
   ```

Synchronize Database & Seed Mock Data:
```bash
# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma Client & Zod schemas
npm run prisma:generate

# Seed the database with high-quality mock data (users, vendors, roles, and permissions)
npm run prisma:seed
```

Run development server:

```bash
npm run start:dev
```

The service will be active at `http://localhost:7777/api` where you can explore the auto-generated Swagger UI.

---

## Future Improvements

- **API Implementations** (In Progress):
  - Product Catalog management APIs (Products, Variants, and Categories)
  - Shopping Cart, Checkout, and Booking/Ordering flow logic
  - Promotion, Voucher, and Discount code application logic
- **Integrations & Operations**:
  - Integrate Stripe or VNPay payment gateways
  - Add real-time user/vendor notifications using WebSockets
  - Implement Redis caching for high-traffic catalog endpoints
  - Build a comprehensive admin & vendor analytics dashboard

---

## Author

GitHub: https://github.com/mtan7805
