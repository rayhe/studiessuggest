# Studies Suggest — Audio Narration Guide

## Overview
Every published article includes a TTS audio narration accessible via a play button in the article header. Audio is generated during the publish pipeline and stored alongside the article HTML.

## Voice
All narration uses a single voice:

| Name | Voice ID | Model |
|------|----------|-------|
| mark | `OyWVL9LW2StlLFuOJIvc` | `eleven_multilingual_v2` |

**Do not rotate voices. Do not substitute.** Every article uses mark.

## API Details
- **Provider:** ElevenLabs
- **API Key:** `sk_4c3debb934ab6c750684bb27208577c1cfb9bbb136c05eda`
- **Endpoint:** `https://api.elevenlabs.io/v1/text-to-speech/OyWVL9LW2StlLFuOJIvc`
- **Model:** `eleven_multilingual_v2`
- **Output format:** MP3 (mp3_44100_128)

## Pipeline Integration

### During Article Publish
1. Extract article body text from the HTML (strip tags, keep paragraph structure)
2. Prepend the headline and byline as a spoken intro: "Studies Suggest. [Headline]. By [Author]."
3. Call ElevenLabs TTS API with the full text
4. Save as `stories/{article-slug}.mp3`
5. Add the audio player to the article HTML (see template below)

### Audio Player Template
Insert this in the article header, after the byline and before the hero image:

```html
<div class="audio-player" id="audioPlayer">
  <button class="audio-btn" onclick="toggleAudio()" aria-label="Listen to article">
    <span class="audio-icon" id="audioIcon">🎧</span>
    <span class="audio-label" id="audioLabel">Listen to this article</span>
  </button>
  <audio id="articleAudio" src="{article-slug}.mp3" preload="none"></audio>
  <div class="audio-progress" id="audioProgress" style="display:none">
    <div class="audio-bar"><div class="audio-fill" id="audioFill"></div></div>
    <span class="audio-time" id="audioTime">0:00</span>
  </div>
</div>
```

### Audio Player Styles (in story.css)
```css
.audio-player {
  margin: 16px 0 24px;
  padding: 12px 16px;
  background: var(--study-card-bg, #f5f2eb);
  border: 1px solid var(--border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.audio-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: var(--sans);
}
.audio-btn:hover { background: var(--accent-hover); }
.audio-progress {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}
.audio-bar {
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.audio-fill {
  height: 100%;
  width: 0%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.3s;
}
.audio-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--sans);
  min-width: 32px;
}
```

### Audio Player JS (in story.js)
```javascript
function toggleAudio() {
  var audio = document.getElementById('articleAudio');
  var icon = document.getElementById('audioIcon');
  var label = document.getElementById('audioLabel');
  var progress = document.getElementById('audioProgress');
  if (!audio) return;
  if (audio.paused) {
    audio.play();
    icon.textContent = '⏸';
    label.textContent = 'Pause';
    progress.style.display = 'flex';
  } else {
    audio.pause();
    icon.textContent = '🎧';
    label.textContent = 'Listen to this article';
  }
}
// Update progress bar
(function() {
  var audio = document.getElementById('articleAudio');
  if (!audio) return;
  audio.addEventListener('timeupdate', function() {
    var fill = document.getElementById('audioFill');
    var time = document.getElementById('audioTime');
    if (fill && audio.duration) {
      fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
    }
    if (time) {
      var m = Math.floor(audio.currentTime / 60);
      var s = Math.floor(audio.currentTime % 60);
      time.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    }
  });
  audio.addEventListener('ended', function() {
    var icon = document.getElementById('audioIcon');
    var label = document.getElementById('audioLabel');
    if (icon) icon.textContent = '🎧';
    if (label) label.textContent = 'Listen again';
  });
})();
```

## ElevenLabs API Call Example
```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/OyWVL9LW2StlLFuOJIvc" \
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
  --output stories/article-slug.mp3
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
