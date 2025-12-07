# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript compile + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v7
- **Styling**: Custom CSS with glassmorphism design system (no Tailwind)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture

This is an "ADHD Guardian" application - a parental monitoring dashboard for children with ADHD. The app tracks medication schedules, screen time, device activity, and provides AI-assisted insights.

### Routing Structure

Routes are defined in `App.tsx` using React Router with a nested layout pattern:
- `/` - Dashboard overview
- `/medication` - Medication tracking
- `/devices` - Device monitoring
- `/activities` - Activity tracking
- `/guardian` - AI Guardian features

All routes use `Layout.tsx` as a wrapper component that provides the sidebar navigation and responsive mobile menu.

### Styling System

The app uses a custom CSS design system in `src/styles/index.css`:
- CSS custom properties for theming (dark palette with indigo/fuchsia accents)
- Glassmorphism utilities: `.glass-panel`, `.glass-card`
- Typography: `.text-gradient`, `.heading-lg`, `.heading-md`
- Buttons: `.btn-primary`, `.btn-ghost`
- Fonts: Outfit (headings), Inter (body)
