/* story-nav.js — auto-inject share buttons + prev/next article nav on Studies Suggest story pages */
(function() {
  'use strict';

  // Article order (newest first) — matches homepage grid order
  var articles = [
    { slug: 'bed-rest-delays-back-pain-recovery', title: 'Doctors Prescribed Bed Rest for Back Pain for Decades. A Landmark Trial Found It Made Recovery Slower.' },
    { slug: 'video-game-surgeons-fewer-errors-faster', title: 'Surgeons Who Play Video Games Make 37% Fewer Errors and Operate 27% Faster' },
    { slug: 'rto-mandates-dont-improve-company-performance', title: 'Companies That Forced Workers Back to the Office Got Worse, Not Better. Three Studies Exposed the Damage.' },
    { slug: 'moderate-drinking-no-mortality-benefit', title: 'The Largest Study of Alcohol and Lifespan Found That "Moderate Drinking" Doesn\'t Help You Live Longer' },
    { slug: 'microcredit-doesnt-reduce-poverty', title: 'Microcredit Was Supposed to End Poverty. Six Randomized Trials Across Four Continents Found It Doesn\'t.' },
    { slug: 'open-offices-reduce-face-to-face-collaboration', title: 'Open Offices Were Designed to Boost Collaboration. A Harvard Study Found They Cut It by 70%.' },
    { slug: 'positive-affirmations-backfire-low-self-esteem', title: 'Repeating "I Am Lovable" Made People With Low Self-Esteem Feel Worse' },
    { slug: 'brainstorming-groups-fewer-ideas-than-individuals', title: 'Brainstorming in Groups Produces Fewer Ideas Than Working Alone' },
    { slug: 'stretching-before-exercise-no-injury-prevention', title: 'Stretching Before Exercise Does Not Prevent Injuries' },
    { slug: 'exercise-minimal-effect-weight-loss', title: 'Exercise Burns Far Fewer Calories Than You Think' },
    { slug: 'more-choices-less-satisfaction', title: 'More Options Make People Less Likely to Choose and Less Happy When They Do' },
    { slug: 'violent-video-games-no-aggression-link', title: 'The Largest Study of Video Game Violence Found No Link to Aggression' }
  ];

  var currentSlug = window.location.pathname.replace(/.*\/stories\//, '').replace(/\.html$/, '').replace(/\/$/, '');

  var currentIdx = -1;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].slug === currentSlug) { currentIdx = i; break; }
  }

  /* ── Share Buttons ── */
  var shareBar = document.querySelector('.share-bar');
  if (!shareBar) {
    var storyBody = document.querySelector('.story-body');
    if (storyBody) {
      shareBar = document.createElement('div');
      shareBar.className = 'share-bar';
      storyBody.parentNode.insertBefore(shareBar, storyBody);
    }
  }
  if (shareBar && !shareBar.hasChildNodes()) {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    shareBar.innerHTML =
      '<span class="share-label">Share</span>' +
      '<a class="share-btn" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '" target="_blank" rel="noopener" title="Share on X">𝕏</a>' +
      '<a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" rel="noopener" title="Share on Facebook">f</a>' +
      '<a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" rel="noopener" title="Share on LinkedIn">in</a>' +
      '<a class="share-btn" href="mailto:?subject=' + title + '&body=' + url + '" title="Email this article">✉</a>' +
      '<button class="share-btn share-copy" title="Copy link" onclick="navigator.clipboard.writeText(window.location.href).then(function(){this.textContent=\'✓\';var b=this;setTimeout(function(){b.textContent=\'🔗\'},1500)}.bind(this))">🔗</button>';
  }

  /* ── Prev / Next Nav ── */
  if (currentIdx >= 0) {
    var navContainer = document.querySelector('.article-nav');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.className = 'article-nav';
      var sources = document.querySelector('.sources');
      var bodyEnd = document.querySelector('.story-page');
      if (sources) { sources.parentNode.insertBefore(navContainer, sources.nextSibling); }
      else if (bodyEnd) { bodyEnd.appendChild(navContainer); }
    }

    var olderIdx = currentIdx + 1 < articles.length ? currentIdx + 1 : -1;
    var newerIdx = currentIdx - 1 >= 0 ? currentIdx - 1 : -1;

    var html = '';
    if (olderIdx >= 0) {
      html += '<a class="nav-link" href="/stories/' + articles[olderIdx].slug + '.html"><span class="nav-dir">← Older</span><span class="nav-title">' + articles[olderIdx].title + '</span></a>';
    } else {
      html += '<div class="nav-placeholder"></div>';
    }
    if (newerIdx >= 0) {
      html += '<a class="nav-link nav-newer" href="/stories/' + articles[newerIdx].slug + '.html"><span class="nav-dir">Newer →</span><span class="nav-title">' + articles[newerIdx].title + '</span></a>';
    }
    navContainer.innerHTML = html;
  }

})();
