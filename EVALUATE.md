# Studies Suggest — Article Evaluation Pipeline

## Overview
Every article passes through a 7-critic evaluation pipeline before publication. Each critic scores independently. An article must pass ALL hard gates and achieve a minimum composite score to ship.

## The 7 Critics

### 1. 🔍 General Editor
**Focus:** Overall quality, structure, engagement, readability
- Does the headline accurately state the counterintuitive finding?
- Is the deck compelling without being clickbait?
- Does the article flow logically from conventional wisdom → study → implications?
- Is the 800–1,200 word count respected?
- Are related articles linked?
- Score: 1–10

### 2. 🗣️ Voice Coach
**Focus:** AI tells, banned phrases, sentence rhythm, naturalness
- Check banned phrases list (STORY_GUIDE.md) — any hit = automatic fail
- Count em dashes — more than 3 = automatic fail
- Run sentence rhythm check:
  - Sentence length variance ≥ 200?
  - Short sentences (<8 words) ≤ 15%?
  - Long complex sentences (>20 words) ≥ 15%?
- Does the writing sound human? Varied rhythm, real personality, not a metronome?
- Score: 1–10 (0 if hard gate fails)

### 3. 🔬 Research Verification Critic (NEW — HARD GATE)
**Focus:** Is the featured study real, replicated, and not cherry-picked?
This is the critic that enforces the Research Verification Protocol from STORY_GUIDE.md.

**Checklist (all must pass):**
- [ ] **Study exists:** DOI resolves. Paper is published in a peer-reviewed journal (or preprint status is explicitly noted).
- [ ] **Claims match:** The article's characterization of the study's findings matches what the paper actually says. No exaggeration, no misattribution.
- [ ] **Sample size disclosed:** n is stated in the Study Card. If n < 100, a flag must be present.
- [ ] **Methodology stated:** RCT / observational / meta-analysis / etc. is explicit.
- [ ] **Effect size reported:** Cohen's d, OR, RR, or equivalent — not just "statistically significant."
- [ ] **Replication status checked:** Study Card states replication status. If "Not yet replicated," this is flagged as a limitation in the body.
- [ ] **Debunking search performed:** No evidence the study has been retracted, debunked, or seriously challenged without that being addressed in the article.
- [ ] **Not cherry-picked:** The study isn't an outlier contradicted by the weight of evidence. If a meta-analysis exists on the topic, it's referenced.
- [ ] **Counterintuition is genuine:** The "conventional wisdom" being challenged is actually conventional — not a strawman nobody believes.

**Scoring:**
- All boxes checked = 8–10 (depending on depth of verification)
- One unchecked = 5–7 (with explanation of what's missing)
- DOI doesn't resolve OR claims don't match paper = 0 (automatic fail, do not publish)
- Study is retracted or debunked without acknowledgment = 0 (automatic fail)

### 4. ⚖️ Fairness & Counterargument Reviewer
**Focus:** Strongest counterargument, intellectual honesty, balance
- Is the strongest case against the thesis stated at full strength?
- Is the conventional wisdom described accurately (not strawmanned)?
- Are limitations honestly acknowledged in a dedicated section?
- Does the article avoid advocacy masquerading as analysis?
- Score: 1–10

### 5. 📱 Social & Shareability
**Focus:** Pull quotes, share triggers, headline strength
- Would someone share this headline? Does it pass the "I had no idea" test?
- Are there 2–3 quotable sentences that work as standalone shares?
- Does the Study Card work as a visual share element?
- Score: 1–10

### 6. 📊 Data Presentation
**Focus:** Numbers, tables, visual hierarchy
- Are effect sizes contextualized for a general audience?
- Are comparisons apples-to-apples?
- Does every number have a human-scale anchor?
- Is the Study Card complete and accurately formatted?
- If the article has no quantitative data: score N/A
- Score: 1–10 or N/A

### 7. 🎧 Audio & Production
**Focus:** Audio narration, image, metadata completeness
- Is the MP3 file generated and linked? (See AUDIO.md)
- Is the hero image present and appropriate?
- Are all meta tags (OG, Twitter Card, JSON-LD) complete?
- Is the article in index.html, sitemap.xml, and feed.xml?
- Score: 1–10

## Scoring

### Composite Score
Average of all scored critics (exclude N/A). Scale: 1–10.

### Hard Gates (any failure = do not publish)
1. **Banned phrase detected** (Voice Coach) → rewrite
2. **Em dashes > 3** (Voice Coach) → rewrite
3. **Sentence rhythm fails** (Voice Coach) → rewrite
4. **DOI doesn't resolve** (Verification Critic) → kill article or find correct DOI
5. **Claims don't match paper** (Verification Critic) → rewrite with accurate claims
6. **Study retracted/debunked without acknowledgment** (Verification Critic) → kill or reframe
7. **No Study Card** → add Study Card
8. **No actionable insights** → add "What You Can Do" section
9. **No limitations section** → add "What We Didn't Prove" section

### Publication Thresholds
- **≥ 8.0 composite, 0 hard gate failures** → publish
- **7.0–7.9 composite, 0 hard gate failures** → publish with noted improvements for next article
- **< 7.0 composite OR any hard gate failure** → revise and re-evaluate

## Running the Pipeline

### For the daily cron (automated)
1. Research and verify study (Verification Protocol from STORY_GUIDE.md)
2. Draft article with all required elements
3. Run all 7 critics
4. If hard gates pass and composite ≥ 7.0: generate audio, hero image, publish
5. If fails: log failure reason, do not publish, try next study

### For manual review
Run critics one by one. Document scores in a review block at the end of the draft. Example:

```
<!-- REVIEW
General Editor: 8/10 — clean structure, headline is strong
Voice Coach: 9/10 — rhythm passes, no banned phrases, 1 em dash
Verification: 9/10 — DOI verified, replicated 3x, meta-analyzed
Fairness: 8/10 — counterargument from Ioannidis addressed well
Social: 7/10 — headline shareable, could use stronger pull quote
Data: 8/10 — effect sizes contextualized, comparison table clear
Audio: 10/10 — MP3 generated, metadata complete
COMPOSITE: 8.4/10 — PUBLISH
-->
```
