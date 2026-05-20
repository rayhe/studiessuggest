/* story.js — Reading progress, dark mode, audio player with Adam/Eve voice selector, smooth scroll for Studies Suggest */
(function() {
  'use strict';

  /* ── Voice Selection (Adam/Eve, persisted in localStorage) ── */
  var VOICES = { adam: 'Adam', eve: 'Eve' };
  var voiceKey = 'ss-voice';
  var currentVoice = localStorage.getItem(voiceKey);
  if (!currentVoice || !VOICES[currentVoice]) {
    currentVoice = Math.random() < 0.5 ? 'adam' : 'eve';
    localStorage.setItem(voiceKey, currentVoice);
  }

  function setVoice(v) {
    currentVoice = v;
    localStorage.setItem(voiceKey, v);
    // Update all voice selectors on the page
    document.querySelectorAll('.voice-selector .voice-opt').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.voice === v);
    });
    // Update audio sources
    document.querySelectorAll('.audio-player').forEach(function(player) {
      var slug = player.dataset.slug;
      if (!slug) return;
      var newSrc = slug + '-' + v + '.mp3';
      var audioEl = player._audioElement;
      if (audioEl) {
        var wasPlaying = !audioEl.paused;
        var curTime = audioEl.currentTime;
        audioEl.src = newSrc;
        if (wasPlaying) {
          audioEl.currentTime = curTime;
          audioEl.play();
        }
      }
      player.dataset.src = newSrc;
    });
  }

  /* ── Theme (persist via localStorage) ── */
  var saved = localStorage.getItem('ss-theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');

  /* ── Reading Progress Bar ── */
  var progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.width = Math.min(progress, 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Dark Mode Toggle ── */
  document.querySelectorAll('.theme-toggle-story, .theme-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      var isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('ss-theme', isDark ? 'dark' : 'light');
    });
  });

  /* ── Audio Player with Voice Selector ── */
  document.querySelectorAll('.audio-player').forEach(function(player) {
    var btn = player.querySelector('.play-btn');
    var slug = player.dataset.slug;
    var progressFill = player.querySelector('.progress-fill');
    var durationLabel = player.querySelector('.audio-duration');

    if (!btn || !slug) return;

    // Set initial audio src based on current voice
    player.dataset.src = slug + '-' + currentVoice + '.mp3';

    // Inject voice selector into the player
    var selectorDiv = document.createElement('div');
    selectorDiv.className = 'voice-selector';
    selectorDiv.innerHTML =
      '<span class="voice-label">Voice:</span>' +
      '<button class="voice-opt' + (currentVoice === 'adam' ? ' active' : '') + '" data-voice="adam">Adam</button>' +
      '<button class="voice-opt' + (currentVoice === 'eve' ? ' active' : '') + '" data-voice="eve">Eve</button>';
    player.appendChild(selectorDiv);

    selectorDiv.querySelectorAll('.voice-opt').forEach(function(vbtn) {
      vbtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setVoice(this.dataset.voice);
      });
    });

    var audio = null;

    btn.addEventListener('click', function() {
      if (!audio) {
        audio = new Audio(player.dataset.src);
        player._audioElement = audio;
        audio.addEventListener('timeupdate', function() {
          if (audio.duration) {
            var pct = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = pct + '%';
            if (durationLabel) {
              var remain = Math.ceil(audio.duration - audio.currentTime);
              var m = Math.floor(remain / 60);
              var s = remain % 60;
              durationLabel.textContent = m + ':' + (s < 10 ? '0' : '') + s + ' remaining';
            }
          }
        });
        audio.addEventListener('ended', function() {
          btn.classList.remove('playing');
          btn.innerHTML = '&#9654;';
          if (progressFill) progressFill.style.width = '0';
          if (durationLabel) durationLabel.textContent = 'Finished';
        });
        audio.addEventListener('loadedmetadata', function() {
          if (durationLabel) {
            var dur = Math.ceil(audio.duration);
            var m = Math.floor(dur / 60);
            var s = dur % 60;
            durationLabel.textContent = m + ':' + (s < 10 ? '0' : '') + s;
          }
        });
      } else {
        // Check if source changed
        var expectedSrc = slug + '-' + currentVoice + '.mp3';
        if (!audio.src.endsWith(expectedSrc)) {
          var wasTime = audio.currentTime;
          audio.src = expectedSrc;
          audio.currentTime = wasTime;
        }
      }
      if (audio.paused) {
        document.querySelectorAll('.audio-player').forEach(function(p) {
          if (p._audioElement && p !== player) {
            p._audioElement.pause();
            var ob = p.querySelector('.play-btn');
            if (ob) { ob.classList.remove('playing'); ob.innerHTML = '&#9654;'; }
          }
        });
        audio.play();
        btn.classList.add('playing');
        btn.innerHTML = '&#10074;&#10074;';
      } else {
        audio.pause();
        btn.classList.remove('playing');
        btn.innerHTML = '&#9654;';
      }
    });

    // Click on progress bar to seek
    var bar = player.querySelector('.progress-bar');
    if (bar) {
      bar.addEventListener('click', function(e) {
        if (audio && audio.duration) {
          var rect = bar.getBoundingClientRect();
          var pct = (e.clientX - rect.left) / rect.width;
          audio.currentTime = pct * audio.duration;
        }
      });
    }
  });

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Table Wrapper for Mobile Scroll ── */
  document.querySelectorAll('.story-body table').forEach(function(table) {
    if (!table.parentElement.classList.contains('table-scroll-wrapper')) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

})();
