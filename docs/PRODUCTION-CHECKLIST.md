# Production Checklist

## Before Launch

- [x] Replace frontend-only demo login with backend API auth.
- [ ] Add real Supabase URL and anon key.
- [ ] Run database migration.
- [ ] Test contact form on deployed Netlify site.
- [ ] Confirm final domain.
- [ ] Update canonical URLs to final domain.
- [ ] Test all redirects.
- [ ] Test mobile layouts.
- [ ] Add real testimonials.
- [ ] Add real case study results.
- [ ] Run `scripts/validate.sh`.

## Security

- [x] Security headers added.
- [x] Admin pages blocked from indexing.
- [x] Move primary login verification to backend API.
- [x] Remove visible/prefilled admin credentials from login page.
- [x] Add basic server-side validation.
- [ ] Replace local backend credentials with production environment variables.
- [ ] Add spam protection.

## SEO

- [x] `robots.txt` added.
- [x] `sitemap.xml` added.
- [x] Open Graph image exists.
- [ ] Final canonical URLs added.
- [ ] Schema tested with Google Rich Results tool.

## Admin

- [x] Admin login page separated.
- [x] Admin pages separated.
- [x] Admin data service exists.
- [x] Local backend auth connected.
- [x] Local JSON database connected.
- [ ] Cloud database connected.
- [ ] Edit modals added for every module.
- [ ] Role-based access added.

## Deployment

- [x] `_headers` added.
- [x] `_redirects` added.
- [ ] Netlify production deploy tested.
- [ ] Form submission tested on deployed URL.
