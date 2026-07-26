# ABSS Nexus Technologies - Production Roadmap

This roadmap keeps the work separated by frontend, admin, backend, database, and deployment.
Current website files are still in the root so the live/static site does not break while the new structure is prepared.

## Phase 0 - Current Static Site Stabilization

Status: In progress

- Keep current root HTML pages working.
- Keep `styles.css` and `script.js` working until migration is complete.
- Validate links, forms, admin pages, and responsive layout.
- Do not move live files until imports and paths are updated together.

## Phase 1 - Folder Structure And Code Separation

Status: Completed

Target folders:

- `public/` - public assets served directly.
- `public/assets/` - images, icons, downloadable files.
- `src/pages/` - public website page source.
- `src/admin/` - admin page source and admin-only UI.
- `src/styles/` - CSS split by area.
- `src/scripts/` - browser JavaScript modules.
- `src/config/` - app config and environment mapping.
- `src/services/` - frontend service layer for auth, leads, projects, clients, support, pricing.
- `src/components/` - shared page parts such as nav, footer, cards, tables, forms.
- `backend/` - backend API/auth/service code.
- `database/` - schema, migrations, and seed data.
- `scripts/` - build, validation, migration, and deployment helpers.
- `tests/` - smoke tests and future automated checks.
- `docs/` - technical notes and handoff docs.

Deliverables:

- Create folder structure.
- Add architecture docs.
- Move pages into `src/pages` and `src/admin`.
- Move assets into `public/assets`.
- Move CSS into `src/styles`.
- Move scripts into `src/scripts`, `src/config`, and `src/services`.
- Keep root compatibility redirects so old URLs continue to work.

## Phase 2 - Real Authentication

Status: Pending

Goal:

- Replace frontend demo password with real authentication.

Recommended backend:

- Supabase Auth for email/password login.
- Admin users stored in Supabase Auth.
- Admin pages only load data after authenticated session.

Tasks:

- Create Supabase project.
- Add Supabase URL and anon key.
- Replace `sessionStorage` demo auth with Supabase Auth.
- Add logout session handling.
- Add route protection for every admin page.
- Remove hardcoded password from frontend.

## Phase 3 - Real Database

Status: Pending

Goal:

- Replace localStorage admin data with real database tables.

Tables:

- `leads`
- `projects`
- `clients`
- `support_tickets`
- `pricing_packages`
- `activity_log`

Tasks:

- Run `supabase-schema.sql`.
- Create row-level security policies.
- Build services for CRUD operations.
- Connect admin pages to database services.
- Add loading, empty, and error states.

## Phase 4 - Contact Form To Admin Leads

Status: Local prototype done

Current:

- Contact form stores a local lead queue when opened in the same browser.
- Netlify form still handles static form submission.

Production target:

- Contact form submits to backend.
- Backend validates and stores lead in `leads`.
- Admin Leads page shows new website inquiries automatically.

Tasks:

- Add spam protection.
- Add server-side validation.
- Add success/error messages.
- Add email notification for new inquiry.

## Phase 5 - Admin Modules

Status: UI prototype done

Pages:

- `admin-login.html`
- `admin-dashboard.html`
- `admin-leads.html`
- `admin-projects.html`
- `admin-clients.html`
- `admin-support.html`
- `admin-pricing.html`

Production tasks:

- Add edit modals, not only add/delete/status.
- Add pagination and sorting.
- Add search for all tables.
- Add audit log.
- Add role checks for sensitive actions.
- Add dashboard analytics from real database.

## Phase 6 - Frontend Polish

Status: Pending

Tasks:

- Split CSS by public/admin/shared.
- Move repeated header/footer into reusable components or templates.
- Improve image optimization.
- Add SEO metadata per page.
- Add Open Graph image consistency.
- Add accessibility pass.
- Add mobile visual QA.

## Phase 7 - Deployment

Status: Pending

Tasks:

- Keep Netlify headers in `_headers`.
- Keep admin pages blocked in `robots.txt`.
- Add build/validation scripts.
- Configure environment variables.
- Test deployed contact form.
- Test admin auth/database in production.

## Phase 8 - Testing

Status: Pending

Tests:

- Link checker.
- JS syntax check.
- CSS sanity check.
- Admin login flow.
- Lead create/update/delete.
- Project create/progress/delete.
- Contact form submit.
- Mobile viewport smoke test.

## Recommended Next Order

1. Finish folder migration without breaking current site.
2. Connect Supabase Auth.
3. Connect Supabase database.
4. Connect contact form to backend leads.
5. Add testing/deployment scripts.
