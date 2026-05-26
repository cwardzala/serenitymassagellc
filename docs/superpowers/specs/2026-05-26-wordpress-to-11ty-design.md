# Serenity Massage LLC — WordPress to 11ty Conversion

## Overview

Convert the WordPress site at serenitymassagellc.com to a static 11ty (Eleventy) site. The site is a small business site for a massage therapy practice in North Olmsted, OH with 11 pages. The conversion preserves all content while giving it a modern design refresh.

## Content Inventory

| Page | Source URL | Target Path |
|------|-----------|-------------|
| Homepage | `/` | `src/index.md` |
| About | `/about/` | `src/about.md` |
| Contact Us | `/contact-us/` | `src/contact.md` |
| Massage Menu (Pricing) | `/massage-menu/` | `src/massage-menu.md` |
| Therapeutic Massage | `/cleveland-therapeutic/` | `src/services/therapeutic.md` |
| Deep Tissue Massage | `/cleveland-therapeutic/deep-tissue-massage/` | `src/services/deep-tissue.md` |
| Neuro-Muscular | `/cleveland-therapeutic/neuro-muscular/` | `src/services/neuro-muscular.md` |
| Myofascial Release | `/cleveland-therapeutic/myofascial-release-massage-in-olmsted-falls/` | `src/services/myofascial-release.md` |
| Facial Cupping | `/facials/` | `src/services/facial-cupping.md` |
| Doula | `/cleveland-doula-in-olmsted-falls/` | `src/services/doula.md` |
| Maternity Massage | `/cleveland-doula-in-olmsted-falls/cleveland-maternity-massage-in-olmsted-falls/` | `src/services/maternity-massage.md` |

## Architecture

### Project Structure

```
serenitymassagellc/
├── .eleventy.js              # 11ty config
├── package.json
├── src/
│   ├── _data/
│   │   ├── site.json         # Business info (name, phone, address, hours, booking URL)
│   │   └── navigation.json   # Nav links with dropdown structure
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk      # HTML shell: <head>, nav, footer
│   │       ├── page.njk      # Generic content page (extends base)
│   │       ├── service.njk   # Service detail page (extends base)
│   │       └── home.njk      # Homepage (extends base)
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css     # Single vanilla CSS file
│   │   └── images/
│   │       ├── logo.png      # Existing horizontal logo from WP site
│   │       └── favicon.ico   # Existing favicon from WP site
│   ├── index.md
│   ├── about.md
│   ├── contact.md
│   ├── massage-menu.md
│   └── services/
│       ├── deep-tissue.md
│       ├── therapeutic.md
│       ├── neuro-muscular.md
│       ├── myofascial-release.md
│       ├── facial-cupping.md
│       ├── doula.md
│       └── maternity-massage.md
├── docs/
└── _site/                    # Build output (gitignored)
```

### Data Files

**`site.json`** — single source of truth for business info:
- `name`: "Serenity Massage LLC"
- `phone`: "440-471-9029"
- `address`: "28970 Lorain Rd, Suite 100, North Olmsted, OH 44070"
- `bookingUrl`: "https://serenitymassagellc.glossgenius.com"
- `hours`: array of `{ day, time }` objects
- `owner`: "Karen K. Wardzala"
- `tagline`: "Providing relief with hot stone, sports massage and pregnancy massage"

**`navigation.json`** — flat list with optional `children` arrays for dropdowns:
- Home
- About
- Services (dropdown: Therapeutic, Deep Tissue, Neuro-Muscular, Myofascial Release, Facial Cupping, Doula, Maternity)
- Massage Menu
- Contact Us
- Book Now (CTA, links to GlossGenius)

### Layouts

**`base.njk`**: HTML5 doctype, meta charset/viewport, favicon link, Google Fonts import (Playfair Display + Inter), CSS link, responsive nav with mobile hamburger, footer with contact info/hours/copyright. All business data pulled from `site.json`.

**`home.njk`** (extends base): Hero section with tagline + Book Now CTA, welcome blurb, 3-column service highlights grid, contact info bar.

**`page.njk`** (extends base): Simple title + content body. Used by About, Contact, Massage Menu.

**`service.njk`** (extends base): Service title, description content, optional "Conditions Treated" list from front matter, Book Now CTA button.

### Front Matter Schema

Service pages use:
```yaml
---
layout: layouts/service.njk
title: "Deep Tissue Massage"
description: "SEO meta description"
conditions:
  - Fibromyalgia
  - Arthritis
  - Tension headaches
---
```

Generic pages use:
```yaml
---
layout: layouts/page.njk
title: "About"
description: "SEO meta description"
---
```

## Design System

### Colors (CSS custom properties)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#5B8A72` | Nav, buttons, accents |
| `--color-primary-dark` | `#3D6B54` | Hover states |
| `--color-bg` | `#FAFAF8` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, content areas |
| `--color-text` | `#2D2D2D` | Body text |
| `--color-text-muted` | `#6B6B6B` | Secondary text |
| `--color-accent` | `#C4956A` | CTAs, highlights |
| `--color-accent-dark` | `#A87B52` | CTA hover |
| `--color-border` | `#E8E8E4` | Subtle dividers |

### Typography

- Headings: `'Playfair Display', Georgia, serif`
- Body: `'Inter', system-ui, sans-serif`
- Base size: 18px, line-height 1.6
- Scale: h1 2.5rem, h2 2rem, h3 1.5rem

### Layout

- Max content width: 960px centered
- Mobile-first, breakpoint at 768px
- Section padding: 4rem vertical, 1.5rem horizontal
- Cards: white background, `border-radius: 8px`, subtle `box-shadow`

### Components

- **Nav**: Sticky top bar, logo left, links right, hamburger on mobile
- **Hero**: Full-width section with centered text, semi-transparent overlay
- **Service card**: Image placeholder area, title, excerpt, "Learn More" link
- **CTA button**: Rounded, accent color, links to GlossGenius booking
- **Pricing card**: Service name, duration, price, clean grid layout
- **Contact form**: Name, phone, email, comments — static only, no submission
- **Footer**: 3-column — contact info, hours, quick links

## Page Content Details

### Homepage
- Hero with tagline: "Providing relief with hot stone, sports massage and pregnancy massage"
- Welcome section: brief intro about Karen and the practice philosophy
- Service highlights: 3 featured cards (Deep Tissue, Maternity, Therapeutic)
- Contact bar: phone, address, hours summary

### About
- Karen's background: nursing degree (1981), massage therapy (2008, Cleveland Institute of Medical Massage)
- Philosophy: medical/therapeutic massage, not spa. Results-oriented treatment.
- Credentials listed as styled pills/badges
- Practice history: independent work before establishing Serenity Massage in 2016

### Massage Menu (Pricing)
- Therapeutic Massage: 60min/$90, 90min/$120, 120min/$150
- Maternity Massage & Doula: 60min/$90
- Massage Cupping: 60min/$110, 90min/$130
- Stress Triangle: 45min/$75
- Package discounts section (6, 9, 12 sessions)
- Cancellation policy: 24-hour notice required

### Service Pages
Each has: description of the technique, conditions/benefits it addresses, Book Now CTA. Content already scraped and ready to convert to markdown.

### Contact
- Address, phone, hours in a card
- Static form: name (first/last), phone, email, comments
- Google Maps embed placeholder (iframe with the address)

## Technical Decisions

- **No CSS framework** — vanilla CSS with custom properties. Site is small enough.
- **No JS framework** — only vanilla JS for the mobile hamburger toggle.
- **No image pipeline** — assets copied as-is via 11ty passthrough.
- **No Sass/PostCSS** — plain CSS is sufficient.
- **Google Fonts** — loaded via `<link>` tags with `font-display: swap`.
- **Logo**: existing `logo.png` from WordPress site (already downloaded).
- **Favicon**: existing `favicon.ico` from WordPress site (already downloaded).

## What's Excluded

- Blog/posts (none exist on current site)
- Image optimization
- Analytics
- Contact form submission handling
- Advanced SEO (beyond title + meta description)
- Gift certificate purchasing flow (links to external GlossGenius)
