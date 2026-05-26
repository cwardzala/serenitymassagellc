# Serenity Massage LLC

Static website for [Serenity Massage LLC](https://serenitymassagellc.com), a therapeutic massage practice in North Olmsted, OH. Built with [Eleventy (11ty)](https://www.11ty.dev/).

## Getting Started

```bash
npm install
npm start
```

Site runs at `http://localhost:8080`.

## Build

```bash
npm run build
```

Output goes to `_site/`.

## Project Structure

```
src/
├── _data/          # Global data (site info, navigation)
├── _includes/
│   └── layouts/    # Nunjucks templates (base, home, page, service)
├── assets/
│   ├── css/        # Vanilla CSS with custom properties
│   └── images/     # Logo, favicon, headshot
├── services/       # Individual service pages (markdown)
├── index.md        # Homepage
├── about.md        # About Karen
├── contact.md      # Contact form + map
└── massage-menu.md # Pricing
```

## Editing Content

- **Business info** (phone, address, hours): edit `src/_data/site.json`
- **Navigation links**: edit `src/_data/navigation.json`
- **Page content**: edit the corresponding `.md` file in `src/`
- **Service pages**: edit files in `src/services/` — front matter `conditions` array renders as styled pills
