# Getting Started with the HubSpot Hiring Landing Page

## Quick Start (5 minutes)

### 1. Start PostgreSQL
```bash
docker-compose up -d
```

Verify it's running:
```bash
docker-compose ps
```

You should see `lp_postgres` running on port 5432.

### 2. Run Database Migration
```bash
npx prisma migrate dev --name init
```

This creates the `Lead` table in your database. When prompted, press `Enter` to create the migration.

### 3. Start Development Server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

You'll be redirected to the landing page at `/lp/hire-hubspot-developers`.

## What You'll See

✅ **Full landing page** with 13 sections:
- Hero (animated developer card)
- Logo Marquee
- Process flow
- Tool Orbit animation
- Services (sticky sidebar)
- Developer Carousel
- Testimonials
- Results
- Pricing
- About Ritesh
- Free Resources
- FAQ
- Closing CTA

✅ **Form modal** – Click any "Hire" or "Get Matched" button to test the form
✅ **Thank-you page** – Form submits open `/thank-you` in a new tab
✅ **Sticky header** – Appears after scrolling 80px

## Testing the Form

1. **Click "Hire a HubSpot Developer"** in the hero section
2. **Fill in the form:**
   - Full Name: `John Doe`
   - Work Email: `john@company.com` (must not be gmail/yahoo/hotmail/outlook/icloud/aol)
   - Company Website: `company.com`
   - HubSpot Need: (optional)
3. **Submit**

The form will:
- Validate client-side (zod)
- Post to `/api/lead` (server validation + rate limiting)
- Save to PostgreSQL
- Open thank-you page in new tab
- Close modal on original tab

## View Submitted Leads

```bash
npx prisma studio
```

This opens Prisma's data browser on [http://localhost:5555](http://localhost:5555).

Browse the `Lead` table to see all submissions.

## Stopping Services

```bash
# Stop PostgreSQL
docker-compose down

# Stop development server
Ctrl+C
```

## Environment Variables

Located in `.env.local` (already configured):

```
DATABASE_URL="postgresql://lp_user:lp_pass@localhost:5432/lp_hubspot"
LEAD_SALT="xK9mP2qL5nR8vT3wY6sF1jD4aB7cE0gH"
NEXT_PUBLIC_SITE_URL="https://hire.sdtcdigital.com"
```

For production, update `DATABASE_URL` to your hosted database (Neon, AWS RDS, etc.).

## Common Issues

### "Cannot connect to database"
- Verify Docker is running: `docker-compose ps`
- Check PostgreSQL logs: `docker-compose logs postgres`
- Restart: `docker-compose down && docker-compose up -d`

### "Prisma client not found"
```bash
npx prisma generate
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

Then open [http://localhost:3001](http://localhost:3001).

### "Images not loading"
The landing page uses Unsplash placeholder images. They may take a moment to load.

## Customization

### Update Brand Colors
Edit `app/globals.css` under `@theme` section (lines 3–20):

```css
--color-brand-teal: rgb(13 207 207 / <alpha-value>);
/* Change this RGB value to your brand color */
```

### Update Copy
Edit section files in `components/sections/`:
- `Hero.tsx` – Main headline and description
- `About Ritesh.tsx` – Team bios
- `Pricing.tsx` – Plan names and pricing
- etc.

### Add/Remove Sections
Edit `app/(marketing)/lp/hire-hubspot-developers/page.tsx` to import/remove sections.

### Update External Links
Find and replace:
- `https://insightstap.com` → your domain
- `hello@insightstap.com` → your email

## Next Steps

1. **Replace placeholder images:**
   - Services: Update image URLs from Unsplash
   - Results: Update gradient backgrounds
   - Resources: Replace case study thumbnails

2. **Add Satoshi fonts:**
   - Download from FontShare or similar
   - Place in `/public/fonts/`
   - Already set up in `app/layout.tsx`

3. **Deploy:**
   - Push to GitHub
   - Connect to Coolify/Vercel
   - Set production env vars

4. **Connect to analytics:**
   - Form submissions are logged to PostgreSQL
   - Add Google Analytics or Segment
   - Track form completion rate

## File Structure

```
├── app/
│   ├── (marketing)/lp/hire-hubspot-developers/page.tsx  ← Main landing page
│   ├── thank-you/page.tsx                               ← Thank-you page
│   ├── api/lead/route.ts                                ← Form API
│   ├── globals.css                                      ← Design tokens
│   └── layout.tsx
├── components/
│   ├── sections/                                        ← 13 page sections
│   ├── ui/                                              ← Button, Modal, Form
│   ├── motion/                                          ← Animations
│   ├── Header.tsx                                       ← Sticky nav
│   ├── Footer.tsx
│   └── providers.tsx                                    ← Modal wrapper
├── hooks/                                               ← useLeadModal, etc.
├── lib/
│   ├── prisma.ts                                        ← DB client
│   ├── validation.ts                                    ← Zod schemas
│   └── utils.ts
├── prisma/
│   ├── schema.prisma                                    ← Database schema
│   └── migrations/
├── docker-compose.yml                                   ← Local PostgreSQL
└── README.md                                            ← Full docs
```

## Questions?

See `README.md` for deployment, architecture, and troubleshooting.

---

**You're all set! Open [http://localhost:3000](http://localhost:3000) and explore the landing page.** 🚀
