/* story.js — Reading progress, dark mode, audio player, smooth scroll for Studies Suggest */
(function() {
  'use strict';

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

  /* ── Audio Player ── */
  document.querySelectorAll('.audio-player').forEach(function(player) {
    var btn = player.querySelector('.play-btn');
    var audioSrc = player.dataset.src;
    var progressBar = player.querySelector('.progress-fill');
    var durationLabel = player.querySelector('.audio-duration');
    var audio = null;

    if (!btn || !audioSrc) return;

    btn.addEventListener('click', function() {
      if (!audio) {
        audio = new Audio(audioSrc);
        audio.addEventListener('timeupdate', function() {
          if (audio.duration) {
            var pct = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = pct + '%';
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
          if (progressBar) progressBar.style.width = '0';
        });
        audio.addEventListener('loadedmetadata', function() {
          if (durationLabel) {
            var dur = Math.ceil(audio.duration);
            var m = Math.floor(dur / 60);
            var s = dur % 60;
            durationLabel.textContent = m + ':' + (s < 10 ? '0' : '') + s;
          }
        });
      }
      if (audio.paused) {
        // Pause any other players on the page
        document.querySelectorAll('.audio-player audio').forEach(function(a) { a.pause(); });
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
