# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aviation Hazard Identifier is a React/TypeScript single-page application that classifies aviation incidents using the official CAST/ICAO CICTT (Common Taxonomy Team) occurrence categories. Users can paste text or upload files, and the app identifies applicable categories via keyword matching against all 34 CICTT occurrence codes.

**No API key required** - fully client-side keyword-based classification.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build to dist/
npm run preview      # Preview production build
npx tsc --noEmit     # Type check without build
```

## Architecture

```
App.tsx                         # Main component: state management, layout orchestration
├── components/
│   ├── Header.tsx              # Static header with CICTT branding
│   ├── InputSection.tsx        # Textarea + file upload (FileReader API)
│   ├── ResultsSection.tsx      # Category management: filters, toggles, weights, search
│   └── TaxonomyChart.tsx       # Recharts grouped horizontal BarChart (34 categories)
├── services/
│   ├── cicttTaxonomy.ts        # All 34 CICTT categories with 15-25 keywords each
│   └── keywordService.ts       # Keyword matching engine, scoring algorithm
└── types.ts                    # TypeScript interfaces (CategoryResult, AnalysisResult)
```

## The 34 CICTT Occurrence Categories

Organized into 11 groups:
- **Loss of Control**: LOC-I, LOC-G, AMAN
- **Terrain/Obstacles**: CFIT, CTOL, GCOL
- **Runway Events**: RE, RI, USOS, ARC
- **System Failures**: SCF-PP, SCF-NP, FUEL
- **Fire/Smoke**: F-NI, F-POST
- **Weather/Environment**: TURB, WSTRW, ICE
- **Wildlife**: BIRD, WILD
- **Traffic/Separation**: MAC, ATM
- **Ground Operations**: RAMP, GTOW, ADRM
- **Cabin/Medical**: CABIN, MED, EVAC
- **Other**: NAV, LALT, EXTL, SEC, LOLI, UNK, OTHR

## Key Implementation Details

- **Keyword Service**: `analyzeIncident(text)` matches text against keyword dictionaries for all 34 categories
- **Scoring**: `baseScore = (matched_weights / total_weights) * 100 + frequencyBonus`
- **Risk Levels**: 0-20 Low, 21-50 Medium, 51-79 High, 80-100 Critical
- **User Controls**: Toggle categories on/off, adjust weights (0.5x-2.0x), add categories manually
- **Styling**: Tailwind CSS via CDN
- **Visualization**: Grouped horizontal bar chart with collapsible category groups

## Data Flow

1. InputSection captures text (paste or file upload)
2. App calls `analyzeIncident(text)` from keywordService
3. Service scans for keywords in all 34 categories, calculates scores
4. ResultsSection displays with filtering, sorting, grouping
5. TaxonomyChart shows grouped bar visualization
6. User can toggle/weight categories; overall score recalculates in real-time

## Deployment for Squarespace

1. Run `npm run build`
2. Host `dist/` folder on any static hosting (Vercel, Netlify, GitHub Pages)
3. Embed via iframe in Squarespace Code Block:
```html
<iframe src="https://your-hosted-url.com" width="100%" height="800px" frameborder="0"></iframe>
```
