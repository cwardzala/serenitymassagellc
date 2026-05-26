# Serenity Massage 11ty Conversion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert serenitymassagellc.com from WordPress to a static 11ty site with modern design refresh.

**Architecture:** Markdown content files with YAML front matter, Nunjucks layouts, vanilla CSS with custom properties, no JS frameworks. Data files centralize business info. Service pages share a layout template.

**Tech Stack:** Eleventy 3.x, Nunjucks templating, vanilla CSS, vanilla JS (hamburger only)

---

## File Map

| File | Responsibility |
|------|---------------|
| `.eleventy.js` | 11ty config: input/output dirs, passthrough copy, Nunjucks setup |
| `package.json` | Dependencies and scripts |
| `.gitignore` | Ignore `_site/` and `node_modules/` |
| `src/_data/site.json` | Business info: name, phone, address, hours, booking URL |
| `src/_data/navigation.json` | Nav structure with dropdown children |
| `src/_includes/layouts/base.njk` | HTML shell: head, nav, footer |
| `src/_includes/layouts/home.njk` | Homepage: hero, service cards, contact bar |
| `src/_includes/layouts/page.njk` | Generic page: title + content |
| `src/_includes/layouts/service.njk` | Service page: content + conditions + CTA |
| `src/assets/css/style.css` | Complete site styles |
| `src/assets/images/logo.png` | Logo (already exists) |
| `src/assets/images/favicon.ico` | Favicon (already exists) |
| `src/index.md` | Homepage content |
| `src/about.md` | About page content |
| `src/contact.md` | Contact page with static form |
| `src/massage-menu.md` | Pricing page |
| `src/services/deep-tissue.md` | Deep Tissue service page |
| `src/services/therapeutic.md` | Therapeutic Massage service page |
| `src/services/neuro-muscular.md` | Neuro-Muscular service page |
| `src/services/myofascial-release.md` | Myofascial Release service page |
| `src/services/facial-cupping.md` | Facial Cupping service page |
| `src/services/doula.md` | Doula service page |
| `src/services/maternity-massage.md` | Maternity Massage service page |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `.eleventy.js`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repo**

```bash
cd ~/src/serenitymassagellc
git init
```

- [ ] **Step 2: Create `.gitignore`**

```
_site/
node_modules/
.DS_Store
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "serenitymassagellc",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0"
  }
}
```

- [ ] **Step 4: Create `.eleventy.js`**

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json .eleventy.js .gitignore
git commit -m "chore: scaffold 11ty project"
```

---

### Task 2: Data Files

**Files:**
- Create: `src/_data/site.json`
- Create: `src/_data/navigation.json`

- [ ] **Step 1: Create `src/_data/site.json`**

```json
{
  "name": "Serenity Massage LLC",
  "owner": "Karen K. Wardzala",
  "phone": "440-471-9029",
  "phoneHref": "tel:+14404719029",
  "address": "28970 Lorain Rd, Suite 100, North Olmsted, OH 44070",
  "mapUrl": "https://www.google.com/maps/search/?api=1&query=28970+Lorain+Rd+Suite+100+North+Olmsted+OH+44070",
  "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.5!2d-81.923!3d41.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z28970+Lorain+Rd+North+Olmsted+OH!5e0!3m2!1sen!2sus!4v1",
  "bookingUrl": "https://serenitymassagellc.glossgenius.com",
  "tagline": "Providing relief with hot stone, sports massage and pregnancy massage",
  "hours": [
    { "day": "Monday", "time": "11am – 7pm" },
    { "day": "Tuesday", "time": "11am – 5pm" },
    { "day": "Wednesday", "time": "2pm – 7pm" },
    { "day": "Thursday", "time": "2pm – 7pm" },
    { "day": "Friday", "time": "Closed" },
    { "day": "Saturday", "time": "Closed" },
    { "day": "Sunday", "time": "Closed" }
  ]
}
```

- [ ] **Step 2: Create `src/_data/navigation.json`**

```json
[
  { "label": "Home", "url": "/" },
  { "label": "About", "url": "/about/" },
  {
    "label": "Services",
    "url": "/services/therapeutic/",
    "children": [
      { "label": "Therapeutic Massage", "url": "/services/therapeutic/" },
      { "label": "Deep Tissue Massage", "url": "/services/deep-tissue/" },
      { "label": "Neuro-Muscular", "url": "/services/neuro-muscular/" },
      { "label": "Myofascial Release", "url": "/services/myofascial-release/" },
      { "label": "Facial Cupping", "url": "/services/facial-cupping/" },
      { "label": "Doula", "url": "/services/doula/" },
      { "label": "Maternity Massage", "url": "/services/maternity-massage/" }
    ]
  },
  { "label": "Massage Menu", "url": "/massage-menu/" },
  { "label": "Contact Us", "url": "/contact/" }
]
```

- [ ] **Step 3: Commit**

```bash
git add src/_data/
git commit -m "feat: add site data and navigation config"
```

---

### Task 3: CSS Stylesheet

**Files:**
- Create: `src/assets/css/style.css`

- [ ] **Step 1: Create `src/assets/css/style.css`**

The complete stylesheet covering: CSS reset, custom properties, typography, layout, nav (desktop + mobile), hero, cards, pricing, contact form, footer, and responsive breakpoint. Full content:

```css
/* ============================================
   Custom Properties
   ============================================ */
:root {
  --color-primary: #5B8A72;
  --color-primary-dark: #3D6B54;
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-text: #2D2D2D;
  --color-text-muted: #6B6B6B;
  --color-accent: #C4956A;
  --color-accent-dark: #A87B52;
  --color-border: #E8E8E4;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --max-width: 960px;
  --nav-height: 72px;
}

/* ============================================
   Reset & Base
   ============================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 18px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  color: var(--color-primary-dark);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--color-text);
  line-height: 1.2;
}

h1 { font-size: 2.5rem; margin-bottom: 1rem; }
h2 { font-size: 2rem; margin-bottom: 0.75rem; }
h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }

p {
  margin-bottom: 1rem;
}

ul, ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

/* ============================================
   Utilities
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* ============================================
   Buttons
   ============================================ */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  border: none;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-accent-dark);
  color: #fff;
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: #fff;
}

/* ============================================
   Navigation
   ============================================ */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  height: var(--nav-height);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-logo img {
  height: 48px;
  width: auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links > li {
  position: relative;
}

.nav-links a {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-links a:hover {
  background: var(--color-bg);
  color: var(--color-primary);
}

.nav-links .active > a {
  color: var(--color-primary);
}

/* Dropdown */
.nav-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 220px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  list-style: none;
}

.nav-dropdown a {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: 0;
}

.has-dropdown:hover .nav-dropdown {
  display: block;
}

.nav-cta .btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
}

/* Hamburger */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  margin: 5px 0;
  transition: transform 0.3s, opacity 0.3s;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}
.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ============================================
   Hero
   ============================================ */
.hero {
  background: var(--color-primary);
  color: #fff;
  text-align: center;
  padding: 5rem 1.5rem;
}

.hero h1 {
  color: #fff;
  font-size: 2.75rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.15rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
}

/* ============================================
   Sections
   ============================================ */
.section {
  padding: 4rem 1.5rem;
}

.section-alt {
  background: var(--color-surface);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header p {
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0.5rem auto 0;
}

/* ============================================
   Service Cards (Homepage)
   ============================================ */
.service-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: var(--max-width);
  margin: 0 auto;
}

.service-card {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.service-card h3 {
  margin-bottom: 0.75rem;
}

.service-card p {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.service-card .learn-more {
  font-weight: 600;
  color: var(--color-primary);
}

.service-card .learn-more:hover {
  color: var(--color-primary-dark);
}

/* ============================================
   Page Content
   ============================================ */
.page-header {
  background: var(--color-primary);
  color: #fff;
  text-align: center;
  padding: 3rem 1.5rem;
}

.page-header h1 {
  color: #fff;
}

.page-content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

/* ============================================
   Service Detail
   ============================================ */
.conditions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem;
}

.conditions-list li {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.service-cta {
  margin-top: 2.5rem;
  text-align: center;
}

/* ============================================
   About — Credentials
   ============================================ */
.credentials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.credentials li {
  background: var(--color-primary);
  color: #fff;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
}

/* ============================================
   Pricing
   ============================================ */
.pricing-section {
  margin-bottom: 3rem;
}

.pricing-section h2 {
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pricing-card .duration {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.pricing-card .price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 700;
}

.package-highlight {
  background: var(--color-primary);
  color: #fff;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
}

.package-highlight h3 {
  color: #fff;
}

.cancellation-policy {
  background: var(--color-bg);
  border-left: 4px solid var(--color-accent);
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin-top: 2rem;
}

/* ============================================
   Contact
   ============================================ */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.contact-info-card {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.contact-info-card h3 {
  margin-bottom: 1rem;
}

.contact-info-card p {
  margin-bottom: 0.5rem;
}

.contact-info-card a {
  font-weight: 600;
}

.hours-list {
  list-style: none;
  padding: 0;
}

.hours-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--color-border);
}

.hours-list li:last-child {
  border-bottom: none;
}

.hours-list .closed {
  color: var(--color-text-muted);
}

.contact-form {
  background: var(--color-surface);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.map-container {
  margin-top: 2rem;
  border-radius: 8px;
  overflow: hidden;
}

.map-container iframe {
  width: 100%;
  height: 300px;
  border: none;
}

/* ============================================
   Contact Bar (Homepage)
   ============================================ */
.contact-bar {
  background: var(--color-surface);
  padding: 3rem 1.5rem;
}

.contact-bar-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;
}

.contact-bar-item h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

/* ============================================
   Footer
   ============================================ */
.site-footer {
  background: var(--color-text);
  color: #fff;
  padding: 3rem 1.5rem 1.5rem;
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.footer-col h4 {
  color: var(--color-accent);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-col p,
.footer-col a {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.footer-col a:hover {
  color: #fff;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-hours {
  list-style: none;
  padding: 0;
}

.footer-hours li {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0;
}

.footer-bottom {
  max-width: var(--max-width);
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

/* ============================================
   Responsive — 768px+
   ============================================ */
@media (min-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-bar-inner {
    grid-template-columns: repeat(3, 1fr);
  }

  .footer-inner {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

/* ============================================
   Mobile Nav
   ============================================ */
@media (max-width: 767px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 0.75rem 1rem;
  }

  .nav-dropdown {
    position: static;
    box-shadow: none;
    border: none;
    padding-left: 1rem;
    display: none;
  }

  .has-dropdown.open .nav-dropdown {
    display: block;
  }

  .hero h1 {
    font-size: 2rem;
  }
}
```

- [ ] **Step 2: Verify assets passthrough is configured**

`assets/` directory already exists with `logo.png` and `favicon.ico`. The `.eleventy.js` config has `addPassthroughCopy("src/assets")` which will copy these to `_site/assets/`.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/style.css
git commit -m "feat: add complete site stylesheet"
```

---

### Task 4: Base Layout

**Files:**
- Create: `src/_includes/layouts/base.njk`

- [ ] **Step 1: Create `src/_includes/layouts/base.njk`**

```njk
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.name }}</title>
  <meta name="description" content="{{ description or site.tagline }}">
  <link rel="icon" href="/assets/images/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="site-nav" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="/" class="nav-logo">
        <img src="/assets/images/logo.png" alt="{{ site.name }}" width="200" height="48">
      </a>

      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav-links">
        {%- for item in navigation %}
          {%- if item.children %}
            <li class="has-dropdown">
              <a href="{{ item.url }}">{{ item.label }}</a>
              <ul class="nav-dropdown">
                {%- for child in item.children %}
                  <li><a href="{{ child.url }}">{{ child.label }}</a></li>
                {%- endfor %}
              </ul>
            </li>
          {%- else %}
            <li><a href="{{ item.url }}">{{ item.label }}</a></li>
          {%- endif %}
        {%- endfor %}
        <li class="nav-cta">
          <a href="{{ site.bookingUrl }}" class="btn btn-primary" target="_blank" rel="noopener">Book Now</a>
        </li>
      </ul>
    </div>
  </nav>

  <main>
    {{ content | safe }}
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>Contact</h4>
        <p><a href="{{ site.phoneHref }}">{{ site.phone }}</a></p>
        <p>{{ site.address }}</p>
      </div>
      <div class="footer-col">
        <h4>Hours</h4>
        <ul class="footer-hours">
          {%- for h in site.hours %}
            <li><span>{{ h.day }}</span> <span>{{ h.time }}</span></li>
          {%- endfor %}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          {%- for item in navigation %}
            <li><a href="{{ item.url }}">{{ item.label }}</a></li>
          {%- endfor %}
          <li><a href="{{ site.bookingUrl }}" target="_blank" rel="noopener">Book Now</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ "now" | date("Y") }} {{ site.name }}. All rights reserved.</p>
    </div>
  </footer>

  <script>
    (function () {
      var toggle = document.querySelector('.nav-toggle');
      var links = document.querySelector('.nav-links');
      var dropdowns = document.querySelectorAll('.has-dropdown');

      toggle.addEventListener('click', function () {
        var isOpen = links.classList.toggle('open');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      dropdowns.forEach(function (dd) {
        dd.addEventListener('click', function (e) {
          if (window.innerWidth < 768) {
            if (e.target.closest('.nav-dropdown')) return;
            e.preventDefault();
            dd.classList.toggle('open');
          }
        });
      });
    })();
  </script>

</body>
</html>
```

- [ ] **Step 2: Build to verify no errors**

```bash
npx eleventy --dryrun
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/_includes/layouts/base.njk
git commit -m "feat: add base layout with nav, footer, and mobile toggle"
```

---

### Task 5: Page & Service Layouts

**Files:**
- Create: `src/_includes/layouts/home.njk`
- Create: `src/_includes/layouts/page.njk`
- Create: `src/_includes/layouts/service.njk`

- [ ] **Step 1: Create `src/_includes/layouts/page.njk`**

```njk
---
layout: layouts/base.njk
---

<div class="page-header">
  <h1>{{ title }}</h1>
</div>

<div class="page-content">
  {{ content | safe }}
</div>
```

- [ ] **Step 2: Create `src/_includes/layouts/service.njk`**

```njk
---
layout: layouts/base.njk
---

<div class="page-header">
  <h1>{{ title }}</h1>
</div>

<div class="page-content">
  {{ content | safe }}

  {% if conditions %}
    <h2>Conditions Treated</h2>
    <ul class="conditions-list">
      {%- for condition in conditions %}
        <li>{{ condition }}</li>
      {%- endfor %}
    </ul>
  {% endif %}

  <div class="service-cta">
    <a href="{{ site.bookingUrl }}" class="btn btn-primary" target="_blank" rel="noopener">Book Your Appointment</a>
  </div>
</div>
```

- [ ] **Step 3: Create `src/_includes/layouts/home.njk`**

```njk
---
layout: layouts/base.njk
---

<section class="hero">
  <h1>{{ site.name }}</h1>
  <p>{{ site.tagline }}</p>
  <a href="{{ site.bookingUrl }}" class="btn btn-primary" target="_blank" rel="noopener">Book Your Appointment</a>
</section>

<section class="section section-alt">
  <div class="container">
    {{ content | safe }}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Our Services</h2>
      <p>Specialized therapeutic treatments for pain relief and recovery</p>
    </div>
    <div class="service-grid">
      {%- for card in serviceCards %}
        <div class="service-card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.excerpt }}</p>
          <a href="{{ card.url }}" class="learn-more">Learn More &rarr;</a>
        </div>
      {%- endfor %}
    </div>
  </div>
</section>

<section class="contact-bar">
  <div class="contact-bar-inner">
    <div class="contact-bar-item">
      <h3>Call Us</h3>
      <p><a href="{{ site.phoneHref }}">{{ site.phone }}</a></p>
    </div>
    <div class="contact-bar-item">
      <h3>Visit Us</h3>
      <p>{{ site.address }}</p>
    </div>
    <div class="contact-bar-item">
      <h3>Hours</h3>
      <p>Mon 11–7 | Tue 11–5 | Wed–Thu 2–7</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Commit**

```bash
git add src/_includes/layouts/
git commit -m "feat: add home, page, and service layouts"
```

---

### Task 6: Homepage Content

**Files:**
- Create: `src/index.md`

- [ ] **Step 1: Create `src/index.md`**

```markdown
---
layout: layouts/home.njk
title: Home
description: "Serenity Massage LLC offers therapeutic massage, deep tissue, sports massage, and pregnancy massage in North Olmsted, OH."
serviceCards:
  - title: Deep Tissue Massage
    excerpt: "Targeting chronic pain and deeper muscle layers for athletes and those with persistent tension."
    url: /services/deep-tissue/
  - title: Maternity Massage
    excerpt: "Specialized prenatal massage to alleviate cramping, back pain, and anxiety during pregnancy."
    url: /services/maternity-massage/
  - title: Therapeutic Massage
    excerpt: "A combination of techniques including deep work, myofascial, and neuromuscular approaches."
    url: /services/therapeutic/
---

## Welcome to Serenity Massage

Karen K. Wardzala, founder and licensed massage therapist, has always had a passion for the medical field and helping people in pain. After earning her nursing degree in 1981 and later completing her massage therapy training at Cleveland Institute of Medical Massage in 2008, Karen devoted herself to therapeutic massage as a healing tool — a results-oriented treatment to alleviate pain and resolve conditions.

Serenity Massage is not a spa. We specialize in medical and therapeutic massage designed to provide lasting relief. Over 90% of our clientele comes through referrals, repeat business, and word of mouth — a testament to the quality of care you'll receive.
```

- [ ] **Step 2: Build and verify**

```bash
npx eleventy
```

Expected: `_site/index.html` generated with hero, welcome section, service cards, and contact bar.

- [ ] **Step 3: Commit**

```bash
git add src/index.md
git commit -m "feat: add homepage content"
```

---

### Task 7: About Page

**Files:**
- Create: `src/about.md`

- [ ] **Step 1: Create `src/about.md`**

```markdown
---
layout: layouts/page.njk
title: About
description: "Meet Karen K. Wardzala, founder of Serenity Massage LLC — licensed massage therapist specializing in therapeutic and medical massage in North Olmsted, OH."
---

## Karen K. Wardzala, LMT

Karen has always had a passion for the medical field and helping people in pain. She became a nurse in 1981, but over time grew dissatisfied with the over-prescription and mismanagement of the body's natural ability to heal.

In 2008, Karen completed her massage therapy training at Cleveland Institute of Medical Massage. Her devotion to massage is as a healing tool — a results-oriented treatment to alleviate pain, resolve conditions, and support the body's natural recovery.

Karen worked independently at various Cleveland-area facilities in Rocky River and Westlake before establishing Serenity Massage in 2016. Over 90% of her clientele comes through referrals, repeat business, and word of mouth.

### Specializations

<ul class="credentials">
  <li>Deep Tissue Massage</li>
  <li>Sports Massage</li>
  <li>Pre-natal / Maternity Massage</li>
  <li>Myofascial Release</li>
  <li>Neuro-Muscular Therapy</li>
  <li>Trigger Point Therapy</li>
  <li>Hot Stone Massage</li>
  <li>Facial Cupping</li>
  <li>Aromatherapy</li>
  <li>Doula Services</li>
</ul>

### Our Philosophy

Serenity Massage is not a spa. We focus on medical and therapeutic massage — techniques that produce real, lasting results for pain relief and injury recovery. Every session is tailored to your specific needs, whether you're an athlete recovering from training, managing chronic pain, or seeking relief during pregnancy.
```

- [ ] **Step 2: Build and verify**

```bash
npx eleventy
```

Expected: `_site/about/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/about.md
git commit -m "feat: add about page"
```

---

### Task 8: All 7 Service Pages

**Files:**
- Create: `src/services/therapeutic.md`
- Create: `src/services/deep-tissue.md`
- Create: `src/services/neuro-muscular.md`
- Create: `src/services/myofascial-release.md`
- Create: `src/services/facial-cupping.md`
- Create: `src/services/doula.md`
- Create: `src/services/maternity-massage.md`

- [ ] **Step 1: Create `src/services/therapeutic.md`**

```markdown
---
layout: layouts/service.njk
title: Therapeutic Massage
description: "Therapeutic massage in North Olmsted, OH — a combination of deep tissue, myofascial, neuromuscular, and trigger point techniques for comprehensive pain relief."
conditions:
  - Chronic pain
  - Muscle tension
  - Sports injuries
  - Stress and anxiety
  - Headaches
  - Back and neck pain
---

Therapeutic massage is a combination of all the massage techniques Karen has mastered — incorporating deep work, myofascial techniques, neuromuscular approaches, and trigger point therapy into a comprehensive treatment.

Rather than following a single modality, each session is tailored to your specific needs. Karen assesses your condition and applies the appropriate combination of techniques to address your pain, tension, and mobility issues.

This is the core service at Serenity Massage and the foundation of our results-oriented approach. Whether you're dealing with chronic pain, recovering from an injury, or managing everyday tension, therapeutic massage provides the targeted relief you need.
```

- [ ] **Step 2: Create `src/services/deep-tissue.md`**

```markdown
---
layout: layouts/service.njk
title: Deep Tissue Massage
description: "Deep tissue massage in North Olmsted, OH — targeting chronic pain and deeper muscle layers using forearms, elbows, and specialized techniques."
conditions:
  - Fibromyalgia
  - Arthritis
  - Tension headaches
  - Muscle injuries
  - Neck pain
  - Back pain
  - Chronic pain
---

Deep tissue massage is one of the most commonly requested techniques in clinical settings. This therapeutic approach targets chronic pain relief in specific body areas and is frequently utilized by athletes.

The massage therapist employs forearms and elbows while working at a slower pace to access deeper muscle layers. Practitioners may incorporate tools to achieve increased pressure.

The primary goal involves breaking up adhesions — rigid tissue bands or muscle knots — that restrict blood and lymph circulation. These adhesions lead to malnourished tissue and waste accumulation, causing pain and limited range of motion. By releasing these restrictions, deep tissue massage restores healthy circulation and promotes healing.
```

- [ ] **Step 3: Create `src/services/neuro-muscular.md`**

```markdown
---
layout: layouts/service.njk
title: Neuro-Muscular Therapy
description: "Neuro-muscular therapy in North Olmsted, OH — addressing pain at its source through specialized treatment of trigger points, nerve compression, and postural issues."
conditions:
  - Trigger point pain
  - Nerve entrapment
  - Tennis elbow
  - Carpal tunnel syndrome
  - Postural imbalance
  - Repetitive strain injuries
---

Neuro-muscular therapy (NMT) combines extensive training in the nervous and skeletal systems with knowledge of kinesiology and biomechanics to address pain at its source.

### Five Main Treatment Focuses

**Trigger Points** — irritable areas of muscle tissue that refer pain in predictable patterns. These tender spots can cause pain in seemingly unrelated areas of the body.

**Nerve Entrapment/Compression** — occurs when muscular imbalance develops from poor postural habits, creating pressure on nerves and causing pain or numbness.

**Ischemia** — reduced blood flow that causes cellular sensitivity in affected regions, leading to tenderness and pain.

**Bio-mechanical Dysfunction** — results from repetitive incorrect movement patterns. Associated with conditions like tennis elbow and carpal tunnel syndrome.

**Postural Issues** — addressed through muscular rebalancing, correcting the underlying patterns that contribute to chronic pain.

### What to Expect

Clients may experience mild soreness that resolves within 24 hours. Noticeable improvements in muscle looseness may take up to 14 hours post-treatment.
```

- [ ] **Step 4: Create `src/services/myofascial-release.md`**

```markdown
---
layout: layouts/service.njk
title: Myofascial Release
description: "Myofascial release massage in North Olmsted, OH — gentle therapeutic technique to release restricted fascia and improve circulation."
conditions:
  - Chronic pain
  - Back pain
  - Whiplash
  - Fibromyalgia
  - Carpal tunnel syndrome
  - Vertigo
---

Myofascial release technique (MFR) is one of the gentler types of massage therapy that can provide significant health benefits. It can be used independently or combined with other massage modalities.

Fascia is a thin connective tissue that surrounds your muscles and organs. When fascia becomes restricted — through injury, stress, or repetitive motion — it can cause pain and limit mobility throughout the body.

The technique works by loosening restricted fascia areas through gentle, sustained stretching. The therapist applies pressure and traction to release adhesions and restore the tissue's natural flexibility.

During treatment, you may experience sensations like stretching, tingling, or mild warmth. These are indicators that circulation is improving in the treated area and the fascia is releasing its restrictions.
```

- [ ] **Step 5: Create `src/services/facial-cupping.md`**

```markdown
---
layout: layouts/service.njk
title: Facial Cupping
description: "Facial cupping therapy in North Olmsted, OH — non-invasive treatment to restore collagen, improve circulation, and promote lymphatic drainage."
conditions:
  - Fine lines and wrinkles
  - Dull complexion
  - Puffiness and fluid retention
  - Poor facial circulation
---

Facial cupping is a non-invasive therapeutic technique where the therapist creates suction and negative pressure using smaller specialized cups to help bring collagen and elasticity back to the face.

### Benefits

Facial cupping aims to enhance your skin's natural vitality by:

- Restoring collagen and elasticity to facial skin
- Enhancing hydration and blood circulation in facial tissues
- Eliminating excess fluids and toxins by activating lymphatic drainage pathways

The treatment is gentle and relaxing, using smaller cups specifically designed for the delicate facial area. Results include improved skin tone, reduced puffiness, and a more radiant complexion.
```

- [ ] **Step 6: Create `src/services/doula.md`**

```markdown
---
layout: layouts/service.njk
title: Doula Services
description: "Doula services in North Olmsted, OH — trained childbirth assistance, pregnancy massage, and postpartum support from Serenity Massage."
conditions:
  - Pregnancy support
  - Labor preparation
  - Postpartum recovery
  - Prenatal wellness
---

Serenity Massage offers trained doula assistance during childbirth and postpartum family support.

As part of the doula program, clients receive massages once a month from the time of pregnancy through the birth of the baby and into the postpartum period.

Beginning at 36 weeks gestation, your doula becomes available around the clock through delivery, providing continuous physical and emotional support during labor.

### What's Included

- Monthly massage sessions throughout pregnancy
- 24/7 availability from 36 weeks through delivery
- Labor and delivery support
- Postpartum follow-up care

Expectant mothers receive the full advantages of maternity massage therapy combined with the personalized support of a dedicated birth companion.
```

- [ ] **Step 7: Create `src/services/maternity-massage.md`**

```markdown
---
layout: layouts/service.njk
title: Maternity Massage
description: "Prenatal and maternity massage in North Olmsted, OH — specialized pregnancy massage for pain relief, relaxation, and wellness."
conditions:
  - Leg cramping
  - Back pain
  - Swelling
  - Anxiety
  - Muscle tension
  - Fatigue
---

Serenity Massage offers pregnancy massage tailored to expectant mothers' specific needs. The service works on all levels — physical, mental, and emotional — addressing the many changes your body experiences during pregnancy.

### Benefits of Maternity Massage

- **Alleviates leg cramping** commonly experienced during pregnancy
- **Reduces back pain** caused by the body's changing center of gravity
- **Decreases swelling** in the extremities
- **Lowers anxiety** and promotes emotional well-being
- **Enhances labor experiences** through physical preparation
- **Supports newborn wellness** through reduced maternal stress

Maternity massage releases muscle tension, improves circulation, enhances the immune system, reduces mental stress, and increases body awareness. Each session is customized to your individual needs and the stage of your pregnancy.
```

- [ ] **Step 8: Build and verify all service pages**

```bash
npx eleventy
```

Expected: 7 files generated under `_site/services/`.

- [ ] **Step 9: Commit**

```bash
git add src/services/
git commit -m "feat: add all 7 service pages"
```

---

### Task 9: Massage Menu (Pricing) Page

**Files:**
- Create: `src/massage-menu.md`

- [ ] **Step 1: Create `src/massage-menu.md`**

```markdown
---
layout: layouts/page.njk
title: Massage Menu
description: "Massage therapy pricing and packages at Serenity Massage LLC in North Olmsted, OH. Therapeutic, maternity, cupping, and stress relief services."
---

<div class="pricing-section">
  <h2>Therapeutic Massage</h2>
  <div class="pricing-grid">
    <div class="pricing-card">
      <div>
        <strong>Therapeutic Massage</strong>
        <div class="duration">60 minutes</div>
      </div>
      <div class="price">$90</div>
    </div>
    <div class="pricing-card">
      <div>
        <strong>Therapeutic Massage</strong>
        <div class="duration">90 minutes</div>
      </div>
      <div class="price">$120</div>
    </div>
    <div class="pricing-card">
      <div>
        <strong>Therapeutic Massage</strong>
        <div class="duration">120 minutes</div>
      </div>
      <div class="price">$150</div>
    </div>
  </div>
</div>

<div class="pricing-section">
  <h2>Specialty Services</h2>
  <div class="pricing-grid">
    <div class="pricing-card">
      <div>
        <strong>Maternity Massage &amp; Doula</strong>
        <div class="duration">60 minutes</div>
      </div>
      <div class="price">$90</div>
    </div>
    <div class="pricing-card">
      <div>
        <strong>Massage Cupping</strong>
        <div class="duration">60 minutes</div>
      </div>
      <div class="price">$110</div>
    </div>
    <div class="pricing-card">
      <div>
        <strong>Massage Cupping</strong>
        <div class="duration">90 minutes</div>
      </div>
      <div class="price">$130</div>
    </div>
    <div class="pricing-card">
      <div>
        <strong>Stress Triangle</strong>
        <div class="duration">45 minutes</div>
      </div>
      <div class="price">$75</div>
    </div>
  </div>
</div>

<div class="package-highlight">
  <h3>Package Discounts</h3>
  <p>Save when you buy in bulk! Packages available for 6, 9, or 12 sessions at various durations with savings up to $330. Contact us for package pricing details.</p>
  <a href="/contact/" class="btn btn-outline" style="color: #fff; border-color: #fff; margin-top: 1rem;">Ask About Packages</a>
</div>

<div class="cancellation-policy">
  <h3>Cancellation Policy</h3>
  <p>24-hour advance notice is required for cancellations. Failure to provide adequate notice will result in a charge for the full session.</p>
</div>
```

- [ ] **Step 2: Build and verify**

```bash
npx eleventy
```

Expected: `_site/massage-menu/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/massage-menu.md
git commit -m "feat: add massage menu pricing page"
```

---

### Task 10: Contact Page

**Files:**
- Create: `src/contact.md`

- [ ] **Step 1: Create `src/contact.md`**

```markdown
---
layout: layouts/page.njk
title: Contact Us
description: "Contact Serenity Massage LLC in North Olmsted, OH. Call 440-471-9029 or visit us at 28970 Lorain Rd, Suite 100."
---

<div class="contact-grid">
  <div class="contact-info-card">
    <h3>Get in Touch</h3>
    <p><strong>Phone:</strong> <a href="{{ site.phoneHref }}">{{ site.phone }}</a></p>
    <p><strong>Address:</strong> {{ site.address }}</p>
    <p><a href="{{ site.bookingUrl }}" class="btn btn-primary" target="_blank" rel="noopener" style="margin-top: 1rem;">Book Online</a></p>
    <p style="margin-top: 1rem; color: var(--color-text-muted); font-size: 0.9rem;">Located within a hot stone's throw of Westlake! We welcome inquiries about sports massage for events, corporate chair massage services, or general appointments.</p>
  </div>

  <div class="contact-info-card">
    <h3>Hours of Operation</h3>
    <ul class="hours-list">
      {%- for h in site.hours %}
        <li>
          <span>{{ h.day }}</span>
          <span{% if h.time == "Closed" %} class="closed"{% endif %}>{{ h.time }}</span>
        </li>
      {%- endfor %}
    </ul>
  </div>
</div>

<div class="contact-form">
  <h2>Send Us a Message</h2>
  <form>
    <div class="form-row">
      <div class="form-group">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" required>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input type="text" id="last-name" name="last-name" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
    </div>
    <div class="form-group">
      <label for="comments">Comments</label>
      <textarea id="comments" name="comments" rows="5"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send Message</button>
  </form>
</div>

<div class="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2988.5!2d-81.923!3d41.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg5NzAgTG9yYWluIFJkIE5vcnRoIE9sbXN0ZWQgT0g!5e0!3m2!1sen!2sus"
    title="Serenity Massage location map"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
```

- [ ] **Step 2: Build and verify**

```bash
npx eleventy
```

Expected: `_site/contact/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/contact.md
git commit -m "feat: add contact page with form and map"
```

---

### Task 11: Final Build & Verification

- [ ] **Step 1: Full build**

```bash
npx eleventy
```

Expected output should show 11 files written:
- `_site/index.html`
- `_site/about/index.html`
- `_site/contact/index.html`
- `_site/massage-menu/index.html`
- `_site/services/therapeutic/index.html`
- `_site/services/deep-tissue/index.html`
- `_site/services/neuro-muscular/index.html`
- `_site/services/myofascial-release/index.html`
- `_site/services/facial-cupping/index.html`
- `_site/services/doula/index.html`
- `_site/services/maternity-massage/index.html`

- [ ] **Step 2: Start dev server and verify in browser**

```bash
npx eleventy --serve
```

Check in browser at `http://localhost:8080`:
- Homepage: hero, service cards, contact bar all render
- Navigation: all links work, dropdown works, mobile hamburger works
- About: credentials pills display
- All 7 service pages: conditions list and CTA button
- Massage Menu: pricing cards and package section
- Contact: form renders, hours display, map shows
- Footer: 3 columns on desktop, stacked on mobile
- Logo and favicon display correctly

- [ ] **Step 3: Commit images and any remaining files**

```bash
git add src/assets/images/
git commit -m "feat: add logo and favicon assets"
```

- [ ] **Step 4: Final commit for any remaining changes**

```bash
git status
# If any unstaged files, add and commit
```
