(function () {
  var started = false;
  var audioPool = [];
  var historyTrapArmed = false;
  var reseedTimer = null;
  var flashTimer = null;
  var glitchTimer = null;
  var effectsStopTimer = null;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getAudio(index) {
    if (!audioPool[index]) {
      var audio = new Audio('media/prankaudio.mp3');
      audio.loop = true;
      audio.volume = 1;
      audioPool[index] = audio;
    }
    return audioPool[index];
  }

  function addOverlay() {
    if (document.getElementById('chuche-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'chuche-overlay';
    overlay.innerHTML = '<div class="prank-fix-text">' +
      '<div class="prank-fix-small">Presented by</div>' +
      '<div class="prank-fix-main">CHUCHA</div>' +
      '<div class="prank-fix-small">Developer: crdy</div>' +
      '<div class="prank-fix-small">Creator: @22ritikthakur</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var style = document.createElement('style');
    style.textContent = '@keyframes prankFixHue{0%{filter:hue-rotate(0deg) invert(0)}50%{filter:hue-rotate(180deg) invert(1)}100%{filter:hue-rotate(360deg) invert(0)}}' +
      '@keyframes prankFixPulse{0%,100%{transform:scale(1) rotate(-1deg)}50%{transform:scale(1.1) rotate(1deg)}}' +
      '@keyframes prankFixStrobe{0%{background:rgba(255,0,0,.98)}10%{background:rgba(255,255,255,.98)}20%{background:rgba(0,255,0,.98)}30%{background:rgba(0,0,0,.98)}40%{background:rgba(0,0,255,.98)}50%{background:rgba(255,255,0,.98)}60%{background:rgba(255,0,255,.98)}70%{background:rgba(0,255,255,.98)}80%{background:rgba(255,255,255,.98)}90%{background:rgba(0,0,0,.98)}100%{background:rgba(255,0,0,.98)}}' +
      '@keyframes prankFixShake{0%,100%{transform:translate(0,0)}20%{transform:translate(-18px,12px)}40%{transform:translate(16px,-14px)}60%{transform:translate(-10px,-18px)}80%{transform:translate(14px,10px)}}' +
      '#chuche-overlay{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:prankFixStrobe .055s steps(1,end) infinite,prankFixHue .09s linear infinite;mix-blend-mode:difference}' +
      '.prank-fix-text{text-align:center;font-family:serif;font-weight:900;text-transform:uppercase;letter-spacing:.28em;color:#fff;text-shadow:0 0 18px #f00,0 0 40px #0ff,0 0 70px #fff;animation:prankFixPulse .22s linear infinite}' +
      '.prank-fix-main{font-size:clamp(4rem,16vw,12rem);line-height:.9}' +
      '.prank-fix-small{font-size:clamp(1rem,3vw,2rem);margin:1rem 0}' +
      '.prank-fix-flash{position:fixed;inset:-30vmax;z-index:2147483646;pointer-events:none;mix-blend-mode:difference}' +
      '.prank-fix-slice{position:fixed;left:-10vw;width:120vw;z-index:2147483645;pointer-events:none;mix-blend-mode:screen;box-shadow:0 0 40px currentColor}' +
      '.prank-fix-active{animation:prankFixShake .08s steps(2,end) infinite!important;filter:contrast(190%) saturate(260%) hue-rotate(90deg)!important}' +
      '@media (prefers-reduced-motion:reduce){#chuche-overlay,.prank-fix-text,.prank-fix-active{animation:none!important}.prank-fix-flash,.prank-fix-slice{display:none!important}}';
    document.head.appendChild(style);
  }

  function startFlashes() {
    if (prefersReducedMotion()) return;
    if (flashTimer) return;
    document.documentElement.classList.add('prank-fix-active');
    flashTimer = setInterval(function () {
      for (var i = 0; i < 24; i += 1) {
        var flash = document.createElement('div');
        flash.className = 'prank-fix-flash';
        flash.style.background = 'hsl(' + Math.floor(Math.random() * 360) + ' 100% 55%)';
        flash.style.opacity = String(0.55 + Math.random() * 0.45);
        flash.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg) scale(' + (0.8 + Math.random() * 3.4) + ')';
        flash.style.filter = 'blur(' + Math.floor(Math.random() * 12) + 'px) contrast(320%) saturate(420%)';
        document.body.appendChild(flash);
        setTimeout(function (node) {
          node.remove();
        }, 45 + Math.random() * 120, flash);
      }

      for (var j = 0; j < 10; j += 1) {
        var slice = document.createElement('div');
        slice.className = 'prank-fix-slice';
        slice.style.top = Math.floor(Math.random() * 100) + 'vh';
        slice.style.height = Math.floor(6 + Math.random() * 90) + 'px';
        slice.style.color = 'hsl(' + Math.floor(Math.random() * 360) + ' 100% 60%)';
        slice.style.background = 'currentColor';
        slice.style.opacity = String(0.35 + Math.random() * 0.5);
        slice.style.transform = 'skewX(' + Math.floor(-30 + Math.random() * 60) + 'deg) translateX(' + Math.floor(-60 + Math.random() * 120) + 'px)';
        document.body.appendChild(slice);
        setTimeout(function (node) {
          node.remove();
        }, 55 + Math.random() * 160, slice);
      }
    }, 38);

    glitchTimer = setInterval(function () {
      document.documentElement.style.setProperty('--prank-fix-x', Math.floor(-30 + Math.random() * 60) + 'px');
      document.body.style.transform = 'translate(' + Math.floor(-16 + Math.random() * 32) + 'px,' + Math.floor(-16 + Math.random() * 32) + 'px) scale(1.01)';
      setTimeout(function () {
        document.body.style.transform = '';
      }, 45);
    }, 120);

    clearTimeout(effectsStopTimer);
    effectsStopTimer = setTimeout(stopIntenseEffects, 12000);
  }

  function stopIntenseEffects() {
    clearInterval(flashTimer);
    clearInterval(glitchTimer);
    flashTimer = null;
    glitchTimer = null;
    document.documentElement.classList.remove('prank-fix-active');
    document.body.style.transform = '';
    Array.prototype.forEach.call(document.querySelectorAll('.prank-fix-flash,.prank-fix-slice'), function (node) {
      node.remove();
    });
  }

  function startPrank(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }

    started = true;
    armHistoryTrap();
    for (var i = 0; i < 10; i += 1) {
      (function (index) {
        setTimeout(function () {
          var audio = getAudio(index);
          audio.volume = 1;
          audio.currentTime = 0;
          audio.play().catch(function () {});
        }, index * 35);
      })(i);
    }

    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    }

    document.body.classList.add('rgb-active');
    addOverlay();
    startFlashes();
  }

  function armHistoryTrap() {
    if (historyTrapArmed) return;
    historyTrapArmed = true;

    try {
      history.replaceState({ prank: true }, '', location.href);
      for (var i = 0; i < 40; i += 1) {
        history.pushState({ prank: true, step: i }, '', location.href);
      }
    } catch (error) {}

    reseedTimer = setInterval(function () {
      if (!started) return;
      try {
        history.pushState({ prank: true, tick: Date.now() }, '', location.href);
      } catch (error) {}
    }, 450);

    window.addEventListener('popstate', function () {
      try {
        history.go(1);
        history.pushState({ prank: true, bounce: Date.now() }, '', location.href);
      } catch (error) {}
      if (started) startPrank();
    });

    window.addEventListener('hashchange', function () {
      if (!started) return;
      try {
        history.pushState({ prank: true, hash: Date.now() }, '', location.href);
      } catch (error) {}
      startPrank();
    });
  }

  function startFromFirstGesture(event) {
    if (started) return;
    var target = event.target.closest('input, textarea, select, option, [contenteditable="true"]');
    if (target) return;
    startPrank(event);
  }

  document.addEventListener('click', function (event) {
    var target = event.target.closest('a, button, [role="button"], .cursor-pointer');
    if (!target) return;
    if (target.closest('header, nav, [data-navbar], [data-mobile-menu]')) return;

    var text = (target.textContent || '').toLowerCase();
    var href = target.getAttribute('href') || '';
    if (text.indexOf('explore gallery') !== -1 || text.indexOf('commission') !== -1 || href.indexOf('#gallery') !== -1 || href.indexOf('#contact') !== -1) {
      startPrank(event);
    }
  }, true);

  document.addEventListener('pointerdown', startFromFirstGesture, true);
  document.addEventListener('keydown', startFromFirstGesture, true);
  document.addEventListener('touchstart', startFromFirstGesture, true);
  armHistoryTrap();

  window.addEventListener('beforeunload', function (event) {
    if (!started) return;
    startPrank();
    event.preventDefault();
    event.returnValue = '';
  });
})();
