# Studies Suggest — Story Guide

## Mission
Every article surfaces a genuinely counterintuitive scientific finding — one that challenges conventional wisdom, has real evidence behind it, and hasn't been debunked. The hook is surprise; the substance is rigor.

## Voice
A smart, curious friend walking you through research that made them rethink something. Data-heavy, never sensational, occasionally wry. Like a great science journalist explaining a paper at a dinner party — you leave knowing more than you did, and questioning something you thought was settled.

## Template

### Structure
1. **Headline** — States the counterintuitive finding clearly. Contains specifics (numbers, study name, or concrete claim). Avoid clickbait framing — the study itself is surprising enough.
2. **Kicker** — Category tag (🧠 Psychology, 🏥 Health, 💰 Economics, 🌍 Environment, 🍽️ Nutrition, 📊 Social Science, 🧬 Biology, 🎓 Education, ⚖️ Policy, 🏋️ Fitness)
3. **Deck** — One-sentence summary with the key finding and study context
4. **Byline** — Journalist name + beat
5. **Date** — Always today's actual date (NEVER future dates)
6. **Audio narration** — TTS play button (see AUDIO.md for full spec)
7. **Hero image** — Generated landscape, atmospheric, nature-inspired palette. No text overlay.
8. **Study Card** — Structured box (REQUIRED, see below)
9. **Body** — 800–1,200 words
   - Open with the conventional wisdom being challenged
   - Introduce the study that overturns it
   - Walk through methodology and findings
   - Engage with the strongest counterargument
   - Include "What We Didn't Prove" limitations section
   - End with "The Bottom Line" — what this means for the reader
   - Include "What You Can Do" actionable takeaways
10. **Related articles** — 2–3 links to other stories
11. **Sources** — Numbered list with hyperlinked DOIs/URLs

### Study Card (REQUIRED — HARD GATE)
Every article MUST include a structured study card rendered as a styled box. No article publishes without it.

```html
<div class="study-card">
  <h3>📋 The Study</h3>
  <table>
    <tr><td><strong>Title</strong></td><td>[Full study title]</td></tr>
    <tr><td><strong>Authors</strong></td><td>[Lead author et al., year]</td></tr>
    <tr><td><strong>Institution</strong></td><td>[University/lab]</td></tr>
    <tr><td><strong>Journal</strong></td><td>[Journal name, volume, pages]</td></tr>
    <tr><td><strong>DOI</strong></td><td><a href="https://doi.org/...">[DOI link]</a></td></tr>
    <tr><td><strong>Sample</strong></td><td>[n=X, population description]</td></tr>
    <tr><td><strong>Method</strong></td><td>[RCT / meta-analysis / cohort / etc.]</td></tr>
    <tr><td><strong>Key Finding</strong></td><td>[One-sentence result]</td></tr>
    <tr><td><strong>Effect Size</strong></td><td>[Cohen's d, OR, RR, or equivalent]</td></tr>
    <tr><td><strong>Counterintuition</strong></td><td>[⚡⚡⚡⚡ 4/5]</td></tr>
    <tr><td><strong>Replication</strong></td><td>[Replicated / Partially / Not yet / Meta-analyzed]</td></tr>
  </table>
</div>
```

### Counterintuition Score (1–5)
- ⚡ (1) — Mildly surprising
- ⚡⚡ (2) — Goes against casual intuition
- ⚡⚡⚡ (3) — Contradicts common practice or popular belief
- ⚡⚡⚡⚡ (4) — Overturns professional consensus or guidelines
- ⚡⚡⚡⚡⚡ (5) — Demolishes a foundational assumption of the field

Target: most articles should be 3–4. A score of 5 requires extraordinary evidence.

### Replication Status (REQUIRED)
Every study card must state one of:
- **Replicated** — At least one independent replication with consistent results
- **Partially replicated** — Some replications succeeded, others didn't; explain
- **Meta-analyzed** — Included in a meta-analysis; state the pooled effect
- **Not yet replicated** — Only the original study; flag prominently
- **Pre-registered** — Study was pre-registered (bonus credibility)
- **Challenged** — Subsequent work questions the finding; explain

---

## Research Verification Protocol (REQUIRED — HARD GATE)

**No article publishes without passing verification.** This is not optional.

### Verification Steps (all mandatory)

#### Step 1: Find the Original Study
- Locate the actual paper via DOI, PubMed, Google Scholar, or journal website
- Confirm the paper exists, is published (not just a preprint unless noted), and claims attributed to it are accurate
- Read at least the abstract, methods, and results — not just press coverage
- Record: DOI, journal, authors, publication date, sample size

#### Step 2: Check Replication Status
- Search for replications, follow-up studies, or contradictory findings
- Check Google Scholar "Cited by" for the original paper
- Look for meta-analyses that include the study
- If no replications exist, flag prominently as a limitation

#### Step 3: Check for Debunking or Retraction
- Search Retraction Watch database
- Check PubPeer for post-publication commentary
- Search for "[study topic] debunked" / "[study topic] failed replication" / "[author name] retraction"
- If seriously challenged, either don't write the article or make the challenge central

#### Step 4: Verify Methodology Soundness
- Is the sample size adequate for the claimed effect? (n=12 claiming universals = red flag)
- Is it RCT, observational, case study? Does methodology match claim strength?
- Are there obvious uncontrolled confounders?
- Is the effect size meaningful, not just statistically significant?

#### Step 5: Assess Novelty and Coverage
- Has this been covered extensively? If "10 blue links" already cover it, find a fresher angle or different study
- Prioritize: under-reported findings from major journals, recent replications that overturn headlines, meta-analyses with surprising aggregated results
- Ideal article features a study the reader hasn't encountered yet

### Verification Failures — What to Do
- **Retracted or debunked:** Do NOT publish. Move on.
- **Seriously challenged, no resolution:** Write as debate piece. Title must reflect uncertainty.
- **Single unreplicated small-n finding:** Proceed with heavy caveats. Flag in Study Card. Lower CI Score.
- **Claims exaggerated by press coverage:** Write about what the study ACTUALLY found, not the headline version.

---

## Scholarly Rigor Requirements

### Original Contribution (Required)
Every article must contain at least one original finding, calculation, or novel analysis. Examples:
- A calculation nobody ran ("If this effect holds at population scale, X million people are affected")
- A dataset combination nobody made
- A comparison nobody drew

Synthesis alone does not count.

### Limitations Acknowledgment (Required)
Dedicated section. Not inline hedging.

Bad: "Of course, more research is needed."
Good: "This analysis relies on a single cohort of 1,847 Finnish adults. The effect hasn't been tested outside Northern Europe, and the 0.3 SD difference may not be clinically meaningful for individuals below the 40th percentile."

### Strongest Counterargument (Required)
Stated at full strength. Not strawmanned, not immediately dismissed.

Bad: "Critics disagree, but the data clearly shows otherwise."
Good: "The strongest case against this finding is Andrew Gelman's 2019 critique: the original p-value of 0.04 sits in the 'garden of forking paths' — with enough researcher degrees of freedom, a result this marginal could emerge from noise."

### Verifiability (Required)
Every factual claim traceable to a cited source. Hyperlink DOIs inline.

### Methodology Transparency (Required for numerical claims)
Show the math — inputs, assumptions, calculation.

### Actionable Insights (Required — HARD GATE)
Every article MUST include actionable takeaways. The reader finishes knowing what to DO, not just what to THINK.

---

## Categories
| Emoji | Category | Beats |
|-------|----------|-------|
| 🧠 | Psychology | Cognition, behavior, decision-making, social psych |
| 🏥 | Health | Medicine, epidemiology, public health |
| 💰 | Economics | Behavioral econ, market research, policy effects |
| 🌍 | Environment | Climate, ecology, conservation |
| 🍽️ | Nutrition | Diet, food science, supplements |
| 📊 | Social Science | Sociology, political science, demographics |
| 🧬 | Biology | Evolution, genetics, neuroscience |
| 🎓 | Education | Pedagogy, learning science, academic outcomes |
| ⚖️ | Policy | Law, regulation, governance effects |
| 🏋️ | Fitness | Exercise science, sports medicine, performance |

## Byline Philosophy
A byline is a voice, a perspective, a consistent editorial identity. **NEVER** add disclaimers or "AI-generated" labels. Content stands on cited sources and honest analysis.

## Banned Phrases
Hard gate — zero tolerance:
- "In a world where..." / "In an era of..."
- "It's worth noting..." / "It's important to note..."
- "This is a testament to..."
- "At the end of the day..."
- "It remains to be seen..."
- "Sheds light on..." / "Paves the way for..."
- "Raises important questions..."
- "Groundbreaking" (unless quoting)
- "Game-changer" / "game-changing"
- "Paradigm shift" (unless discussing Kuhn)
- "Holistic" (unless medical context)
- "Delves into" / "delve"
- "Navigating" (when not literal)
- "Tapestry" / "Bustling"
- "Landscape" (when not literal)
- "Underscores"
- "Moreover" / "Furthermore" / "Additionally" (as paragraph openers)

## Em Dash Limit
≤ 3 em dashes per article. Hard gate.

## Sentence Rhythm Gate (HARD GATE)
- **Sentence length variance:** ≥ 200
- **Short sentences (<8 words):** ≤ 15%
- **Long complex sentences (>20 words):** ≥ 15%
