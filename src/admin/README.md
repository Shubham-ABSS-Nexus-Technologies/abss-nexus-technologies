# src/admin

Future home for admin page source.

Security status: development-only unless `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and
`AUTH_SECRET` are configured in the deployment environment. The Netlify build
excludes these pages from `dist` when secure admin credentials are missing.

Current admin pages:

- `admin-login.html`
- `admin-dashboard.html`
- `admin-leads.html`
- `admin-projects.html`
- `admin-clients.html`
- `admin-support.html`
- `admin-pricing.html`
