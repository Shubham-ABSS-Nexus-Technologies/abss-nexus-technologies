# Production Completion Roadmap

This roadmap is for turning ABSS Nexus Technologies into a corporate IT services and software development agency website.

## Status Summary

Completed locally:

- Folder structure separated.
- Public pages moved into `src/pages`.
- Admin pages moved into `src/admin`.
- Assets moved into `public/assets`.
- Styles, scripts, config, and services separated.
- Admin pages split by module.
- Admin login page separated.
- Local admin data service created.
- Database schema scaffold created.
- Dependency-free Node backend added.
- Backend API authentication added.
- Visible/prefilled admin credentials removed from login page.
- Local JSON database persistence added.
- Contact form API endpoint added.
- Validation scripts created.
- Security headers, redirects, and robots rules added.

Still needs external production credentials:

- Supabase project URL.
- Supabase anon key.
- Supabase Auth admin user.
- Netlify production deployment environment.
- Final domain URL if different from `abss-nexus.netlify.app`.

## Phase 1 - Public Website Polish

Goal:

- Make the public site feel like a corporate IT services agency.

Tasks:

- Improve homepage messaging.
- Add service detail pages.
- Add case study pages.
- Add stronger calls to action.
- Add industries served.
- Add process and delivery model.
- Add testimonials once real reviews are available.
- Add real client/project results once available.

Local implementation status:

- Service detail scaffolds added.
- Case study scaffold added.
- 404 page added.

## Phase 2 - SEO And Discovery

Goal:

- Make the site crawlable, understandable, and shareable.

Tasks:

- Add XML sitemap.
- Add robots rules.
- Add Open Graph metadata.
- Add schema JSON-LD.
- Add unique page titles/descriptions.
- Add image alt text review.
- Add canonical URLs after final domain confirmation.

Local implementation status:

- `sitemap.xml` added.
- `robots.txt` exists.
- SEO schema helper added.

## Phase 3 - Real Admin Authentication

Goal:

- Replace demo login with real auth.

Local implementation status:

- Backend API login is available at `POST /api/auth/login`.
- Admin verification no longer depends only on frontend password comparison.
- Local session token is stored in session storage.

Recommended cloud implementation:

- Supabase Auth email/password.
- Admin users created in Supabase dashboard.
- Admin pages check active Supabase session.
- Logout clears Supabase session.
- Remove hardcoded frontend password.

Cloud production blocked until:

- Supabase URL and anon key are available.
- Admin email/password is created in Supabase.

## Phase 4 - Real Database

Goal:

- Replace localStorage admin data with real database.

Tables:

- `leads`
- `projects`
- `clients`
- `support_tickets`
- `pricing_packages`
- `activity_log`

Local implementation status:

- Migration exists at `database/migrations/001_initial_admin_schema.sql`.
- Local JSON database exists at `backend/data/db.json`.
- Admin state API is available at `GET/PUT /api/admin/state`.

Cloud production blocked until:

- Supabase project is available.
- Migration is run in Supabase SQL editor or CLI.

## Phase 5 - Contact Form To Lead Database

Goal:

- Website inquiries should appear in admin Leads.

Tasks:

- Validate form fields.
- Store lead in database.
- Add spam protection.
- Add email notification.
- Show user-friendly success/error message.

Current status:

- Contact form submits to local backend API when backend is running.
- Contact form falls back to local queue if API is unavailable.
- Netlify form still handles static submission.

Blocked until:

- Production backend function or Supabase insert flow is configured.

## Phase 6 - Deployment QA

Goal:

- Verify real deployed behavior.

Tasks:

- Deploy to Netlify.
- Check redirects.
- Check `_headers`.
- Check `robots.txt`.
- Check `sitemap.xml`.
- Test contact form.
- Test admin login.
- Test mobile layout.
- Test social previews.
- Run validation scripts before deploy.

## Phase 7 - Long-Term Agency Website Growth

Future improvements:

- Blog/resources section.
- Downloadable company profile PDF.
- Project estimate calculator.
- Client portal.
- Proposal generator.
- Invoice/payment tracking.
- Analytics dashboard.
