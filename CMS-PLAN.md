# Prime Agro Farms — CMS Architecture Plan

## Overview

A self-hosted CMS that controls the **entire** Prime Agro Farms website. Every page section, every piece of text, every image, every hero — all editable from the admin panel. AI-powered SEO optimization via OpenRouter free models.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **CMS Backend** | Next.js 16 + Prisma + SQLite + NextAuth |
| **Frontend** | Next.js 16 (static export) + Tailwind CSS v4 |
| **Rich Text Editor** | TipTap (ProseMirror-based, email-style editing) |
| **AI Integration** | OpenRouter API (free models) |
| **Deployment** | Docker Compose (frontend :3333, CMS :3334) |
| **Database** | SQLite (persistent via Docker volume) |

---

## Design System (Matching Current Site)

### Fonts (Google Fonts)
| Token | Font | CSS Variable |
|-------|------|-------------|
| `font-sans` | Inter | `--font-sans` |
| `font-serif` | Playfair Display | `--font-serif` |

### Colors
| Token | Hex | Purpose |
|-------|-----|---------|
| `--color-primary` | `#3a6b35` | Main green |
| `--color-primary-dark` | `#2d5a27` | Darker green |
| `--color-primary-light` | `#4a8b45` | Lighter green |
| `--color-secondary` | `#6b4e3d` | Earthy brown |
| `--color-accent` | `#d4a853` | Gold accent |
| `--color-cream` | `#faf8f5` | Page background |
| `--color-text` | `#2c2c2c` | Primary text |
| `--color-text-light` | `#6b6b6b` | Secondary text |
| `--color-border` | `#e8e4dc` | Borders |

### CMS Admin Theme
- Same green/cream/gold palette
- Inter font for UI, Playfair Display for previews
- Dark sidebar with green accent
- Clean, minimal design

---

## CMS Admin Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🌿 Prime Agro CMS    [Search ⌘K]    [🔔] [👤 Admin ▾]    │
├──────┬──────────────────────────────────────────────────────┤
│      │  Breadcrumb: Pages > Homepage > Hero Section         │
│  S   │──────────────────────────────────────────────────────│
│  I   │                                                      │
│  D   │  ┌────────────────────────────────────────────────┐ │
│  E   │  │  Content Editor Area                           │ │
│  B   │  │                                                │ │
│  A   │  │  (Rich text editor, forms, media uploads)      │ │
│  R   │  │                                                │ │
│      │  │                                                │ │
│      │  └────────────────────────────────────────────────┘ │
│      │                                                      │
│      │  ┌────────────────────────────────────────────────┐ │
│      │  │  AI Panel (slide-out)                          │ │
│      │  │  Meta tags, SEO score, alt text suggestions    │ │
│      │  └────────────────────────────────────────────────┘ │
├──────┴──────────────────────────────────────────────────────┤
│  Auto-save ✓    Last edit: 2 min ago    [Publish] [Preview]│
└─────────────────────────────────────────────────────────────┘
```

### Sidebar Navigation

```
┌──────────────┐
│  🏠 Dashboard │
│──────────────│
│  📄 Pages     │  ← Section builder per page
│  🎬 Heroes    │  ← Hero editor (image/video)
│──────────────│
│  ✍️ Blog      │
│  🌾 Products  │
│  🏞️ Farmlands │
│──────────────│
│  ⭐ Testimonials│
│  👥 Team      │
│  🖼️ Gallery   │
│  ❓ FAQs      │
│──────────────│
│  📨 Leads     │
│  🔍 SEO       │  ← AI-powered
│  📁 Media     │
│──────────────│
│  🧭 Navigation│
│  📎 Footer    │
│  ⚙️ Settings  │
└──────────────┘
```

---

## Database Schema (Prisma)

### Core Content Models

```prisma
// Pages - each page has sections
model Page {
  id            String   @id @default(cuid())
  slug          String   @unique
  title         String
  metaTitle     String?
  metaDescription String?
  ogImage       String?
  published     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  sections      Section[]
  hero          Hero?
}

// Sections - content blocks within pages
model Section {
  id            String   @id @default(cuid())
  pageId        String
  page          Page     @relation(fields: [pageId], references: [id])
  type          String   // "story", "cards", "stats", "cta", "faq", "form", "gallery-preview", "testimonials"
  title         String?
  badge         String?
  badgeIcon     String?
  heading       String?
  italicWords   String?  // JSON array
  text          String?  // Rich text HTML content
  align         String   @default("left")
  light         Boolean  @default(false)
  order         Int      @default(0)
  items         String?  // JSON array of child items (cards, stats, steps, etc.)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Heroes - per-page hero sections
model Hero {
  id            String   @id @default(cuid())
  pageId        String   @unique
  page          Page     @relation(fields: [pageId], references: [id])
  tag           String?
  heading       String
  subheading    String?
  text          String?
  bgType        String   @default("image") // "image", "video", "gradient"
  bgImage       String?
  videoUrl      String?
  videoType     String?  // "youtube", "vimeo", "mp4"
  videoPoster   String?
  overlayOpacity Int     @default(40)
  textColor     String   @default("white")
  textAlign     String   @default("left")
  buttons       String?  // JSON array of {text, href, variant}
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Collection Models

```prisma
model BlogPost {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  excerpt         String?
  content         String?  // Rich text HTML
  category        String?
  featuredImage   String?
  metaTitle       String?
  metaDescription String?
  published       Boolean  @default(false)
  publishedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Product {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  description     String?  // Rich text HTML
  shortDescription String?
  price           String?
  category        String?
  images          String?  // JSON array of image URLs
  features        String?  // JSON array
  metaTitle       String?
  metaDescription String?
  published       Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Land {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  location        String
  totalAcreage    Float
  soilType        String?
  irrigationType  String?
  pricePerAcre    Float
  totalPrice      Float
  status          String   @default("Available")
  featuredImage   String?
  gallery         String?  // JSON array
  videoUrl        String?
  videoType       String?
  features        String?  // JSON array of {title}
  description     String?  // Rich text HTML
  metaTitle       String?
  metaDescription String?
  published       Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Testimonial {
  id          String   @id @default(cuid())
  clientName  String
  location    String?
  rating      String
  text        String
  photo       String?
  published   Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
}

model TeamMember {
  id          String   @id @default(cuid())
  name        String
  role        String
  department  String?
  bio         String?  // Rich text HTML
  photo       String?
  published   Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
}

model GalleryItem {
  id              String   @id @default(cuid())
  title           String
  mediaType       String   @default("image")
  image           String?
  videoUrl        String?
  videoPoster     String?
  caption         String?
  category        String?
  altText         String?  // AI-generated
  published       Boolean  @default(true)
  order           Int      @default(0)
  createdAt       DateTime @default(now())
}

model FAQ {
  id          String   @id @default(cuid())
  question    String
  answer      String   // Rich text HTML
  category    String?
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model Lead {
  id          String   @id @default(cuid())
  name        String
  phone       String
  email       String?
  interest    String?
  location    String?
  budget      String?
  message     String?
  source      String   @default("contact")
  status      String   @default("new")
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Media {
  id          String   @id @default(cuid())
  filename    String
  url         String
  mimeType    String
  size        Int
  altText     String?  // AI-generated
  createdAt   DateTime @default(now())
}
```

### Settings & Navigation

```prisma
model Setting {
  id              String   @id @default(cuid())
  key             String   @unique
  value           String?  // Rich text or plain text
  type            String   @default("text") // "text", "image", "json", "richtext"
  group           String   @default("general")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Navigation {
  id          String   @id @default(cuid())
  label       String
  url         String
  order       Int      @default(0)
  parentId    String?
  parent      Navigation? @relation("NavParent", fields: [parentId], references: [id])
  children    Navigation[] @relation("NavParent")
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model FooterSection {
  id          String   @id @default(cuid())
  type        String   // "brand", "quick-links", "services", "contact"
  title       String?
  items       String   // JSON array
  order       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}
```

### SEO Model

```prisma
model SeoMeta {
  id              String   @id @default(cuid())
  pageType        String   @unique  // "homepage", "about", "blog-123", etc.
  title           String?
  description     String?
  keywords        String?
  ogImage         String?
  structuredData  String?  // JSON-LD
  canonical       String?
  aiGenerated     Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## Settings Keys (Key-Value Store)

| Key | Group | Type | Purpose |
|-----|-------|------|---------|
| `logo` | general | image | Site logo |
| `companyName` | general | text | Company name |
| `tagline` | general | text | Tagline |
| `phone` | contact | text | Phone number |
| `whatsapp` | contact | text | WhatsApp number |
| `email` | contact | text | Email address |
| `address` | contact | richtext | Full address |
| `workingHours` | contact | text | Working hours |
| `facebookUrl` | social | text | Facebook URL |
| `instagramUrl` | social | text | Instagram URL |
| `youtubeUrl` | social | text | YouTube URL |
| `linkedinUrl` | social | text | LinkedIn URL |
| `copyrightText` | footer | text | Copyright text |
| `heroTag` | homepage | text | Hero badge text |
| `heroHeading` | homepage | richtext | Hero heading |
| `heroText` | homepage | richtext | Hero subtitle |
| `heroImage` | homepage | image | Hero background image |
| `anjeeraImage` | homepage | image | Anjeera card image |
| `dehydratedImage` | homepage | image | Dehydrated card image |
| `mangoImage` | homepage | image | Mango card image |
| `sustainText` | homepage | richtext | Sustainability text |
| `sustainImage` | homepage | image | Sustainability image |
| `ctaText` | homepage | richtext | CTA banner text |

---

## Rich Text Editor (TipTap)

### Features
- **Basic formatting**: Bold, italic, underline, strikethrough
- **Headings**: H1-H6
- **Lists**: Ordered, unordered, task lists
- **Links**: Internal and external
- **Images**: Inline images with upload
- **Tables**: Basic table support
- **Code blocks**: For technical content
- **Blockquotes**: For testimonials/quotes
- **Email-style**: Clean, email-compatible HTML output

### Where Used
- Blog post content
- Product descriptions
- Land descriptions
- Team member bios
- FAQ answers
- Section text content
- Address/contact info
- Any multi-line text field

### CMS Field Types

| Field Type | Editor | Usage |
|-----------|--------|-------|
| `text` | Input field | Titles, names, short text |
| `richtext` | TipTap editor | Content, descriptions, bios |
| `image` | Upload + crop | Photos, backgrounds |
| `json` | JSON editor / structured form | Features, buttons, gallery |
| `select` | Dropdown | Categories, status |
| `number` | Number input | Prices, acreage |
| `boolean` | Toggle switch | Published, featured |

---

## AI Integration (OpenRouter)

### Free Models

| Model | ID | Use Case |
|-------|----|----------|
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct:free` | Meta titles, descriptions, keywords |
| DeepSeek Chat V3 | `deepseek/deepseek-chat-v3-0324:free` | JSON-LD schema, structured data |
| Gemma 3 27B | `google/gemma-3-27b-it:free` | Image alt text (vision) |

### AI Features

| Feature | Trigger | Endpoint |
|---------|---------|----------|
| Generate meta title + description | On content save | `POST /api/ai/meta` |
| Generate Open Graph tags | On content save | `POST /api/ai/meta` |
| Generate JSON-LD schema | Manual trigger | `POST /api/ai/schema` |
| Generate image alt text | On image upload | `POST /api/ai/alt-text` |
| SEO score analysis | Manual trigger | `POST /api/ai/seo-score` |
| Content readability check | Manual trigger | `POST /api/ai/readability` |

### AI API Endpoints

```typescript
// Generate meta tags for a page
POST /api/ai/meta
Body: { pageType: string, content: string, keywords?: string }
Response: { title: string, description: string, keywords: string[] }

// Generate alt text for an image
POST /api/ai/alt-text
Body: { imageUrl: string, context?: string }
Response: { altText: string }

// Generate JSON-LD structured data
POST /api/ai/schema
Body: { pageType: string, data: any }
Response: { structuredData: object }

// Analyze SEO score
POST /api/ai/seo-score
Body: { title: string, description: string, content: string, keywords: string[] }
Response: { score: number, issues: string[], suggestions: string[] }
```

---

## API Endpoints

### Public (No Auth)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/pages/[slug]` | Fetch page with sections |
| GET | `/api/hero/[pageId]` | Fetch hero for a page |
| GET | `/api/navigation` | Fetch nav links |
| GET | `/api/footer` | Fetch footer sections |
| GET | `/api/settings` | Fetch all settings |
| GET | `/api/blog` | List published posts |
| GET | `/api/blog/[slug]` | Single blog post |
| GET | `/api/products` | List published products |
| GET | `/api/products/[slug]` | Single product |
| GET | `/api/lands` | List published lands |
| GET | `/api/lands/[slug]` | Single land |
| GET | `/api/testimonials` | List testimonials |
| GET | `/api/team` | List team members |
| GET | `/api/gallery` | List gallery items |
| GET | `/api/faqs` | List FAQs |
| POST | `/api/leads` | Submit form |

### Admin (Auth Required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET/POST/PUT/DELETE | `/api/admin/pages` | Pages CRUD |
| GET/POST/PUT/DELETE | `/api/admin/sections` | Sections CRUD |
| GET/PUT | `/api/admin/hero` | Hero CRUD |
| GET/POST/PUT/DELETE | `/api/admin/blog` | Blog CRUD |
| GET/POST/PUT/DELETE | `/api/admin/products` | Products CRUD |
| GET/POST/PUT/DELETE | `/api/admin/lands` | Lands CRUD |
| GET/POST/PUT/DELETE | `/api/admin/testimonials` | Testimonials CRUD |
| GET/POST/PUT/DELETE | `/api/admin/team` | Team CRUD |
| GET/POST/PUT/DELETE | `/api/admin/gallery` | Gallery CRUD |
| GET/POST/PUT/DELETE | `/api/admin/faqs` | FAQs CRUD |
| GET/PUT | `/api/admin/leads` | Leads management |
| GET/PUT | `/api/admin/settings` | Settings update |
| GET/POST/PUT/DELETE | `/api/admin/navigation` | Nav CRUD |
| GET/POST/PUT/DELETE | `/api/admin/footer` | Footer CRUD |
| GET/PUT | `/api/admin/seo` | SEO meta CRUD |
| POST | `/api/admin/media/upload` | Upload media |
| POST | `/api/ai/*` | AI endpoints |

---

## Frontend Pages (Static Export)

All pages read from CMS API at build time (or ISR):

| Page | Route | Hero | Sections |
|------|-------|------|----------|
| Homepage | `/` | Image/Video | Farming Focus, Sustainability, Stats, Process, Testimonials, Gallery, CTA |
| About | `/about` | Image/Video | Story, Values, Team |
| Farming Focus | `/farming-focus` | Image/Video | Price Banner, Benefits, Why Us, Form, FAQs, CTA |
| Sustainability | `/sustainability` | Image/Video | Solar, Cards, Stats, CTA |
| Farmlands | `/farmlands` | Image/Video | Land Listings |
| Gallery | `/gallery` | Image/Video | Filter Bar, Grid, Video Modal |
| Blog | `/blog` | Image/Video | Filter Bar, Post Grid |
| Blog Post | `/blog/[slug]` | Image/Video | Post Content |
| Contact | `/contact` | Image/Video | Form, Info, FAQs |

---

## Implementation Phases

### Phase 1: Database & API (Current)
- [x] Prisma schema with all models
- [x] Database seeding
- [x] Auth (NextAuth)
- [x] Basic CRUD API endpoints
- [x] Docker setup

### Phase 2: CMS Admin UI
- [ ] Dashboard with overview
- [ ] Pages editor with section builder
- [ ] Hero editor (image/video/bg type)
- [ ] Rich text editor (TipTap) integration
- [ ] Media library with upload
- [ ] All CRUD pages (Blog, Products, Lands, etc.)
- [ ] Settings manager
- [ ] Navigation editor
- [ ] Footer editor

### Phase 3: AI Integration
- [ ] OpenRouter API client
- [ ] Meta tag generation
- [ ] Image alt text generation
- [ ] JSON-LD schema generation
- [ ] SEO score analyzer
- [ ] AI panel in admin UI

### Phase 4: Frontend Integration
- [ ] Connect all pages to CMS API
- [ ] Hero component with image/video support
- [ ] Section renderer (dynamic content blocks)
- [ ] Rich text rendering
- [ ] SEO meta tags from CMS
- [ ] Structured data injection

### Phase 5: Polish & Deploy
- [ ] Auto-save functionality
- [ ] Image optimization
- [ ] Caching strategy
- [ ] Error handling
- [ ] Mobile responsive admin
- [ ] Final testing

---

## File Structure

```
primeagro-cms/
├── app/
│   ├── (admin)/admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── sidebar.tsx         # Navigation sidebar
│   │   ├── dashboard/
│   │   ├── pages/
│   │   ├── heroes/
│   │   ├── blog/
│   │   ├── products/
│   │   ├── lands/
│   │   ├── testimonials/
│   │   ├── team/
│   │   ├── gallery/
│   │   ├── faqs/
│   │   ├── leads/
│   │   ├── seo/
│   │   ├── media/
│   │   ├── navigation/
│   │   ├── footer/
│   │   └── settings/
│   ├── (auth)/admin/login/
│   ├── api/
│   │   ├── admin/              # Admin CRUD endpoints
│   │   ├── ai/                 # AI integration endpoints
│   │   ├── pages/
│   │   ├── blog/
│   │   ├── products/
│   │   ├── lands/
│   │   ├── testimonials/
│   │   ├── team/
│   │   ├── gallery/
│   │   ├── faqs/
│   │   ├── leads/
│   │   ├── navigation/
│   │   ├── footer/
│   │   ├── settings/
│   │   ├── media/
│   │   └── upload/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── editor/                 # Rich text editor components
│   ├── forms/                  # Form components
│   └── ai/                     # AI panel components
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── actions.ts
│   └── ai.ts                   # OpenRouter client
├── prisma/
│   └── schema.prisma
└── public/uploads/
```
