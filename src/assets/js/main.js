/* PT Victorindo Kimiatama — global behaviour */
(function () {
  'use strict';

  var LANG = document.documentElement.lang === 'id' ? 'id' : 'en';

  /* Language toggle: remember preference; send returning visitors to their language */
  document.querySelectorAll('.lang-toggle a').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('vk-lang', this.textContent.trim().toLowerCase()); } catch (e) { /* private mode */ }
    });
  });
  try {
    var pref = localStorage.getItem('vk-lang');
    var isRootIndex = /^\/(index\.html)?$/.test(window.location.pathname);
    if (pref === 'id' && LANG === 'en' && isRootIndex) {
      window.location.replace('/id/');
    }
  } catch (e) { /* private mode */ }

  /* Mobile navigation toggle */
  var nav = document.querySelector('.topnav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Production capacity bars — animate width when scrolled into view */
  var capRows = document.querySelectorAll('.cap-row');
  if (capRows.length) {
    var animate = function (row) {
      var fill = row.querySelector('.fill');
      if (fill && fill.dataset.pct) fill.style.width = fill.dataset.pct + '%';
    };
    if ('IntersectionObserver' in window) {
      var capIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animate(e.target); capIo.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      capRows.forEach(function (r) { capIo.observe(r); });
    } else {
      capRows.forEach(animate);
    }
  }

  /* Technical inquiry form validation */
  var form = document.getElementById('inquiry-form');
  if (form) {
    var setInvalid = function (name, invalid) {
      var field = form.querySelector('[data-field="' + name + '"]');
      if (field) field.classList.toggle('invalid', invalid);
      return !invalid;
    };
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var industry = form.elements['industry'].value;
      var message = form.elements['message'].value.trim();

      var ok = true;
      ok = setInvalid('name', name.length < 2) && ok;
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      var freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'ymail.com'];
      var domain = email.split('@')[1] ? email.split('@')[1].toLowerCase() : '';
      var corporate = emailOk && freeDomains.indexOf(domain) === -1;
      ok = setInvalid('email', !corporate) && ok;
      ok = setInvalid('industry', industry === '') && ok;
      ok = setInvalid('message', message.length < 10) && ok;
      if (!ok) return;

      var company = form.elements['company'].value.trim();
      var phone = form.elements['phone'].value.trim();
      var subject = (LANG === 'id' ? 'Permintaan Konsultasi Teknis — ' : 'Technical Consultation Request — ') + (company || name);
      var body = 'Name: ' + name + '\nCompany: ' + company + '\nEmail: ' + email +
        '\nPhone: ' + phone + '\nIndustry: ' + industry + '\n\nMessage:\n' + message;
      window.location.href = 'mailto:info@victorindokimiatama.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      var success = document.getElementById('form-success');
      if (success) success.classList.add('show');
      form.reset();
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
