# Studies Suggest — Audio Narration Guide

## Overview
Every published article includes TTS audio narration with a voice selector. Readers choose between two voices: **Adam** and **Eve**. The selection is random on first visit, then persists via localStorage across pages and sessions.

## Voices

| Name | Voice ID | Notes |
|------|----------|-------|
| Adam | `g14YnDYCsy3k7XLlcKlO` | Male narrator |
| Eve | `56bWURjYFHyYyVf490Dp` | Female narrator |

Legacy voice (do not delete existing files, but no longer used for new articles):

| Name | Voice ID | Notes |
|------|----------|-------|
| mark | `OyWVL9LW2StlLFuOJIvc` | Original single-voice narrator |

## API Details
- **Provider:** ElevenLabs
- **API Key:** `sk_4c3debb934ab6c750684bb27208577c1cfb9bbb136c05eda`
- **Adam endpoint:** `https://api.elevenlabs.io/v1/text-to-speech/g14YnDYCsy3k7XLlcKlO`
- **Eve endpoint:** `https://api.elevenlabs.io/v1/text-to-speech/56bWURjYFHyYyVf490Dp`
- **Model:** `eleven_multilingual_v2`
- **Output format:** MP3 (mp3_44100_128)

## File Naming Convention
Each article gets TWO audio files:
- `stories/{slug}-adam.mp3`
- `stories/{slug}-eve.mp3`

Legacy files (`stories/{slug}.mp3`) are kept but not referenced by the player.

## Pipeline Integration

### During Article Publish
1. Extract article body text from the HTML (strip tags, keep paragraph structure)
2. Prepend the headline and byline as a spoken intro: "Studies Suggest. [Headline]. By [Author]."
3. Call ElevenLabs TTS API **twice** — once for Adam, once for Eve
4. Save as `stories/{slug}-adam.mp3` and `stories/{slug}-eve.mp3`
5. Add the audio player HTML with `data-slug="{slug}"` (NOT `data-src`)

### Audio Player HTML Template
Insert in the article header, after the byline and before the hero image:

```html
<div class="audio-player" data-slug="{article-slug}">
  <button class="play-btn" aria-label="Listen to article">&#9654;</button>
  <div class="audio-info">
    <div class="audio-label">Listen to this article</div>
    <div class="audio-duration">Loading...</div>
    <div class="progress-bar"><div class="progress-fill"></div></div>
  </div>
</div>
```

**Important:** Use `data-slug` (not `data-src`). The JS constructs the filename dynamically: `{slug}-{voice}.mp3` based on the user's voice selection.

The voice selector UI (Adam/Eve toggle buttons) is injected by `story.js` automatically — do not add it to the HTML template.

### Voice Selection Logic (in story.js)
- On first visit: randomly picks Adam or Eve, saves to `localStorage` key `ss-voice`
- On subsequent visits: reads from `localStorage`
- User can toggle between voices via buttons in the audio player
- Switching voice mid-playback preserves the playback position
- Choice persists across articles and browser sessions

### Audio Player Styles (in story.css)
The `.voice-selector` styles are at the end of story.css. The selector sits inside `.audio-player` and auto-aligns to the right. On mobile (<520px) it wraps to a new line.

## ElevenLabs API Call Example
```bash
# Generate Adam version
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/g14YnDYCsy3k7XLlcKlO" \
  -H "xi-api-key: sk_4c3debb934ab6c750684bb27208577c1cfb9bbb136c05eda" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Studies Suggest. [headline]. By [author]. [body text...]",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75,
      "style": 0.3
    }
  }' \
  --output stories/article-slug-adam.mp3

# Generate Eve version
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/56bWURjYFHyYyVf490Dp" \
  -H "xi-api-key: sk_4c3debb934ab6c750684bb27208577c1cfb9bbb136c05eda" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Studies Suggest. [headline]. By [author]. [body text...]",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75,
      "style": 0.3
    }
  }' \
  --output stories/article-slug-eve.mp3
```

## Text Preparation Rules
- Strip all HTML tags from article body
- Convert tables to readable prose ("The study found X in group A versus Y in group B")
- Spell out abbreviations on first use
- Remove source reference numbers ("[1]", "[2]") — they don't work in audio
- Keep the Study Card data — read it as: "The study: [title], by [authors], published in [journal]. Sample size: [n]. Method: [method]. Key finding: [finding]."
- Total text length should be under 5,000 characters per API call; split longer articles into chunks and concatenate the MP3s

## Failure Handling
- If ElevenLabs API fails (rate limit, timeout), retry 3 times with exponential backoff
- If all retries fail, publish the article without audio and log the failure — audio can be generated later
- Never block article publication on audio generation failure
