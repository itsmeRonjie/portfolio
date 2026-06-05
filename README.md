# Ronjie Portfolio (Nuxt 3)

A dark-themed developer portfolio built with Nuxt 3 and Tailwind CSS. Content is data-driven via the `data/` directory.

## Requirements
- Node.js 18+

## Setup
```bash
corepack enable
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
pnpm generate
pnpm preview
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
- Edit `data/moneyManagerSite.ts` for Money Manager app-site content.
- Edit `data/dinkBoardSite.ts` for DinkBoard app-site content, support details, and store links.
- Edit `data/skills.ts` for core technology badges.
- Edit `data/toolbox.ts` for tools list.

## App Subdomains
- `moneymanager.ronjiemanon.com` renders the Money Manager landing, support, and privacy pages. Fallback routes live under `/money-manager`.
- `dinkboard.ronjiemanon.com` renders the DinkBoard landing, support, and privacy pages. Fallback routes live under `/dinkboard`.
- `alarmclock.ronjiemanon.com/privacy-policy` renders the Alarm Clock privacy policy.
- `picklequeue.ronjiemanon.com/privacy-policy` renders the Pickle Queue privacy policy. Fallback route lives under `/pickle-queue/privacy-policy`.

## Resume
The download button points to `public/resume.pdf`. Replace it to update the resume.
