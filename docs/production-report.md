# Studies Suggest — Production Report

**Sprint completed:** May 21, 2026  
**Target:** 20 articles  
**Achieved:** 20 articles  
**Sprint duration:** May 19–21, 2026 (approx. 48 hours)  
**Cron job:** `studiessuggest-article-sprint` (disabled after completion)

---

## Article Inventory

| # | Slug | Category | Counterintuition | Date |
|---|------|----------|-----------------|------|
| 1 | more-choices-less-satisfaction | 🧠 Psychology | ⚡⚡⚡ 3/5 | May 19 |
| 2 | violent-video-games-no-aggression-link | 🧠 Psychology | ⚡⚡⚡⚡ 4/5 | May 19 |
| 3 | stretching-before-exercise-no-injury-prevention | 🏋️ Fitness | ⚡⚡⚡ 3/5 | May 19 |
| 4 | exercise-minimal-effect-weight-loss | 🏋️ Fitness | ⚡⚡⚡⚡ 4/5 | May 19 |
| 5 | brainstorming-groups-fewer-ideas-than-individuals | 📊 Social Science | ⚡⚡⚡ 3/5 | May 19 |
| 6 | positive-affirmations-backfire-low-self-esteem | 🧠 Psychology | ⚡⚡⚡⚡ 4/5 | May 19 |
| 7 | antioxidant-supplements-increase-mortality | 🍽️ Nutrition | ⚡⚡⚡⚡ 4/5 | May 20 |
| 8 | open-offices-reduce-face-to-face-collaboration | 📊 Social Science | ⚡⚡⚡⚡ 4/5 | May 20 |
| 9 | scared-straight-programs-increase-juvenile-crime | ⚖️ Policy | ⚡⚡⚡⚡ 4/5 | May 20 |
| 10 | financial-literacy-education-no-effect-behavior | 💰 Economics | ⚡⚡⚡ 3/5 | May 20 |
| 11 | daylight-saving-time-increases-energy-use | 💰 Economics | ⚡⚡⚡ 3/5 | May 20 |
| 12 | houseplants-dont-purify-indoor-air | 🌍 Environment | ⚡⚡⚡ 3/5 | May 20 |
| 13 | breakfast-not-most-important-meal | 🍽️ Nutrition | ⚡⚡⚡⚡ 4/5 | May 20 |
| 14 | sleep-deprivation-rapidly-treats-depression | 🏥 Health | ⚡⚡⚡⚡ 4/5 | May 20 |
| 15 | wounds-heal-slower-at-night-circadian-clock | 🧬 Biology | ⚡⚡⚡⚡ 4/5 | May 20 |
| 16 | highlighting-rereading-least-effective-study-methods | 🎓 Education | ⚡⚡⚡ 3/5 | May 20 |
| 17 | learning-styles-no-evidence-matching-instruction | 🎓 Education | ⚡⚡⚡⚡ 4/5 | May 20 |
| 18 | cash-transfers-poor-invest-not-waste | 💰 Economics | ⚡⚡⚡⚡ 4/5 | May 20 |
| 19 | sugar-does-not-make-children-hyperactive | 🍽️ Nutrition | ⚡⚡⚡⚡ 4/5 | May 21 |
| 20 | knee-surgery-no-better-than-sham | 🏥 Health | ⚡⚡⚡⚡ 4/5 | May 21 |

## Category Distribution

| Category | Count |
|----------|-------|
| 🧠 Psychology | 3 |
| 🏥 Health | 2 |
| 💰 Economics | 3 |
| 🌍 Environment | 1 |
| 🍽️ Nutrition | 3 |
| 📊 Social Science | 2 |
| 🧬 Biology | 1 |
| 🎓 Education | 2 |
| ⚖️ Policy | 1 |
| 🏋️ Fitness | 2 |

**All 10 categories covered.** Psychology, Economics, and Nutrition lead with 3 articles each.

## Quality Summary

- **All articles passed 7-critic evaluation pipeline** with composite scores ≥8.0
- **Every study verified:** DOIs resolve, claims match papers, replication status documented
- **No banned phrases** in any published article
- **Em dash limit (≤3) respected** across all articles
- **Sentence rhythm gates passed** (variance ≥200, short ≤15%, long ≥15%)
- **Dual-voice TTS** (Adam + Eve) generated for all articles via ElevenLabs
- **Hero images** generated for all articles, converted to WebP

## Infrastructure

- **Repository:** github.com/rayhe/studiessuggest (main branch)
- **Hosting:** Cloudflare Pages (project: `studiessuggest`)
- **Domain:** studiessuggest.org
- **Audio:** ElevenLabs eleven_multilingual_v2, Adam (g14YnDYCsy3k7XLlcKlO) + Eve (56bWURjYFHyYyVf490Dp)
- **RSS feed:** studiessuggest.org/feed.xml
- **Sitemap:** studiessuggest.org/sitemap.xml

## What's Next

The sprint cron is now disabled. For ongoing article production, a daily cron at a sustainable cadence (1 article/day max per Ray's preference) could be set up as `studiessuggest-daily`. The site has a solid foundation across all 10 categories and is ready for steady-state publishing.
