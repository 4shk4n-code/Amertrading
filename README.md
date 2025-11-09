## AMER TRADING Holding Platform

Cinematic, multilingual experience for AMER TRADING Holding with CMS-driven content, Sanity Studio, Prisma/PostgreSQL backend, and enterprise admin tooling.

### Tech Stack

- **Frontend:** Next.js 15 App Router, React 18, TypeScript, TailwindCSS, shadcn/ui primitives, Framer Motion, GSAP, Lenis, next-themes
- **CMS:** Sanity v4 embedded at `/studio` (company, divisions, news, pages – EN/AR/FA)
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL, NextAuth (Google SSO)
- **Notifications:** Telegram, Email (Resend/SMTP), Slack webhooks
- **SEO & Performance:** next-seo defaults, sitemap/robots, OG tags, Vercel Analytics & Speed Insights

---

### 1. Environment Setup

1. Copy `.env.example` → `.env.local` and populate:

   - Database & Prisma: `DATABASE_URL`
   - Auth: `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, optional `ADMIN_ALLOWED_EMAILS`
   - Sanity: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_WEBHOOK_SECRET`
   - Notifications: Telegram bot/chat, Resend or SMTP credentials, Slack webhook
   - App URLs: `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`

2. Generate a strong `NEXTAUTH_SECRET` (`openssl rand -base64 32` recommended).

3. Install dependencies:

   ```bash
   npm install
   ```

---

### 2. Database

1. Update `DATABASE_URL` to your PostgreSQL connection string.
2. Apply schema & generate client:

   ```bash
   npm run db:generate
   npx prisma migrate dev --name init
   ```

3. (Optional) open Prisma Studio:

   ```bash
   npm run db:studio
   ```

---

### 3. Sanity CMS

1. Create a Sanity project (`sanity init`) and note the project ID & dataset (`production`).
2. Configure allowed CORS origins:
   ```
   http://localhost:3000
   https://amertrading.com
   https://*.amertrading.com
   ```
3. Create an API token with read + write access and place it in `.env`.
4. Deploy Studio (optional for hosted studio):

   ```bash
   npx sanity deploy
   ```

5. Seed multilingual starter content into Sanity:

   ```bash
   npm run seed:sanity
   ```

---

### 4. Notifications & Webhooks

- Point Sanity webhook (for types: `companyInfo`, `division`, `newsPost`, `page`) to:

  ```
  https://<your-domain>/api/sanity/webhook
  ```

- Use the `SANITY_WEBHOOK_SECRET` to sign requests (HMAC SHA-256).
- Configure Telegram bot, Slack incoming webhook, and Resend/SMTP creds in env.

---

### 5. Local Development

```bash
npm run dev
```

- App routes: `http://localhost:3000/en`, `/ar`, `/fa`
- Admin dashboard: `http://localhost:3000/admin/dashboard` (protected by NextAuth Google sign-in)
- Sanity Studio (embedded): `http://localhost:3000/studio`

---

### 6. Production Deployment (Vercel)

1. Push to GitHub and import the repo on Vercel.
2. Framework preset: **Next.js**
3. Build output: `.next`
4. Add all environment variables (match `.env.production`).
5. Create `vercel.json` (if not already) for rewrites/headers caching:

   ```json
   {
     "rewrites": [{ "source": "/studio/:path*", "destination": "/studio" }],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
       }
     ]
   }
   ```

6. Connect custom domains plus subdomains (`auto.amertrading.com`, etc.). Subdomain routing rewrites to the related division pages automatically.

---

### 7. Useful Scripts

| Command               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Start local dev server                           |
| `npm run build`       | Production build                                 |
| `npm run lint`        | ESLint check                                     |
| `npm run seed:sanity` | Seed Sanity sample content                       |
| `npm run db:generate` | Generate Prisma client                           |
| `npm run db:migrate`  | Deploy database migrations (prod / CI)           |
| `npm run db:studio`   | Launch Prisma Studio UI                          |

---

### 8. Directory Highlights

- `src/app/[locale]/**` — localized pages (home, about, divisions, news, contact)
- `src/app/admin/**` — admin auth, dashboard, notifications
- `src/app/api/**` — webhooks, contact form, auth
- `src/components/**` — UI building blocks, CMS-driven views, animation utilities
- `sanity/**` — standalone config, schemas, seed helpers
- `scripts/seed.ts` — Sanity seeding entrypoint
- `prisma/**` — Prisma schema & migrations

---

### 9. Next Steps / Customisation

- Update Sanity schemas with additional fields as divisions expand.
- Hook the performance panel to live Vercel Analytics/GA4 endpoints.
- Replace placeholder hero video with branded cinematic footage.
- Extend `SUBDOMAIN_MAP` (in `src/middleware.ts`) when new sub-brands launch.

Welcome to the AMER TRADING Holding platform — ready for cinematic storytelling, multilingual growth, and rapid expansion across industries.
