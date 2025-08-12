# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VerbFlow** is a modern React application designed to help English learners master verb conjugations through an interactive timeline visualization. Originally called "English Verb Timeline", it was rebranded to VerbFlow for better SEO and memorability. The app is designed for deployment on GitHub Pages and optimized for search engine discovery.

## Architecture

**Modular React Structure:**
- `src/App.js` - Main application component
- `src/components/VerbTimelineMVP.js` - Main container component
- `src/components/` - Organized component modules:
  - `Header/` - Application header with theme toggle
  - `CategorySelector/` - Verb category selection
  - `VerbSelector/` - Individual verb selection with random option
  - `PronounSelector/` - Pronoun selection buttons
  - `LevelSelector/` - Difficulty level selector
  - `VerbTimeline/` - Interactive timeline visualization
  - `VerbDisplay/` - Current verb display with pronunciation
  - `AllForms/` - All verb forms comparison
  - `Icons/` - Reusable icon components
- `src/data/verbData.js` - All verb data and configuration
- `src/utils/verbConjugation.js` - Verb conjugation logic
- `src/index.js` - Application entry point
- `public/index.html` - HTML template

**Key Features:**
- Interactive verb timeline visualization
- Verb categorization system (basics, daily, communication, movement, mental, experience)
- Three difficulty levels (foundation, building, mastery)
- Pronoun selection with conjugation rules
- Dark/light theme toggle
- Integration with YouGlish for pronunciation

**Component Architecture:**
- **Modular Design:** Each UI section is a separate, reusable component
- **Separation of Concerns:** Data, logic, and presentation are clearly separated
- **State Management:** React hooks (useState) centralized in main component
- **Data Layer:** Verb data and conjugation logic extracted to separate modules
- **Icon System:** Flaticon Uicons organized in dedicated components
- **Responsive Design:** Tailwind CSS classes across all components

## Development Commands

**Installation:**
```bash
npm install
```

**Development:**
```bash
npm start          # Start development server on http://localhost:3000
```

**Build:**
```bash
npm run build      # Create production build in /build folder
```

**Testing:**
```bash
npm test           # Run test suite
```

**GitHub Pages Deployment:**
```bash
npm run deploy     # Deploy to GitHub Pages (requires gh-pages setup)
```

## Deployment Setup

**GitHub Pages Configuration:**
1. Update `homepage` field in package.json to your GitHub Pages URL (currently set to `/verbflow`)
2. Repository must be pushed to GitHub with main branch
3. GitHub Actions workflow automatically deploys on push to main
4. Alternative: use `npm run deploy` for manual deployment
5. **SEO files included**: robots.txt, sitemap.xml, and comprehensive meta tags

**Required Environment:**
- Node.js 18+
- npm or yarn
- Git repository on GitHub

## Styling & Configuration

**Styling:**
- **Tailwind CSS:** Configured with PostCSS, custom color palette for verb tenses, dark mode support, responsive design
- **Flaticon Uicons:** Thin rounded icons imported via npm package (@flaticon/flaticon-uicons)

**Custom Colors:**
- verb-past: #E74C3C
- verb-perfect: #8E44AD
- verb-present: #27AE60
- verb-continuous: #3498DB
- verb-future: #F39C12

**External Integrations:**
- YouGlish API for pronunciation examples
- Uses pt.youglish.com domain for Portuguese-English pronunciation

## Code Conventions

- **Component Structure:** Each component in its own folder with index.js export
- **Functional Components:** All components use React hooks
- **Naming:** PascalCase for components, camelCase for functions/variables
- **Props:** Clear, descriptive prop names with consistent patterns
- **State Management:** Centralized in main container, passed down via props
- **Event Handlers:** Prefixed with `handle` or `on` (e.g., `handleVerbClick`, `onToggleTheme`)
- **Icon Integration:** Flaticon Uicons (fi fi-tr-* classes)
- **Styling:** Tailwind CSS with consistent design tokens
- **File Organization:** Clear separation between components, data, and utilities

## Component Structure

### Main Components

- **VerbTimelineMVP.js** - Main container managing all state and coordination
- **Header** - App title and theme toggle button
- **CategorySelector** - Horizontal scrollable category buttons
- **VerbSelector** - Dropdown + Random button for verb selection
- **PronounSelector** - Grid of pronoun buttons
- **LevelSelector** - Star-based difficulty level selector
- **VerbTimeline** - Interactive timeline with conjugation popup
- **VerbDisplay** - Current verb showcase with pronunciation link
- **AllForms** - Clickable list of all verb forms

### Supporting Modules

- **Icons/** - CategoryIcons, UIIcons with consistent sizing
- **data/verbData.js** - All verb categories, levels, and configuration
- **utils/verbConjugation.js** - Complete conjugation logic for all tenses

### Icon System

**Flaticon Uicons Integration:**
- Package: `@flaticon/flaticon-uicons`
- Style: Thin rounded (fi-tr-*)
- Organization: Grouped by purpose (Category vs UI icons)
- Categories: house, comment, walking, brain, sparkles, book
- UI Elements: sun/moon, dice, volume

## SEO & Discovery Features

**VerbFlow** is optimized for search engines and web discovery:

### Meta Tags & Structure
- **Comprehensive SEO**: Title, description, keywords, author, robots
- **Open Graph**: Facebook/LinkedIn sharing with rich previews
- **Twitter Cards**: Enhanced Twitter sharing experience
- **Canonical URLs**: Proper URL structure for SEO
- **Language tags**: English language specification

### Technical SEO
- **Structured Data**: Schema.org WebApplication markup for educational content
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Search engine guidance and permissions
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Performance**: Optimized bundle size and loading times

### Content Optimization
- **Keywords**: Strategic use of "verb", "conjugation", "English", "learning"
- **Descriptions**: Compelling, benefit-focused copy
- **Alt text**: Descriptive text for accessibility and SEO
- **Progressive Web App**: Manifest file for app-like experience

### Brand Identity
- **Name**: VerbFlow (memorable, brandable, includes "verb")
- **Theme**: Professional indigo (#4F46E5) with clean design
- **Messaging**: Focus on "mastering" and "interactive timeline"
- **Target audience**: ESL students, teachers, self-learners