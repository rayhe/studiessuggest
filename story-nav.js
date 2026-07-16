/* story-nav.js — auto-inject share buttons + prev/next article nav on Studies Suggest story pages */
(function() {
  'use strict';

  // Article order (newest first) — matches homepage grid order
  var articles = [
    { slug: 'air-pollution-increases-violent-crime', title: 'Dirty Air Doesn\'t Just Damage Lungs. A Study of 2 Million Chicago Crimes Found Pollution Increased Violent Assaults — With No Effect on Property Crime.' },
    { slug: 'sauna-bathing-reduces-mortality', title: 'A 21-Year Study of 2,315 Middle-Aged Men Found Those Who Used a Sauna Four to Seven Times a Week Had 40% Lower Mortality and 63% Fewer Sudden Cardiac Deaths.' },
    { slug: 'placebo-sleep-affects-cognition', title: 'Researchers Told 164 People They Slept Poorly. Their Cognitive Performance Dropped — Even Though Their Actual Sleep Was Fine.' },
    { slug: 'honey-outperforms-cough-treatments', title: 'Doctors Dismiss Honey as Folk Medicine. An Oxford Meta-Analysis of 1,761 Patients Found It Relieves Coughs and Colds Better Than Standard Treatments.' },
    { slug: 'failing-first-improves-learning', title: 'Every Classroom Teaches the Lesson Before Assigning Problems. A Meta-Analysis of 53 Studies Found Students Learn More Deeply When They Struggle and Fail First.' },
    { slug: 'fasting-windows-dont-boost-weight-loss', title: 'Millions Follow the 16:8 Rule: Eat for Eight Hours, Fast for Sixteen, Lose More Weight. A Year-Long NEJM Trial Found the Fasting Window Adds Nothing.' },
    { slug: 'outdoor-light-prevents-childhood-myopia', title: 'Every Parent Limits Screen Time to Protect Their Child\'s Eyes. A Randomized Trial of 1,903 Children Found That Adding 40 Minutes of Outdoor Time Cut Nearsightedness by 23%.' },
    { slug: 'nostalgia-was-a-disease-now-it-heals', title: 'For 300 Years, Doctors Classified Nostalgia as a Potentially Fatal Disease. Seven Studies Found It Actually Strengthens Mental Health.' },
    { slug: 'speed-reading-is-just-skimming', title: 'Speed Reading Apps Promise 1,000 Words per Minute. A Review of Decades of Eye-Tracking Research Found the Entire Premise Is Biologically Impossible.' },
    { slug: 'swearing-increases-pain-tolerance', title: 'Everyone Told You to Watch Your Mouth. Six Experiments Found Swearing Increases Pain Tolerance — but Frequent Swearers Get Almost No Benefit.' },
    { slug: 'loneliness-deadlier-than-obesity', title: 'Your Doctor Worries About Your Weight. Not Your Friendships. A Meta-Analysis of 308,849 People Found Social Isolation Is Deadlier Than Obesity.' },
    { slug: 'bystanders-almost-always-intervene', title: 'The Most Famous Finding in Social Psychology Says Bystanders Won\'t Help. Surveillance Footage from Three Countries Found They Intervene 91% of the Time.' },
    { slug: 'people-like-you-more-than-you-think', title: 'Humans Are Overconfident About Almost Everything. Five Studies Found the One Exception: After Conversations, People Systematically Underestimate How Much Others Liked Them.' },
    { slug: 'overweight-lower-mortality-than-normal-bmi', title: 'BMI Guidelines Say Overweight Is a Health Risk. A JAMA Meta-Analysis of 2.88 Million People Found Those Classified as Overweight Were Less Likely to Die Than Those at \'Normal\' Weight.' },
    { slug: 'expensive-wine-tastes-no-better', title: 'Everyone Believes Expensive Wine Tastes Better. In 6,175 Blind Tastings, the Correlation Between Price and Enjoyment Was Negative.' },
    { slug: 'humans-cannot-detect-lies', title: 'Police, Judges, and Federal Agents Are Trained to Spot Liars. A Meta-Analysis of 206 Studies Found They Perform No Better Than Untrained College Students.' },
    { slug: 'farm-dust-protects-children-asthma', title: 'Parents Sanitize Everything to Protect Their Children. Amish Children Who Grow Up in Barn Dust Have One-Quarter the Asthma Rate of Their Genetically Similar Neighbors.' },
    { slug: 'sweeteners-impair-glucose-tolerance', title: 'Artificial Sweeteners Were Assumed to Be Metabolically Inert. A Randomized Trial of 120 Adults Found Saccharin and Sucralose Impaired Blood Sugar by Disrupting the Gut Microbiome.' },
    { slug: 'chili-peppers-reduce-mortality', title: 'Everyone Warns You That Spicy Food Will Ruin Your Stomach. A Meta-Analysis of 570,762 Adults Found Regular Chili Pepper Consumption Reduces Mortality Risk by 12%.' },
    { slug: 'dying-is-unexpectedly-positive', title: 'Everyone Imagines Dying as Dreadful. An Analysis of 2,616 Blog Posts by Terminal Patients Found Their Words Grew More Positive as Death Approached.' },
    { slug: 'six-hours-sleep-impaired-as-total-deprivation', title: 'One in Three Americans Sleeps Six Hours a Night and Feels Fine. A Controlled Experiment Found Their Brains Worked as Poorly as if They\'d Been Awake for Two Days Straight.' },
    { slug: 'social-interaction-prevents-drug-addiction-rats', title: 'Addiction Hijacks the Brain So Nothing Else Matters. NIH Researchers Found That Even \'Addicted\' Rats Chose a Friend Over Methamphetamine Every Time.' },
    { slug: 'thought-suppression-improves-mental-health', title: 'Therapists Tell You Never to Suppress Negative Thoughts. A Cambridge Study of 120 People Across 16 Countries Found Suppression Training Reduced Depression for Three Months.' },
    { slug: 'fidgeting-protects-against-sitting-mortality', title: 'Your Teacher Told You to Stop Fidgeting. A 12-Year Study of 12,778 Women Found Fidgeting Eliminated the Deadly Risk of Prolonged Sitting.' },
    { slug: 'cold-showers-reduce-sick-days', title: 'Your Mother Told You Cold Would Make You Sick. A Randomized Trial of 3,018 Adults Found Cold Showers Cut Sick Days by 29%.' },
    { slug: 'early-peanut-introduction-prevents-allergy', title: 'Pediatricians Told Parents to Keep Peanuts Away from Babies Until Age Three. A Trial of 640 Infants Found That Feeding Them Peanuts Early Cut Allergy by 81%.' },
    { slug: 'prostate-monitoring-matches-surgery-survival', title: 'Every Instinct Says to Fight Cancer with Surgery. A 15-Year Trial of 1,643 Men Found That Monitoring Prostate Cancer Achieves the Same Survival Rate.' },
    { slug: 'trigger-warnings-dont-reduce-distress', title: 'Every University Adds Trigger Warnings to Protect Students. A Meta-Analysis of 7,000 Participants Found They Increase Anxiety Without Reducing Distress.' },
    { slug: 'strangers-commute-happier-than-solitude', title: 'Everyone on Your Train Is Avoiding Everyone Else. Nine Experiments Found They\'d All Be Happier If They Talked.' },
    { slug: 'paying-blood-donors-reduces-supply', title: 'Paying Blood Donors $7 Should Have Increased Supply. In a Swedish Field Experiment, It Cut Female Donations Nearly in Half.' },
    { slug: 'four-thousand-steps-cut-mortality', title: 'Everyone Chases 10,000 Steps a Day. That Number Was a 1965 Marketing Slogan. A Meta-Analysis of 226,889 People Found You Need Fewer Than 4,000.' },
    { slug: 'screen-time-tiny-effect-teen-mental-health', title: 'Every Parent Worries About Screen Time. A Study of 355,358 Adolescents Found It Explains Less of Their Well-Being Than Wearing Glasses or Eating Potatoes.' },
    { slug: 'music-training-does-not-boost-intelligence', title: '80% of Americans Believe Music Lessons Make Kids Smarter. A Meta-Analysis of 54 Studies and 6,984 Children Found the Effect Is Zero.' },
    { slug: 'willpower-not-a-limited-resource', title: 'Your Willpower Doesn\'t Run Out. Two Preregistered Studies With 5,672 Participants Across 59 Labs Found the \'Ego Depletion\' Effect Is Essentially Zero.' },
    { slug: 'patient-satisfaction-higher-mortality', title: 'Hospitals Spend Billions Making Patients Happy. A Study of 51,946 Adults Found the Most Satisfied Patients Were 26% More Likely to Die.' },
    { slug: 'experienced-doctors-worse-outcomes', title: 'Everyone Wants the Most Experienced Doctor. A Study of 736,537 Hospitalizations Found Patients of Older Physicians Had Higher Mortality.' },
    { slug: 'foreign-language-changes-moral-decisions', title: 'People Who Speak a Foreign Language Make Different Moral Choices. A Meta-Analysis of 38 Experiments Found the Language You Think In Reshapes What You Think Is Right.' },
    { slug: 'recreational-running-protects-knees', title: 'Your Doctor Told You Running Would Ruin Your Knees. A Meta-Analysis of 125,810 People Found Runners Get Less Arthritis Than Couch Potatoes.' },
    { slug: 'acetaminophen-reduces-empathy-for-pain', title: '52 Million Americans Take Acetaminophen Every Week. Two Double-Blind Trials Found It Also Reduces Their Empathy.' },
    { slug: 'trauma-debriefing-increases-ptsd', title: 'Talking Through Trauma Right After It Happens Seems Obviously Helpful. A Cochrane Review of 15 Trials Found It Can Make PTSD Worse.' },
    { slug: 'open-label-placebos-work-without-deception', title: 'Patients Who Knew They Were Taking Sugar Pills Still Got Better. A Meta-Analysis of 60 Trials Exposed the Paradox.' },
    { slug: 'hospital-readmission-penalties-increased-deaths', title: 'Medicare Penalized Hospitals for Readmitting Patients. A Study of 8 Million Cases Found It Increased Deaths.' },
    { slug: 'ice-baths-cut-muscle-growth', title: 'Athletes Swear by Ice Baths for Recovery. A 12-Week Trial Found They Cut Muscle Growth by Two-Thirds.' },
    { slug: 'nba-playoff-officiating-bias-series-extension', title: 'NBA Playoff Series Go to Seven Games Less Often Than Math Predicts. The Rigging Theory Gets the Numbers Backward.' },
    { slug: 'venting-anger-increases-aggression', title: 'Rage Rooms Charge $50 to Smash Things. A Meta-Analysis of 154 Studies Found Venting Anger Makes It Worse.' },
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
    { slug: 'violent-video-games-no-aggression-link', title: 'The Largest Study of Video Game Violence Found No Link to Aggression' },
    { slug: 'antioxidant-supplements-increase-mortality', title: 'Taking Antioxidant Supplements Raises Your Risk of Dying. A Review of 296,707 People Exposed the Paradox.' },
    { slug: 'breakfast-not-most-important-meal', title: 'Breakfast Is Not the Most Important Meal of the Day' },
    { slug: 'cash-transfers-poor-invest-not-waste', title: 'Poor Families Given $709 With No Strings Attached Spent Less on Alcohol, Not More' },
    { slug: 'daylight-saving-time-increases-energy-use', title: 'Daylight Saving Time Was Created to Save Energy. A Study of 7 Million Indiana Households Found It Does the Opposite.' },
    { slug: 'financial-literacy-education-no-effect-behavior', title: 'Billions Are Spent Teaching People About Money. A Meta-Analysis of 168 Studies Found It Explains 0.1% of Their Financial Behavior.' },
    { slug: 'highlighting-rereading-least-effective-study-methods', title: 'Highlighting and Rereading Are Nearly Useless: A Review of Hundreds of Experiments Found Only 2 of 10 Common Study Strategies Actually Work' },
    { slug: 'houseplants-dont-purify-indoor-air', title: 'Your Houseplants Aren\'t Cleaning the Air. A 30-Year Review Found They\'d Need to Outnumber Your Furniture 100 to 1.' },
    { slug: 'knee-surgery-no-better-than-sham', title: '700,000 Knee Surgeries a Year. A Sham-Controlled Trial Found the Procedure Works No Better Than Placebo.' },
    { slug: 'learning-styles-no-evidence-matching-instruction', title: '93% of Teachers Believe in Learning Styles. After Reviewing All the Evidence, Four Psychologists Found Almost None.' },
    { slug: 'meta-conclusion-what-evidence-tells-us', title: 'We Reviewed 25 Counterintuitive Findings. One Pattern Explains Why Bad Ideas Survive Good Evidence.' },
    { slug: 'scared-straight-programs-increase-juvenile-crime', title: '"Scared Straight" Programs Were Supposed to Deter Crime. Nine Randomized Trials Found They Increased It.' },
    { slug: 'sleep-deprivation-rapidly-treats-depression', title: 'Skipping a Single Night of Sleep Relieves Depression Faster Than Any Known Drug' },
    { slug: 'sugar-does-not-make-children-hyperactive', title: 'Sugar Does Not Make Children Hyperactive: A Meta-Analysis of 23 Studies Found Zero Evidence' },
    { slug: 'wounds-heal-slower-at-night-circadian-clock', title: 'Your Wounds Heal 60% Slower at Night Because Your Skin Cells Keep Their Own Clock' }
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
