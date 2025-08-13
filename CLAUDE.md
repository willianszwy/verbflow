# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**English Hub** is a modern React-based platform that serves as a comprehensive destination for interactive English learning tools. The hub currently features VerbFlow (formerly "English Verb Timeline") as its flagship application, with a modular architecture designed to accommodate multiple English learning apps in the future. The platform is designed for deployment on GitHub Pages and optimized for search engine discovery.

## Architecture

**Multi-Page Hub Structure:**
- `src/App.js` - Main router configuration with React Router DOM
- `src/components/Layout/` - Global layout components:
  - `Layout.js` - Main layout wrapper with outlet for pages
  - `Navbar.js` - Global navigation with routing and theme toggle
  - `Footer.js` - Global footer with links and branding
- `src/pages/` - Individual application pages:
  - `Home/` - Hub landing page showcasing all available tools
  - `VerbTimeline/` - Complete VerbFlow application as a page
    - `VerbTimelinePage.js` - Main container for verb learning app
    - `components/` - All VerbTimeline-specific components
    - `data/` - Verb data and configuration
    - `utils/` - Verb conjugation logic
    - `hooks/` - Analytics and VerbTimeline-specific hooks
- `src/components/shared/` - Reusable components across pages:
  - `Icons/` - Icon system (CategoryIcons, UIIcons)
- `src/index.js` - Application entry point with BrowserRouter
- `public/index.html` - HTML template with comprehensive SEO

**Hub Features:**
- **Multi-App Platform:** Scalable architecture for multiple English learning tools
- **Unified Navigation:** Global navbar with routing between different apps
- **Consistent Theming:** Dark/light mode toggle shared across all apps
- **Responsive Design:** Mobile-first approach across all pages
- **SEO Optimized:** Individual page optimization with shared meta structure

**VerbFlow Features (Current App):**
- Interactive verb timeline visualization
- Verb categorization system (basics, daily, communication, movement, mental, experience)
- Three difficulty levels (foundation, building, mastery)
- Pronoun selection with conjugation rules
- Mode selection (affirmative, negative, question)
- Integration with YouGlish for pronunciation
- Google Analytics tracking

**Architecture Benefits:**
- **Scalability:** Easy addition of new learning apps as separate pages
- **Modular Design:** Each app is self-contained with its own components and logic
- **Shared Resources:** Common components (Layout, Icons) reused across apps
- **Independent Routing:** Each app maintains its own URL structure
- **Maintainability:** Clear separation between global hub features and app-specific code

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
1. Update `homepage` field in package.json to your GitHub Pages URL (currently set to `https://willianszwy.github.io/verbflow`)
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
- Google Analytics for user behavior tracking

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
- **ModeSelector** - Toggle between affirmative/negative/question modes
- **LevelSelector** - Star-based difficulty level selector
- **VerbTimeline** - Interactive timeline with conjugation popup
- **VerbDisplay** - Current verb showcase with pronunciation link
- **AllForms** - Clickable list of all verb forms

### Supporting Modules

- **Icons/** - CategoryIcons, UIIcons with consistent sizing
- **data/verbData.js** - All verb categories, levels, and configuration
- **utils/verbConjugation.js** - Complete conjugation logic for all tenses
- **hooks/useAnalytics.js** - Google Analytics tracking and event management

## Current Session Progress

**Completed:**
- ✅ Fixed FontAwesome icons across all components (CDN + proper CSS classes)
- ✅ Removed redundant "Verb Timeline" header to save space
- ✅ Added question mark (?) to all question forms
- ✅ Implemented Contractions toggle (green) with state management
- ✅ Updated conjugateVerb() to handle contractions parameter
- ✅ Fixed modal verbs contractions (can't/cannot, won't/will not, didn't/did not)

**Pending Issues:**
- ⚠️ Need to test ALL verb combinations with contractions (all categories, levels, pronouns, tenses, modes)
- ⚠️ Verify negative questions work correctly across all verb types
- ⚠️ Check modal verbs (might, may, must) in all forms

**Files Modified:**
- `src/pages/VerbTimeline/utils/verbConjugation.js` - Added applyContractions(), updated getNegativeAuxiliary()
- `src/pages/VerbTimeline/components/ModeSelector/` - Added contractions toggle
- `src/pages/VerbTimeline/VerbTimelinePage.js` - Added isContraction state
- All VerbDisplay, VerbTimeline, AllForms components - Updated for contractions

### Icon System

**FontAwesome CDN Integration:**
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`
- Style: Thin rounded (fi-tr-*)
- Organization: Grouped by purpose (Category vs UI icons)
- Categories: house, comment, walking, brain, sparkles, book
- UI Elements: sun/moon, dice, volume

## Data Architecture

**Verb Data Structure:**
- **Categories:** Each category contains verbs organized by difficulty level
- **Irregular Verbs:** Special handling for past and participle forms
- **Conjugation Engine:** Handles both regular and irregular verb patterns
- **Pronouns:** Full set with proper conjugation rules

**State Management:**
- Centralized state in VerbTimelineMVP component
- Props drilling for component communication
- Analytics tracking integrated throughout user interactions

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
- sempre commitar ao finalisar uma task