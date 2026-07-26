# Backend Connection Guide

Current local backend: dependency-free Node server.

Run locally:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Local backend features:

- `POST /api/auth/login`
- `GET /api/admin/state`
- `PUT /api/admin/state`
- `POST /api/leads/contact`
- Static file serving
- JSON database at `backend/data/db.json`

Recommended cloud backend: Supabase.

## Step 1 - Create Supabase Project

Create a Supabase project and copy:

- Project URL
- Public anon key

## Step 2 - Run Database Migration

Open Supabase SQL editor and run:

```sql
-- database/migrations/001_initial_admin_schema.sql
```

## Step 3 - Create Admin User

Use Supabase Auth to create an admin user.

## Step 4 - Update Frontend Config

Update:

```js
// src/config/admin-config.js
window.AbssAdminConfig = {
  mode: "supabase",
  backend: {
    provider: "supabase",
    supabaseUrl: "YOUR_SUPABASE_URL",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
  },
};
```

## Step 5 - Replace Local Service Implementation

Update `src/services/admin-api.js` to use Supabase CRUD instead of localStorage.

## Step 6 - Contact Form

Connect `src/pages/contact.html` form to a backend function or Supabase insert.

Recommended safe route:

- Netlify Function receives form data.
- Function validates input.
- Function inserts into Supabase `leads`.
- Function sends notification email.

## Why Credentials Are Required

The site cannot be connected to a real backend without project-specific credentials. Keeping fake credentials in code would create a broken production setup.
