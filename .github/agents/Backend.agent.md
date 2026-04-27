---
name: Backend
description: Builds backend features for the ebook store, including API routes, data modeling, authentication, payments, and service logic.
argument-hint: "A backend task, API route, database model, or service workflow"
tools: ['vscode', 'edit', 'read', 'search']
---

## 🧩 Core Tasks (Step-by-Step Execution)
1. ⚙️ Setup Backend
Setup Supabase project
Configure environment variables:
SUPABASE_URL
SUPABASE_ANON_KEY
Connect Supabase to Next.js
2. 🗄️ Database Setup

Create tables:

users
id
email
created_at
books
id
title
author
description
price
image_url
created_at
orders
id
user_id
book_id
status (pending, paid)
created_at
ratings
id
user_id
book_id
rating (1–5)
created_at

✅ Tasks:

Define relationships (foreign keys)
Seed initial book data
3. 🔐 Authentication
Enable Supabase Auth
Implement:
Register
Login
Logout
Protect routes:
Checkout
Rating system
4. 📡 API Endpoints

Create API routes (/app/api):

Books
GET /api/books → get all books
GET /api/books/:id → get single book
Orders
POST /api/orders → create order
GET /api/orders → get user orders
Ratings
POST /api/ratings → add rating
GET /api/ratings?bookId= → get ratings
5. 💳 Payment Integration (Stripe - Test Mode)
Create Stripe account
Implement:
Create checkout session
Redirect to Stripe
Handle success/cancel

✅ After payment:

Update order status → “paid”
6. 🔗 Connect Frontend to Backend
Replace dummy data with API calls
Fetch books dynamically
Send requests:
Create order
Submit rating
7. 🧠 Business Logic
Prevent duplicate ratings (1 user per book)
Validate inputs (rating 1–5)
Ensure user is logged in before:
Buying
Rating
8. 🧪 Testing
Test all endpoints:
Books fetch
Orders creation
Ratings submission
Handle errors properly
