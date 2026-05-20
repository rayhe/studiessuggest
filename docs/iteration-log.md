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

## Iteration 2: Article Quality Audit
**Timestamp:** 2026-05-20 08:30 PT
**Focus:** Article quality — sourcing verification, DOI checks, prose accuracy, banned phrases, related articles
**Changes:**
- Fixed violent-video-games OG title: was truncated to just "Violent Video Games", restored full title for proper social sharing
- Fixed exercise-weight-loss body text: said "Nature Communications" but source is Communications Medicine (a Nature Portfolio journal, but different title)
- Fixed positive-affirmations fabricated source: "A 2024 systematic review of 129 studies" was unverifiable — replaced with Epton et al. (2015) meta-analysis of 144 experimental tests (doi:10.1037/hea0000116), a real PubMed-indexed meta-analysis with matching claims about values-based affirmation effectiveness
- Added Epton et al. (2015) to positive-affirmations Sources section
- Added Related Reading sections to all 6 articles (2 cross-links each, required by STORY_GUIDE but missing from all articles)
- Added .related-articles CSS styling with arrow bullets, accent colors, hover underlines
- Verified all 6 primary DOIs resolve (HTTP 302 redirects confirmed)
- Scanned all articles for STORY_GUIDE banned phrases — none found
- Checked em dash counts: all within ≤3 limit (highest is more-choices at 2 in content)
- Study Cards verified complete across all articles (all 11 required fields present)
**Commit:** aaec4c7
**Deploy:** https://9a67d079.studiessuggest.pages.dev (Cloudflare Pages)

## Iteration 3 (Final): Site Audit, SEO, UX, Validation & Report
**Timestamp:** 2026-05-20 09:30 PT
**Focus:** Final review — full site audit, JSON-LD structured data, share buttons, bug fixes, validation script, report
**Changes:**
- **Bug fix:** Removed duplicate closing tags (</div>, <script>, </body>, </html>) at end of open-offices article
- **JSON-LD:** Added Article structured data (schema.org) to all 7 story pages with headline, author, datePublished, publisher, image, url, mainEntityOfPage
- **JSON-LD:** Added WebSite structured data to homepage
- **Share buttons:** Populated empty share bars on all 7 articles with Copy Link, X/Twitter, LinkedIn, and Email share buttons
- **UX fix:** Fixed "All" category filter button to use filterCategory('all') onclick instead of href="/"
- **Validation script:** Created `scripts/validate.sh` checking HTML structure, images, audio, sitemap, RSS, JSON-LD, OG tags, canonical URLs, image sizes
- **Validation result:** 0 errors, 0 warnings across all checks
- **Full audit passed:** All 7 DOIs verified, all images present, all audio files present, sitemap and RSS feed match article count, OG tags and canonical URLs on all pages
**Commit:** cfeb851
**Deploy:** https://66779246.studiessuggest.pages.dev (Cloudflare Pages)
