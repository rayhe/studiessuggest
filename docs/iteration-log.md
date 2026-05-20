# Studies Suggest — Iteration Log

## Iteration 1: Design Polish
**Timestamp:** 2026-05-20 00:30 PT
**Focus:** Design polish — CSS, typography, accessibility, mobile, meta tags
**Changes:**
- Added SVG leaf favicon matching nature brand theme
- Added Open Graph + Twitter Card meta tags to all 6 story pages (title, description, image, type, URL)
- Added canonical URLs to homepage and all articles
- Created OG default image for homepage shares
- Added skip-to-content link for keyboard accessibility
- Added `focus-visible` outline styles for keyboard navigation in both `style.css` and `story.css`
- Added `::selection` styling with green tint matching theme in both stylesheets
- Added comprehensive print styles: hides UI chrome (header, nav, audio player, share bar, progress bar), proper page-break rules for study cards/sources, URL expansion for links
- Added reading time estimates ("5 min read") to all 5 article cards and featured card byline
- Added botanical divider (🌿 🍃 🌿) before article grid for visual rhythm
- Improved hero section: subtle accent gradient line at top
- Tighter letter-spacing (-0.5px) on hero h1
- Improved footer: added about blurb describing the site's mission, visual separator
- Mobile drawer: added dark mode toggle, auto-close on category select
- Card meta layout improved with gap for 3-item display (date, reading time, score)
**Commit:** e541386
**Deploy:** https://51789bdf.studiessuggest.pages.dev (Cloudflare Pages)
