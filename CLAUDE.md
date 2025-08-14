# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**English Hub** is a modern React-based platform that serves as a comprehensive destination for interactive English learning tools. The hub currently features **2 complete applications**: **VerbTimeline** (verb conjugation practice) and **VerbTransform** (sentence transformation exercises), with a modular architecture designed to accommodate multiple English learning apps in the future. The platform is designed for deployment on GitHub Pages and optimized for search engine discovery.

## Architecture

**Multi-Page Hub Structure:**
- `src/App.js` - Main router configuration with React Router DOM
- `src/components/Layout/` - Global layout components:
  - `Layout.js` - Main layout wrapper with outlet for pages
  - `Navbar.js` - Global navigation with routing and theme toggle
  - `Footer.js` - Global footer with links and branding
- `src/pages/` - Individual application pages:
  - `Home/` - Hub landing page showcasing only available apps (VerbTimeline + VerbTransform)
  - `VerbTimeline/` - Complete verb conjugation practice application
    - `VerbTimelinePage.js` - Main container for verb learning app
    - `components/` - All VerbTimeline-specific components
    - `data/` - Verb data and configuration (6 categories × 3 levels)
    - `utils/` - Verb conjugation logic with contractions support
    - `hooks/` - Analytics and VerbTimeline-specific hooks
  - `VerbTransform/` - Complete sentence transformation exercise app
    - `VerbTransformPage.js` - Main game container with scoring system
    - `components/` - ExerciseCard, TenseSelector, AnswerInput, ScoreBoard, FeedbackModal, etc.
    - `data/exerciseTemplates.js` - 90 base sentences (6 categories × 3 levels × 5 exercises)
    - `utils/sentenceTransformer.js` - Sentence transformation and validation logic
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

**VerbTimeline Features:**
- Interactive verb timeline visualization with color-coded tenses
- Verb categorization system (basics, daily, communication, movement, mental, experience)
- Three difficulty levels (foundation ⭐, building ⭐⭐, mastery ⭐⭐⭐)
- Pronoun selection with proper conjugation rules
- Mode selection (affirmative, negative, question) with contractions toggle
- Integration with YouGlish for pronunciation support
- Google Analytics tracking for user behavior

**VerbTransform Features:**
- Interactive sentence transformation exercises with gamification
- Same 6 categories and 3 difficulty levels as VerbTimeline for consistency
- 90 base sentences creating 360 unique exercise possibilities (90 × 4 tenses)
- Scoring system with streaks, bonuses, and progress tracking
- Real-time feedback with elegant modal design
- Automatic game reset when changing category/level
- Comprehensive answer validation with variation support

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

## Latest Development Session (January 2025)

### **MAJOR ACHIEVEMENTS:**

**✅ VerbTransform App - Complete Implementation:**
- Built comprehensive sentence transformation exercise app from scratch
- 360 unique exercise possibilities (90 base sentences × 4 tense transformations)
- Full gamification system with scoring, streaks, and progress tracking
- Elegant feedback modals with refined design matching VerbTimeline aesthetic
- Category and level progression system identical to VerbTimeline for consistency

**✅ Database & Exercise System:**
- 6 categories: basics, daily, communication, movement, mental, experience
- 3 difficulty levels: foundation (⭐), building (⭐⭐), mastery (⭐⭐⭐)
- 5 exercises per category per level = 90 total base sentences
- Each sentence can transform to 4 different tenses = 360 unique exercises
- Comprehensive answer validation with variation support (contractions, etc.)

**✅ UI/UX Enhancements:**
- Created CategorySelector and LevelSelector components with VerbTimeline styling
- Implemented automatic game reset when changing category/level
- Added visual indicators for category and difficulty level on exercise cards
- Refined modal design to be more subtle and consistent with overall aesthetic
- Cleaned up home page to show only functional apps (removed "coming soon")

**✅ Technical Implementation:**
- Complete sentence transformation engine with verb conjugation reuse
- Robust exercise generation logic with fallbacks for empty categories
- Modular component architecture following established patterns
- Integration with existing routing and navigation system

### **FINAL STATUS:**
- **VerbTimeline**: Fully functional with contractions support ✅
- **VerbTransform**: Fully functional with 360 exercises ✅
- **Home Page**: Clean, professional, shows only available apps ✅
- **Navigation**: Seamless routing between all pages ✅
- **GitHub Pages**: Deployed and working with SPA routing ✅

### **TESTING COMPLETED:**
- ✅ VerbTransform exercise flow (answer → feedback → next exercise)
- ✅ Category and level switching with game reset
- ✅ All components render properly with VerbTimeline design consistency
- ✅ Modal feedback system works correctly for correct/incorrect answers
- ✅ Progress tracking and scoring system functions as expected

### Icon System

**FontAwesome CDN Integration:**
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`
- Style: Thin rounded (fi-tr-*)
- Organization: Grouped by purpose (Category vs UI icons)
- Categories: house, comment, walking, brain, sparkles, book
- UI Elements: sun/moon, dice, volume

## Data Architecture

**Shared Category System (VerbTimeline & VerbTransform):**
- **6 Categories:** basics, daily, communication, movement, mental, experience
- **3 Difficulty Levels:** foundation (⭐), building (⭐⭐), mastery (⭐⭐⭐)
- **Consistent Structure:** Both apps use identical categorization for learning progression

**VerbTimeline Data:**
- **Categories:** Each category contains verbs organized by difficulty level
- **Irregular Verbs:** Special handling for past and participle forms
- **Conjugation Engine:** Handles both regular and irregular verb patterns
- **Pronouns:** Full set with proper conjugation rules
- **Contractions:** Complete support for common contractions (can't, won't, didn't, etc.)

**VerbTransform Data:**
- **Exercise Templates:** 90 base sentences (6 categories × 3 levels × 5 sentences)
- **Sentence Structure:** subject, verb, tense, complement for easy transformation
- **Exercise Generation:** 360 total possibilities (90 sentences × 4 target tenses)
- **Validation Logic:** Supports multiple correct answer variations and contractions

**State Management:**
- **VerbTimeline:** Centralized state in VerbTimelinePage component
- **VerbTransform:** Game state with scoring, progress, and exercise tracking
- **Shared Context:** Theme and layout state passed through React Router outlets
- **Analytics:** Integrated throughout user interactions for both apps

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
- **Name**: English Hub (umbrella brand for multiple learning tools)
- **Apps**: VerbTimeline (indigo theme), VerbTransform (green theme)
- **Design**: Professional, clean, consistent across all apps
- **Messaging**: Focus on "interactive learning" and "comprehensive English tools"
- **Target audience**: ESL students, teachers, self-learners worldwide

## Key Development Notes

**Always commit when finishing a task** - commits should be descriptive and comprehensive

**Design Philosophy:**
- Subtle and elegant (inspired by VerbTimeline aesthetic)
- Consistent color schemes across apps (tense colors: #E74C3C, #27AE60, #F39C12, #8E44AD, #3498DB)
- Responsive design with dark mode support
- Professional feel without overwhelming visual effects

**Code Quality:**
- Modular architecture with reusable components
- Clear separation between apps while sharing common utilities
- Comprehensive error handling and fallbacks
- TypeScript-ready structure with clear prop definitions

**User Experience:**
- Progressive difficulty through category and level selection
- Immediate feedback with elegant modals
- Gamification elements (scoring, streaks) for engagement
- Clean navigation between apps without losing context