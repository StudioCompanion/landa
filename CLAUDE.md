# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Turborepo monorepo** for Lane & Associates, containing a SvelteKit frontend (`web`) and a Sanity CMS (`cms`). The site is a portfolio website for a creative agency, featuring project galleries with advanced media handling including carousels, grids, and video playback (via Mux).

## Development Commands

### Root Level
```bash
# Install dependencies
yarn install

# Start development servers for both web and CMS
yarn dev
```

### Web App (web/)
```bash
cd web

# Development server (runs on http://0.0.0.0:5173)
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Type check
yarn check

# Type check with watch mode
yarn check:watch

# Lint code
yarn lint

# Format code
yarn format
```

### CMS (cms/)
```bash
cd cms

# Development server (Sanity Studio)
yarn dev

# Build Sanity Studio
yarn build

# Deploy Sanity Studio
yarn deploy

# Deploy GraphQL schema
yarn deploy-graphql
```

## Architecture

### Monorepo Structure
- **web/**: SvelteKit frontend application
- **cms/**: Sanity CMS Studio
- Uses Turborepo for orchestrating the monorepo

### Frontend (web/)

**Framework**: SvelteKit with TypeScript
**Key Dependencies**:
- `@sanity/client` - Fetching content from Sanity
- `@sanity/image-url` - Optimized image URL generation
- `@mux/mux-player` & `@mux/mux-video` - Video playback
- `siema` - Carousel functionality
- `@portabletext/svelte` - Rendering rich text from Sanity

**Routing Structure** (SvelteKit file-based routing):
- `/` - Homepage (shows featured projects)
- `/work` - Projects overview
- `/work/[slug]` - Individual project pages
- `/info` - About page
- `/tag/[slug]` - Tag/category pages (currently hidden in UI)

**Data Fetching Pattern**:
- Uses `+page.server.ts` files for server-side data fetching
- GROQ queries defined in `web/src/lib/queries.ts`
- Sanity client configured in `web/src/lib/sanity.ts`
- No `.env` file needed - Sanity config is hardcoded (projectId: `lr8k1ek3`, dataset: `prod`)

**Image Handling**:
- Custom responsive image system in `web/src/lib/sanity.ts`
- `getImageProps()` generates srcset with retina support
- `getImageDimensions()` extracts aspect ratio and type from Sanity image refs
- Breakpoints: 400px (mobile), 800px (tablet), 1280px (desktop), 1700px (large desktop), 2500px+ (giant desktop)

### CMS (cms/)

**Schema Structure**:
- **Documents**: `project`, `client`, `tag`, `settings`, `homepage`, `about`, `splashscreen`
- **Modules**: `carousel_module`, `grid_module`, `grid_carousel_module`, `media_module`, `content_module`
- **Objects**: `media`, `content`, `gridMedia`

**Key Features**:
- Uses `@sanity/orderable-document-list` for drag-and-drop ordering of projects, clients, and tags
- Mux integration for video uploads (`sanity-plugin-mux-input`)
- Media library plugin (`sanity-plugin-media`)
- Color picker plugin (`@sanity/color-input`)

**Content Model**:
- **Projects** have modules (carousel, grid, media, content) that compose the project page
- Projects can have either a `homepage_image` or `image_stack` for homepage display
- Optional `homepage_video` (auto-plays, muted, looping)
- `show_homepage` boolean determines if project appears on homepage
- Projects use `orderRank` for custom ordering

### Component Architecture (web/src/components/)

**Module Components** (map to CMS modules):
- `CarouselModule.svelte` - Image/video carousels with custom controls
- `GridModule.svelte` - Grid layouts (2-4 columns, various row configurations)
- `GridCarouselModule.svelte` - Carousel containing grid layouts
- `MediaModule.svelte` - Single media items
- `ContentModule.svelte` - Rich text content

**Supporting Components**:
- `VideoPlayer.svelte` - Handles both Mux videos and inline playback, with custom controls
- `Media.svelte` - Renders individual media items (images/videos)
- `MediaGrid.svelte` - Grid layout logic with size presets
- `MediaSlide.svelte` - Individual carousel slide
- `HomeProject.svelte` - Project cards on homepage with flicker animation effect
- `ProjectSummary.svelte` - Project cards on /work page
- `Flicker.svelte` - Homepage flicker/fade animation effect
- `Header.svelte` - Navigation
- `Footer.svelte` - Footer with contact info

### Media Handling

**Images**:
- Stored in Sanity, served via Sanity CDN
- Automatic WebP conversion
- Responsive srcset generation with 2x and 3x retina variants
- Supports hotspot/crop from Sanity

**Videos**:
- Hosted on Mux (via Sanity plugin)
- Two playback modes:
  - **Full videos**: Custom controls, play/pause, scrubbing
  - **Inline videos**: Autoplay in carousels, pause on slide change
- Video thumbnails required for homepage videos
- Aspect ratio preserved from Mux metadata

**Carousel Behavior**:
- Tap/click to advance (not just swipe)
- Videos play when slide becomes active
- Videos pause and reset when navigating away
- Image counter format: `1/10` (not `1 of 10`)

## Important Implementation Details

### Video Controls
- Black controls via `isBlackControls` flag in CMS
- Gradient backgrounds on video controls for readability
- Different control styles for full videos vs carousel videos

### Grid Layouts
- Support for 2-4 columns
- Various row configurations (1-2 rows)
- `sizePreset` field controls grid aspect ratios
- Max height capping to prevent excessive vertical space

### Homepage Behavior
- "Flicker" effect on project hover (see `Flicker.svelte` and `HomeProject.svelte`)
- Always shows at least two projects to indicate scrolling
- Projects with `image_stack` show first image only on mobile
- Fade-in animations when elements enter viewport

### Performance Optimizations
- FOUC (Flash of Unstyled Content) prevention on first visit
- Layout shift mitigation for galleries
- Lazy loading for images below the fold
- Video thumbnail placeholders

## Deployment

The site is deployable to Vercel directly from the monorepo. Vercel automatically detects the SvelteKit app. No environment variables are currently required as Sanity configuration is hardcoded.

## Known Issues / TODO

See README.md for the complete TODO list. Key outstanding items:
- Safari homepage videos not showing
- Some films not showing on mobile
- Cross-browser testing needed
- Performance & SEO optimization pass
- Code cleanup (remove unused CSS/JS/comments)
