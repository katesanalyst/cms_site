# Primeform CMS — Architecture Document

## 1. System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     PRIMEFORM PLATFORM                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐     ┌─────────────────────────────┐    │
│  │   CMS Backend   │────▶│      PostgreSQL (Render)     │    │
│  │  (Next.js 16)   │     │      19 tables, all data     │    │
│  │  :3334 / Render │     └─────────────────────────────┘    │
│  └────────┬────────┘                                          │
│           │ REST API                                          │
│           ▼                                                   │
│  ┌─────────────────┐     ┌─────────────────────────────┐    │
│  │  Frontend (SSR) │────▶│      Netlify (SSR + CDN)     │    │
│  │  (Next.js 16)   │     │      primeagros.netlify.app  │    │
│  │  :3333 / Netlify│     └─────────────────────────────┘    │
│  └─────────────────┘                                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Current Deployment

| Service | Platform | URL | Status |
|---------|----------|-----|--------|
| CMS Backend | Render | https://primeagro-cms.onrender.com | ✅ Running |
| Frontend | Netlify | https://primeagros.netlify.app | ✅ Running |
| Database | Render PostgreSQL | (internal) | ✅ Running |
| Local Dev (CMS) | Docker | http://localhost:3334 | ✅ Running |
| Local Dev (Frontend) | Docker | http://localhost:3333 | ✅ Running |

---

## 3. CMS Data Models (19 tables)

| Model | Purpose | Records (Local) | Records (Render) |
|-------|---------|-----------------|------------------|
| Brand | Multi-brand support | — | — (not yet) |
| User | Admin auth | 1 | 1 |
| Page | Dynamic pages | 8 | 8 |
| Section | Page content sections | 21+ | 0 ⚠️ |
| Hero | Page hero/banner | 8 | 8 |
| FarmProduct | Product catalog | 5 | 0 ❌ |
| FarmLand | Farmland listings | 3 | 0 ❌ |
| Testimonial | Customer reviews | 3 | 3 |
| TeamMember | Team directory | 3 | 3 |
| GalleryItem | Photo/video gallery | 15 | 0 ❌ |
| BlogPost | Blog articles | 6 | 0 ❌ |
| Service | Services offered | 4 | 0 ❌ |
| Faq | FAQs | 5 | 5 |
| SiteSetting | Key-value config | 47 | 47 |
| Navigation | Menu items | 7 | 7 |
| FooterSection | Footer content | 4 | 4 |
| Lead | Contact leads | 0 | 0 |
| Media | Uploaded files | 0 | 0 |
| SeoMeta | SEO metadata | 0 | 0 |
| NewsletterSubscriber | Email subscribers | 0 | 0 |

---

## 4. Local vs Staging Comparison

### 4.1 Critical Issues (Data Missing on Staging)

| Issue | Page | Impact | Root Cause |
|-------|------|--------|------------|
| **Farmlands show "Coming Soon"** | /farmlands | Users see no farm listings | `/api/lands` returns `[]` — 0 records |
| **Gallery empty** | /gallery | No photos/videos shown | `/api/gallery` returns `[]` — 0 records |
| **Blog empty** | /blog | No articles shown | `/api/blog` returns `[]` — 0 records |
| **Homepage sections missing** | / | No Farming Focus, Stats, Process, CTA | `sections: []` in homepage page data |
| **Farmlands sections missing** | /farmlands | No overview section | `sections: []` in farmlands page data |
| **Gallery sections missing** | /gallery | No intro/CTA sections | `sections: []` in gallery page data |
| **Contact FAQ missing** | /contact | No FAQ section rendered | FAQ items exist in DB but section data mismatch |

### 4.2 Content Differences (Data Seeded Differently)

| Page | Section | Local Content | Staging Content |
|------|---------|---------------|-----------------|
| **About** | Story | "Prime Agro Farms is a forward-thinking..." | "Since 1992, we have believed..." |
| **About** | Vision | Sustainability, Transparency, Quality | Zero Chemical, Solar-Powered, Community First |
| **About** | Team | "The hands that tend the hives..." | "Led by farmers. Powered by purpose." |
| **Contact** | Heading | "Write to us. We read every word." | "We are always happy to talk..." |
| **Gallery** | Heading | 📷 Gallery | 🌿 Gallery |
| **Blog** | Heading | 📝 Blog | 🌿 Blog |
| **Homepage** | Sustainability | "Harnessing the power of the sun..." | "At Prime Agro Farms, sustainability..." |
| **Homepage** | CTA | "Connect with us today..." | "Ready to invest in sustainable agriculture?" |

### 4.3 Code Issues

| Issue | Location | Fix Required |
|-------|----------|--------------|
| **Blog link missing in nav** | CMS Navigation table | Add Blog nav item to Render DB |
| **Doubled emojis in Farming Focus** | Frontend FeatureCard | Check resolveIcon() logic |

---

## 5. Root Cause Analysis

```
Local Database (SQLite)          Render Database (PostgreSQL)
┌──────────────────────┐         ┌──────────────────────┐
│ ✅ 8 pages            │         │ ✅ 8 pages            │
│ ✅ 8 heroes           │         │ ✅ 8 heroes           │
│ ✅ 21+ sections       │   ≠     │ ❌ 0 sections         │
│ ✅ 3 farmlands        │         │ ❌ 0 farmlands        │
│ ✅ 15 gallery items   │         │ ❌ 0 gallery items    │
│ ✅ 6 blog posts       │         │ ❌ 0 blog posts       │
│ ✅ 5 services         │         │ ❌ 0 services         │
│ ✅ 47 settings        │         │ ✅ 47 settings        │
│ ✅ 7 nav items        │         │ ✅ 7 nav items        │
│ ✅ 4 footer sections  │         │ ✅ 4 footer sections  │
│ ✅ 3 testimonials     │         │ ✅ 3 testimonials     │
│ ✅ 3 team members     │         │ ✅ 3 team members     │
│ ✅ 5 FAQs             │         │ ✅ 5 FAQs             │
└──────────────────────┘         └──────────────────────┘

The seed scripts (seed.cjs) run on container startup and seed:
  → Settings, Pages, Heroes, Nav, Footer, Testimonials, Team, FAQs

But these scripts DO NOT seed:
  → Sections, Farmlands, Gallery, Blog, Services, Products
```

---

## 6. API Endpoints Reference

### Public Endpoints (no auth)

| Method | Endpoint | Returns | Used By |
|--------|----------|---------|---------|
| GET | `/api/settings` | All site settings (key-value) | Layout, all pages |
| GET | `/api/navigation` | Published nav items | Header |
| GET | `/api/footer` | Published footer sections | Footer |
| GET | `/api/pages/{slug}` | Page + sections + hero | All dynamic pages |
| GET | `/api/testimonials` | All testimonials | Homepage carousel |
| GET | `/api/lands` | All farmlands | /farmlands |
| GET | `/api/gallery` | All gallery items | /gallery |
| GET | `/api/blog` | All blog posts | /blog |
| GET | `/api/faqs` | All FAQs | /farming-focus, /contact |
| GET | `/api/products` | All products | (available) |
| GET | `/api/services` | All services | (available) |
| GET | `/api/team` | All team members | /about |
| POST | `/api/leads` | Submit lead | Contact form |
| POST | `/api/newsletter` | Subscribe | Footer newsletter |

### Admin Endpoints (auth required)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST/GET/PUT/DELETE | `/api/admin/pages/[id]` | Page CRUD |
| POST/GET/PUT/DELETE | `/api/admin/heroes/[id]` | Hero CRUD |
| POST/GET/PUT/DELETE | `/api/admin/sections/[id]` | Section CRUD |
| POST/GET/PUT/DELETE | `/api/admin/lands/[id]` | Farmland CRUD |
| POST/GET/PUT/DELETE | `/api/admin/gallery/[id]` | Gallery CRUD |
| POST/GET/PUT/DELETE | `/api/admin/blog/[id]` | Blog CRUD |
| POST/GET/PUT/DELETE | `/api/admin/products/[id]` | Product CRUD |
| POST/GET/PUT/DELETE | `/api/admin/services/[id]` | Service CRUD |
| POST/GET/PUT/DELETE | `/api/admin/faqs/[id]` | FAQ CRUD |
| POST/GET/PUT/DELETE | `/api/admin/team/[id]` | Team CRUD |
| POST/GET/PUT/DELETE | `/api/admin/testimonials/[id]` | Testimonial CRUD |
| PUT | `/api/settings` | Batch update settings |
| POST | `/api/upload` | File upload |

---

## 7. Frontend Data Flow

```
Request: GET https://primeagros.netlify.app/farmlands
         │
         ▼
┌─────────────────────────┐
│ Next.js SSR (Netlify)   │
│ export async function   │
│ FarmlandsPage()         │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ fetchFarmLands()        │──▶ GET CMS_URL/api/lands
│ fetchSiteSettings()     │──▶ GET CMS_URL/api/settings
│ fetchPageBySlug()       │──▶ GET CMS_URL/api/pages/farmlands
│ fetchNavigation()       │──▶ GET CMS_URL/api/navigation
│ fetchFooterSections()   │──▶ GET CMS_URL/api/footer
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Render CMS API          │
│ PostgreSQL queries      │
│ (brandId filtering)     │ ← NOT YET IMPLEMENTED
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Response HTML rendered  │
│ with CMS data or        │
│ fallback defaults       │
└─────────────────────────┘
```

---

## 8. Multi-Brand Architecture (Planned)

### 8.1 Database Changes

```prisma
model Brand {
  id              String   @id @default(cuid())
  name            String                   // "Prime Agro Farms"
  slug            String   @unique         // "primeagro"
  subdomain       String?  @unique         // "primeagro"
  domain          String?  @unique         // "primeagro.com"
  logo            String?
  favicon         String?
  description     String?
  primaryColor    String   @default("#3a6b35")
  secondaryColor  String   @default("#d4a853")
  accentColor     String   @default("#faf8f5")
  fontHeading     String   @default("Playfair Display")
  fontBody        String   @default("Inter")
  industry        String?                  // "agriculture", "real-estate"
  aiContext       String?
  published       Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ALL existing models get brandId FK
model Page {
  brandId        String
  brand          Brand    @relation(fields: [brandId], references: [id])
  slug           String
  @@unique([brandId, slug])
}
```

### 8.2 Brand Resolution

```
Request: primeagro.example.com/about
         │
         ▼
1. Extract subdomain: "primeagro"
2. Lookup Brand WHERE subdomain = "primeagro"
3. Set brandId in request context
4. All queries filter by brandId
5. Apply brand theme (colors, fonts, logo)
```

### 8.3 Admin Panel Enhancement

```
┌─────────────────────────────────────────────┐
│  CMS Admin Dashboard                         │
│  ┌─────────┐                                 │
│  │ Brand ▼ │  ← Brand selector dropdown      │
│  └─────────┘                                 │
│                                              │
│  Sidebar:                                    │
│  ├── Dashboard (brand-scoped)                │
│  ├── Brands (manage all brands)              │
│  ├── Pages (brand-scoped)                    │
│  ├── Heroes                                  │
│  ├── Sections                                │
│  ├── Templates ← NEW: page template library  │
│  ├── Products                                │
│  ├── Farmlands                               │
│  ├── Blog                                    │
│  ├── Gallery                                 │
│  ├── Testimonials                            │
│  ├── Team                                    │
│  ├── Services                                │
│  ├── FAQs                                    │
│  ├── Leads                                   │
│  ├── SEO                                     │
│  ├── Media                                   │
│  ├── Navigation                              │
│  ├── Footer                                  │
│  ├── Settings (brand-specific)               │
│  └── AI Studio ← NEW: content generation     │
└─────────────────────────────────────────────┘
```

### 8.4 Template System

| Template | Industry | Sections |
|----------|----------|----------|
| `agri-home` | Agriculture | Hero, Features, Sustainability, Stats, Testimonials, CTA |
| `agri-product` | Agriculture | Hero, Product Detail, Benefits, Related, FAQ |
| `realestate-home` | Real Estate | Hero, Search, Featured Listings, Stats, Testimonials, CTA |
| `realestate-listing` | Real Estate | Hero, Property Gallery, Details, Nearby, Contact Form |
| `builders-home` | Construction | Hero, Services, Projects, Process, Testimonials, CTA |
| `minimal` | Any | Hero, Content, CTA |

### 8.5 URL Structure

```
Current (single brand):
  primeagros.netlify.app/about
  primeagros.netlify.app/contact

Planned (multi-brand):
  primeagro.site.com/about        ← Prime Agro Farms
  primerealty.site.com/about      ← Prime Reality
  primebuilders.site.com/about    ← Prime Builders

  OR with custom domains:
  primeagro.com/about
  primerealty.com
  primebuilders.in
```

---

## 9. Fix Plan: Local vs Staging

### Phase 1: Seed Render Database (Immediate Fix)

Run these scripts against Render PostgreSQL:

```bash
# 1. Seed sections (homepage, farmlands, gallery, about, contact, etc.)
node seed-sections.cjs

# 2. Seed content (blog posts, gallery items, farmlands, products, services)
node seed-content.cjs

# 3. Seed section items (about vision/values, contact info, farmlands overview)
node seed-section-content.cjs

# 4. Add Blog nav item
# (manual or script)
```

### Phase 2: Fix Code Issues

| Fix | File | Change |
|-----|------|--------|
| Blog nav link | CMS Navigation seed | Add Blog item with order=6 |
| Doubled emojis | Frontend resolveIcon() | Check for double-mapping |

### Phase 3: Verify All Pages

After seeding, verify:
- [ ] Homepage: Hero video, Farming Focus cards, Sustainability, Stats, Testimonials, Gallery, CTA
- [ ] About: Story, Vision, Values, Team
- [ ] Contact: Heading, Contact cards, FAQ section
- [ ] Farmlands: Overview, 3 farm listings with images
- [ ] Farming Focus: Sections, FAQ items
- [ ] Sustainability: All sections
- [ ] Gallery: 15 items, categories, intro/CTA
- [ ] Blog: 6 posts, categories
- [ ] Navigation: Blog link present
- [ ] Footer: All sections
- [ ] All pages: Favicon

---

## 10. Security Considerations

| Issue | Location | Fix |
|-------|----------|-----|
| Newsletter API has no auth | `/api/newsletter` GET | Add admin auth check |
| No rate limiting on lead submission | `/api/leads` POST | Add rate limiting |
| No CSRF protection | All POST endpoints | Add CSRF tokens |
| No input validation | All API routes | Add Zod validation |
| JSON strings in DB columns | Section items, Hero buttons | Migrate to JSON columns |

---

## 11. Future Enhancements

### Short Term (1-2 weeks)
- [ ] Fix staging data (seed Render database)
- [ ] Add favicon
- [ ] Fix stats counter hydration issue
- [ ] Add Blog nav link to staging

### Medium Term (1-2 months)
- [ ] Multi-brand schema + Brand model
- [ ] Brand resolution middleware
- [ ] Admin brand switcher
- [ ] Per-brand theme customization
- [ ] Template system

### Long Term (3-6 months)
- [ ] Drag-and-drop page builder
- [ ] AI content generation per brand
- [ ] A/B testing
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] WhatsApp CRM integration
- [ ] Invoice/booking system
- [ ] White-label embed

---

## 12. Environment Variables

### CMS Backend (Render)
```
DATABASE_URL=postgresql://... (Render PostgreSQL)
NEXTAUTH_SECRET=primeagro-cms-production-secret-change-me
NEXTAUTH_URL=https://primeagro-cms.onrender.com
PORT=3334
```

### Frontend (Netlify)
```
CMS_URL=https://primeagro-cms.onrender.com
```

### Local Docker
```
DATABASE_URL=file:/app/data/dev.db
NEXTAUTH_SECRET=primeagro-cms-secret-change-in-production
NEXTAUTH_URL=http://localhost:3334
CMS_URL=http://cms:3334
```

---

*Document generated: 2026-06-16*
*Version: 1.0*
