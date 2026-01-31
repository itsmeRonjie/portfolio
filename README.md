# Ronjie Portfolio (Nuxt 3)

A dark-themed developer portfolio built with Nuxt 3 and Tailwind CSS. Content is data-driven via the `data/` directory.

## Requirements
- Node.js 18+

## Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run generate
npm run preview
```

## Deployment (Vercel GitHub Actions)
This repo includes a workflow that deploys to Vercel on every push to `main`.

Required GitHub secrets:
- `VERCEL_TOKEN` - Create from Vercel Account Settings → Tokens.
- `VERCEL_ORG_ID` - Vercel team/org ID (Project Settings → General).
- `VERCEL_PROJECT_ID` - Vercel project ID (Project Settings → General).

## Project Structure
- `pages/` - Routes (`/`, `/projects`, `/contact`)
- `components/` - Reusable UI sections and cards
- `data/` - Single source of truth for profile, skills, projects, and toolbox
- `composables/` - Data access helpers
- `public/` - Static assets (`resume.pdf`, `og-image.svg`, `favicon.svg`)

## Content Updates
- Edit `data/profile.ts` for summary, experience, education, strengths, languages, and links.
- Edit `data/projects.ts` for project cards (placeholders are marked).
- Edit `data/playStore.ts` for Play Store developer listings (developer ID + limit).
- Edit `data/skills.ts` for core technology badges.
- Edit `data/toolbox.ts` for tools list.

## Resume
The download button points to `public/resume.pdf`. Replace it to update the resume.
