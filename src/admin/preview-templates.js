/* ============================================================================
   PREVIEW TEMPLATES — panel pratinjau di halaman admin
   ----------------------------------------------------------------------------
   Membuat panel kanan di /admin menampilkan konten memakai markup + CSS yang
   SAMA dengan website asli, sehingga editor melihat hasil sesungguhnya sambil
   mengetik.

   ⚠️ CATATAN PENTING UNTUK TIM IT — WAJIB DIBACA
   File ini adalah "salinan tampilan" dari template asli di `src/pages/*.njk`.
   Artinya markup halaman ditulis di DUA tempat:
       1. src/pages/*.njk        -> yang benar-benar tayang di website
       2. file ini               -> yang tampil di panel pratinjau admin

   Kalau Anda mengubah struktur/kelas CSS pada template .njk, ubah juga di sini.
   Kalau tidak, pratinjau akan "berbohong" (editor melihat A, hasilnya B).

   Kalau beban perawatan ini dirasa tidak sepadan, file ini boleh DIHAPUS
   seluruhnya beserta baris <script> pemanggilnya di admin/index.html.
   Admin tetap berfungsi 100% — panel pratinjau hanya kembali ke tampilan
   bawaan Decap (daftar field polos).
   ========================================================================= */

(function () {
  var h = window.h || (window.React && window.React.createElement);
  if (!window.CMS || !h) return;

  /* Pakai CSS website asli di dalam panel pratinjau */
  CMS.registerPreviewStyle('/assets/css/styles.css?admin=1');
  CMS.registerPreviewStyle(
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap'
  );

  /* ---------------- util ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function arr(a) { return Array.isArray(a) ? a : []; }
  function pad(i) { return (i < 10 ? '0' : '') + i; }
  function img(src, alt, cls) {
    if (!src) return '';
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '"' + (cls ? ' class="' + cls + '"' : '') + '>';
  }

  /* ---------------- komponen berulang ---------------- */
  function sectionHead(d, centered) {
    if (!d) return '';
    return '<div class="section-head' + (centered ? ' centered' : '') + '">' +
      (d.eyebrow ? '<span class="eyebrow">' + esc(d.eyebrow) + '</span>' : '') +
      (d.heading ? '<h2 class="headline-lg">' + esc(d.heading) + '</h2>' : '') +
      (d.lede ? '<p class="lede body-md">' + esc(d.lede) + '</p>' : '') +
      '</div>';
  }
  function chips(list, crimson) {
    if (!arr(list).length) return '';
    return '<div class="chip-row">' + arr(list).map(function (c) {
      return '<span class="chip' + (crimson ? ' chip-crimson' : '') + '">' + esc(c) + '</span>';
    }).join('') + '</div>';
  }
  function pageHero(d) {
    if (!d) return '';
    return '<section class="page-hero"><div class="container"><div class="page-hero-inner">' +
      '<nav class="breadcrumb"><a href="#">Home</a><span class="sep">/</span>' +
      '<span class="current">' + esc(d.breadcrumb) + '</span></nav>' +
      '<span class="eyebrow">' + esc(d.eyebrow) + '</span>' +
      '<h1 class="headline-lg">' + esc(d.heading) + '</h1>' +
      '<p class="lede">' + esc(d.lede) + '</p>' +
      '</div></div></section>';
  }
  function statBand(items) {
    if (!arr(items).length) return '';
    return '<section class="stat-band"><div class="container"><div class="stat-band-grid">' +
      arr(items).map(function (s) {
        return '<div class="stat-cell"><div class="stat-lg">' + esc(s.value) +
          '</div><span class="label-caps">' + esc(s.label) + '</span></div>';
      }).join('') + '</div></div></section>';
  }
  function ctaBand(d) {
    if (!d) return '';
    return '<section class="cta-band"><div class="container cta-band-inner"><div>' +
      '<span class="label-caps">' + esc(d.label) + '</span>' +
      '<h2>' + esc(d.heading) + '</h2></div>' +
      '<div class="actions"><span class="btn btn-outline-light">Unduh Profil Perusahaan</span>' +
      '<span class="btn btn-dark" style="border-color:#fff;">Ajukan Konsultasi Teknis</span></div>' +
      '</div></section>';
  }
  function capTable(rows, dark) {
    return '<div class="cap-table"' + (dark ? ' style="max-width:860px;"' : ' style="margin-top:32px;"') + '>' +
      arr(rows).map(function (r, i) {
        var st = dark ? ' style="color:#fff;"' : '';
        var tr = dark ? ' style="background:#2b2b2b;border-color:#3d3d3d;"' : '';
        var fl = (dark && i % 2 === 1) ? ' style="background:var(--brand-rust);width:' + (r.pct || 0) + '%;"'
                                       : ' style="width:' + (r.pct || 0) + '%;"';
        return '<div class="cap-row"><span class="name"' + st + '>' + esc(r.name) + '</span>' +
          '<div class="track"' + tr + '><div class="fill"' + fl + '></div></div>' +
          '<span class="val"' + st + '>' + esc(r.value) + '</span></div>';
      }).join('') + '</div>';
  }
  function cardGrid(cards, prefix, cols) {
    return '<div class="grid-' + (cols || 3) + '">' + arr(cards).map(function (c, i) {
      return '<div class="card card-pad">' +
        (prefix ? '<span class="label-caps text-crimson">' + esc(prefix) + ' / ' + pad(i + 1) + '</span>' : '') +
        '<h3 class="headline-md mt-16">' + esc(c.title) + '</h3>' +
        '<p class="body-sm text-muted">' + esc(c.desc) + '</p></div>';
    }).join('') + '</div>';
  }
  function certCards(cards, cols) {
    return '<div class="grid-' + (cols || 3) + '">' + arr(cards).map(function (c) {
      return '<div class="cert-card"><div class="cert-code">' + esc(c.code) +
        '<small>' + esc(c.subtitle) + '</small></div><p>' + esc(c.desc) + '</p></div>';
    }).join('') + '</div>';
  }
  function wrap(inner) { return '<div class="vk-preview-body">' + inner + '</div>'; }

  /* Ikon SVG — disalin dari template .njk agar pratinjau identik dengan website */
  var SVG = {
    pin:   '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail:  '<rect x="3" y="5" width="18" height="14"/><path d="M3 7l9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    car:   '<path d="M3 16l2-6h14l2 6M5 16h14M7 16v2M17 16v2M8 10l1.5-4h5L16 10"/>',
    building: '<path d="M4 21V9l5-4v6l5-4v6l6-4v12M4 21h16M8 17h2M13 17h2"/>',
    gear:  '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/><circle cx="12" cy="12" r="3.2"/>',
    rig:   '<path d="M7 21V8a5 5 0 0 1 10 0v13M7 21h10M7 12h10M12 3v2"/>',
    bus:   '<path d="M5 17V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10M5 17h14M5 13h14M8 20l-1 1.5M16 20l1 1.5M8.5 17v3h7v-3"/>',
    factory: '<path d="M3 21h18M6 21V10l6-6 6 6v11M10 21v-5h4v5M9 10h6"/>'
  };
  function icon(key) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="square">' +
      (SVG[key] || SVG.factory) + '</svg>';
  }

  /* ---------------- HALAMAN: BERANDA ---------------- */
  function renderHome(d) {
    var hero = d.hero || {}, story = d.story || {}, sec = d.sectors || {},
        man = d.manufacturing || {}, trust = d.trust || {}, certs = d.certs || {};
    return wrap(
      '<section class="hero"><div class="hero-media">' + img(hero.image, hero.imageAlt) + '</div>' +
      '<div class="container"><div class="hero-inner">' +
        '<span class="hero-kicker">' + esc(hero.kicker) + '</span>' +
        '<h1 class="headline-xl">' + esc(hero.heading) + '</h1>' +
        '<p class="lede">' + esc(hero.lede) + '</p>' +
        '<div class="hero-ctas"><span class="btn btn-primary">Ajukan Konsultasi Teknis</span>' +
        '<span class="btn btn-outline-light">Unduh Profil Perusahaan</span></div>' +
      '</div></div></section>' +

      statBand((d.stats || {}).items) +

      '<section class="section"><div class="container"><div class="split"><div>' +
        '<span class="eyebrow">' + esc(story.eyebrow) + '</span>' +
        '<h2 class="headline-lg">' + esc(story.heading) + '</h2>' +
        '<p class="body-md mt-24">' + esc(story.p1) + '</p>' +
        '<p class="body-md mt-16 text-muted">' + esc(story.p2) + '</p>' +
        '<div class="mt-24">' + chips(story.chips) + '</div>' +
        '<div class="mt-32"><span class="btn btn-outline">' + esc(story.cta) + '</span></div>' +
      '</div><div class="media">' + img(story.image, story.imageAlt) + '</div></div></div></section>' +

      '<section class="section section-cream"><div class="container">' + sectionHead(sec) +
        '<div class="grid-3">' + arr(sec.cards).map(function (c) {
          return '<article class="sector-card"><div class="media">' + img(c.image, c.imageAlt) + '</div>' +
            '<div class="body"><span class="index">' + esc(c.index) + '</span>' +
            '<h3 class="headline-md">' + esc(c.title) + '</h3>' +
            '<p class="desc">' + esc(c.desc) + '</p>' + chips(c.chips) +
            '<div class="more"><span class="btn btn-outline">' + esc(sec.ctaLabel) + '</span></div>' +
            '</div></article>';
        }).join('') + '</div></div></section>' +

      '<section class="section"><div class="container"><div class="split">' +
        '<div class="media">' + img(man.image, man.imageAlt) + '</div><div>' +
        '<span class="eyebrow">' + esc(man.eyebrow) + '</span>' +
        '<h2 class="headline-lg">' + esc(man.heading) + '</h2>' +
        '<p class="body-md mt-24 text-muted">' + esc(man.lede) + '</p>' +
        capTable(man.capacities, false) +
        '<div class="mt-32"><span class="btn btn-outline">' + esc(man.cta) + '</span></div>' +
      '</div></div></div></section>' +

      '<section class="trust-strip"><div class="container" style="padding:40px 0;">' +
        '<p class="label-caps text-muted mb-24" style="text-align:center;">' + esc(trust.label) + '</p>' +
        '<div class="trust-grid">' + arr(trust.items).map(function (t) {
          return '<div class="trust-cell">' + img(t.logo, 'Logo ' + t.name) +
            '<span>' + esc(t.name) + '</span></div>';
        }).join('') + '</div></div></section>' +

      '<section class="section section-low"><div class="container">' + sectionHead(certs, true) +
        certCards(certs.cards) +
        '<div class="mt-48" style="text-align:center;"><span class="btn btn-outline">' + esc(certs.cta) + '</span></div>' +
      '</div></section>' +

      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: TENTANG KAMI ---------------- */
  function renderAbout(d) {
    var her = d.heritage || {}, com = d.commitment || {}, vis = d.vision || {}, jr = d.journey || {};
    return wrap(
      pageHero(d.hero) +
      '<section class="section"><div class="container"><div class="split">' +
        '<div class="media">' + img(her.image, her.imageAlt) + '</div><div>' +
        '<span class="eyebrow">' + esc(her.eyebrow) + '</span>' +
        '<h2 class="headline-lg">' + esc(her.heading) + '</h2>' +
        '<p class="body-md mt-24">' + esc(her.para) + '</p>' +
        '<ul class="spec-list mt-32">' + arr(her.specs).map(function (s) {
          return '<li><span class="k">' + esc(s.k) + '</span><span class="v">' + esc(s.v) + '</span></li>';
        }).join('') + '</ul>' +
      '</div></div></div></section>' +

      '<section class="section-dark" style="padding:64px 0;"><div class="container" style="text-align:center;">' +
        '<span class="label-caps" style="color:#D63F13;">' + esc(com.label) + '</span>' +
        '<p class="headline-md" style="color:#fff;max-width:860px;margin:20px auto 0;font-size:28px;line-height:40px;">' +
        esc(com.quote) + '</p></div></section>' +

      '<section class="section section-cream"><div class="container">' +
        sectionHead({ eyebrow: vis.eyebrow, heading: vis.heading }) +
        '<div class="card card-accent card-pad mb-32"><span class="label-caps text-crimson">' + esc(vis.visionLabel) + '</span>' +
        '<p class="headline-md mt-16" style="font-weight:600;font-size:22px;line-height:34px;">' + esc(vis.visionText) + '</p></div>' +
        '<div class="grid-2">' + arr(vis.missions).map(function (m, i) {
          return '<div class="card card-pad"><span class="label-caps text-crimson">' +
            esc(vis.missionLabel) + ' / ' + pad(i + 1) + '</span>' +
            '<h3 class="headline-md mt-16">' + esc(m.title) + '</h3>' +
            '<p class="body-sm text-muted">' + esc(m.desc) + '</p></div>';
        }).join('') + '</div></div></section>' +

      statBand((d.legacy || {}).items) +

      '<section class="section"><div class="container">' + sectionHead(jr) +
        '<div class="split" style="align-items:start;"><div class="timeline">' +
        arr(jr.items).map(function (it, i) {
          return '<div class="tl-item' + (it.major ? ' milestone-major' : '') + '"><span class="tl-node"></span>' +
            '<span class="tl-year">' + esc(it.year || (jr.milestonePrefix + ' / ' + pad(i + 1))) + '</span>' +
            '<h3>' + esc(it.title) + '</h3><p>' + esc(it.desc) + '</p></div>';
        }).join('') + '</div><div>' +
        '<div class="media" style="border:2px solid var(--stroke-dark);">' + img(jr.sideImage, jr.sideImageAlt) + '</div>' +
        '<div class="card card-accent card-pad mt-24"><span class="label-caps text-crimson">' +
          esc((jr.advantage || {}).label) + '</span><ul class="mt-16" style="display:flex;flex-direction:column;gap:14px;">' +
          arr((jr.advantage || {}).items).map(function (a) {
            return '<li><strong style="font-family:Montserrat,sans-serif;font-size:14px;">' + esc(a.title) +
              '</strong><br><span class="body-sm text-muted">' + esc(a.desc) + '</span></li>';
          }).join('') + '</ul></div></div></div></div></section>' +

      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: PRODUK ---------------- */
  function renderProducts(d) {
    var srv = d.services || {};
    return wrap(
      pageHero(d.hero) +
      arr(d.categories).map(function (cat) {
        return '<section class="section' + (cat.cream ? ' section-cream' : '') + '"><div class="container">' +
          sectionHead(cat) +
          arr(cat.products).map(function (p) {
            return '<article class="product-card"><div class="media">' + img(p.image, p.imageAlt) + '</div>' +
              '<div class="body"><div class="brand-line">' +
              '<h3 class="headline-md" style="font-size:28px;line-height:34px;">' + esc(p.name) + '</h3>' +
              '<span class="label-caps text-crimson">' + esc(p.tagline) + '</span></div>' +
              '<p class="desc">' + esc(p.desc) + '</p>' + chips(p.chips) + '</div></article>';
          }).join('') + '</div></section>';
      }).join('') +
      '<section class="section section-low"><div class="container">' + sectionHead(srv) +
        cardGrid(srv.cards, srv.labelPrefix, 3) + '</div></section>' +
      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: MANUFAKTUR ---------------- */
  function renderManufacturing(d) {
    var fac = d.facility || {}, cap = d.capacity || {}, st = d.stages || {}, qc = d.qc || {}, rnd = d.rnd || {};
    return wrap(
      pageHero(d.hero) +
      '<section class="section"><div class="container"><div class="split">' +
        '<div class="media">' + img(fac.image, fac.imageAlt) + '</div><div>' +
        '<span class="eyebrow">' + esc(fac.eyebrow) + '</span>' +
        '<h2 class="headline-lg">' + esc(fac.heading) + '</h2>' +
        '<ul class="feature-list mt-24">' + arr(fac.features).map(function (f, i) {
          return '<li><span class="num">' + pad(i + 1) + '</span><div><h4>' + esc(f.title) +
            '</h4><p>' + esc(f.desc) + '</p></div></li>';
        }).join('') + '</ul></div></div></div></section>' +

      '<section class="section section-dark"><div class="container">' + sectionHead(cap) +
        capTable(cap.rows, true) +
        '<p class="label-caps mt-32" style="color:#8b8888;">' + esc(cap.footnote) + '</p></div></section>' +

      '<section class="section"><div class="container">' +
        sectionHead({ eyebrow: st.eyebrow, heading: st.heading }) +
        '<div class="grid-3">' + arr(st.cards).map(function (c, i) {
          return '<figure class="sector-card"><div class="media">' + img(c.image, c.imageAlt) + '</div>' +
            '<div class="body"><span class="index">' + esc(st.labelPrefix) + ' / ' + pad(i + 1) + '</span>' +
            '<h3 class="subhead-sm">' + esc(c.title) + '</h3><p class="desc">' + esc(c.desc) + '</p></div></figure>';
        }).join('') + '</div></div></section>' +

      '<section class="section section-cream"><div class="container">' + sectionHead(qc) +
        '<div class="grid-4 mb-48">' + arr(qc.cards).map(function (c, i) {
          return '<div class="card card-accent card-pad"><span class="label-caps text-crimson">' +
            esc(qc.labelPrefix) + ' / ' + pad(i + 1) + '</span>' +
            '<h3 class="subhead-sm mt-16 mb-16">' + esc(c.title) + '</h3>' +
            '<p class="body-sm text-muted">' + esc(c.desc) + '</p></div>';
        }).join('') + '</div>' +
        '<h3 class="headline-md mb-24">' + esc(qc.equipmentTitle) + '</h3>' +
        '<div class="equip-grid">' + arr(qc.equipment).map(function (e) {
          return '<div class="equip-card"><div class="media">' + img(e.image, e.name) + '</div>' +
            '<div class="name">' + esc(e.name) + '</div></div>';
        }).join('') + '</div></div></section>' +

      '<section class="section"><div class="container">' + sectionHead(rnd) +
        '<div class="split mb-48"><div class="media" style="border:2px solid var(--stroke-dark);">' +
        img(rnd.image, rnd.imageAlt) + '</div><div>' +
        '<h3 class="headline-md mb-16">' + esc(rnd.focusTitle) + '</h3>' + chips(rnd.chips, true) +
        '<div class="media mt-32" style="border:2px solid var(--stroke-dark);">' + img(rnd.secondImage, rnd.secondImageAlt) +
        '</div></div></div>' + cardGrid(rnd.cards, rnd.labelPrefix, 3) + '</div></section>' +

      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: INDUSTRI ---------------- */
  function renderIndustries(d) {
    var v = d.verticals || {}, p = d.portfolio || {};
    return wrap(
      pageHero(d.hero) +
      '<section class="section"><div class="container"><div class="grid-3">' +
        arr(v.items).map(function (it, i) {
          return '<div class="industry-card"><div class="icon-box">' + icon(it.icon) + '</div>' +
            '<span class="label-caps text-crimson">' + esc(v.labelPrefix) + ' / ' + pad(i + 1) + '</span>' +
            '<h3>' + esc(it.title) + '</h3><p>' + esc(it.desc) + '</p></div>';
        }).join('') + '</div></div></section>' +
      '<section class="section section-cream"><div class="container">' + sectionHead(p) +
        '<div class="portfolio-grid">' + arr(p.items).map(function (it) {
          return '<article class="portfolio-item"><div class="media">' + img(it.image, it.imageAlt) + '</div>' +
            '<div class="caption"><span class="cat">' + esc(it.cat) + '</span>' +
            '<h3>' + esc(it.title) + '</h3><p>' + esc(it.desc) + '</p></div></article>';
        }).join('') + '</div></div></section>' +
      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: KLIEN ---------------- */
  function renderClients(d) {
    var certs = d.certs || {}, dist = d.distribution || {};
    return wrap(
      pageHero(d.hero) +
      '<section class="section"><div class="container">' + arr(d.groups).map(function (g) {
        return '<div class="client-group"><h3>' + esc(g.title) + '</h3><div class="client-grid">' +
          arr(g.clients).map(function (c) {
            return '<div class="client-cell">' +
              (c.logo ? '<span class="clogo">' + img(c.logo, 'Logo ' + c.name) + '</span>' : '') +
              '<span class="cname">' + esc(c.name) + '</span>' +
              '<span class="csub">' + esc(c.sub) + '</span></div>';
          }).join('') + '</div></div>';
      }).join('') + '</div></section>' +
      '<section class="section section-cream"><div class="container">' + sectionHead(certs) +
        '<div class="mb-24">' + certCards(certs.isoCards, 3) + '</div>' +
        certCards(certs.otherCards, 2) + '</div></section>' +
      '<section class="section"><div class="container">' + sectionHead(dist) +
        '<div class="map-wrap" style="text-align:center;padding:40px;">' +
        '<p class="label-caps text-muted">Peta interaktif tampil di website</p></div>' +
        '<div class="region-grid">' + arr(dist.regions).map(function (r) {
          return '<div class="region-col"><h3>' + esc(r.title) + '</h3><ul>' +
            arr(r.items).map(function (it) {
              return '<li><strong>' + esc(it.region) + '</strong>' + (it.cities ? ' — ' + esc(it.cities) : '') + '</li>';
            }).join('') + '</ul></div>';
        }).join('') + '</div></div></section>' +
      ctaBand(d.ctaBand)
    );
  }

  /* ---------------- HALAMAN: KONTAK ---------------- */
  function renderContact(d) {
    var info = d.info || {}, pc = d.profileCard || {}, f = d.form || {}, loc = d.location || {};
    function row(label, value, ik) {
      return '<div class="info-row"><div class="ic">' + icon(ik) + '</div><div><h4>' + esc(label) +
        '</h4><p>' + esc(value) + '</p></div></div>';
    }
    return wrap(
      pageHero(d.hero) +
      '<section class="section"><div class="container"><div class="contact-grid"><div>' +
        '<span class="eyebrow">' + esc(info.eyebrow) + '</span>' +
        '<h2 class="headline-md mb-24">' + esc(info.heading) + '</h2>' +
        '<div class="info-block">' +
          row(info.addressLabel, 'Jl. Surotokunto KM.5 Warungbambu, Karawang Timur, Jawa Barat 41371', 'pin') +
          row(info.phoneLabel, '+62 822-8000-5809', 'phone') +
          row(info.emailLabel, 'info@victorindokimiatama.com', 'mail') +
          row(info.websiteLabel, 'www.victorindokimiatama.com', 'globe') +
        '</div>' +
        '<div class="card card-accent card-pad mt-32"><span class="label-caps text-crimson">' + esc(pc.label) + '</span>' +
        '<p class="body-sm text-muted mt-16 mb-16">' + esc(pc.desc) + '</p>' +
        '<span class="btn btn-outline">Unduh Profil Perusahaan</span></div>' +
      '</div><div>' +
        '<span class="eyebrow">' + esc(f.eyebrow) + '</span>' +
        '<h2 class="headline-md mb-24">' + esc(f.heading) + '</h2>' +
        '<div class="form-panel"><div class="form-grid">' +
          '<div class="form-field"><label>' + esc(f.nameLabel) + ' <span class="req">*</span></label>' +
          '<input placeholder="' + esc(f.namePlaceholder) + '" disabled></div>' +
          '<div class="form-field"><label>' + esc(f.companyLabel) + '</label>' +
          '<input placeholder="' + esc(f.companyPlaceholder) + '" disabled></div>' +
          '<div class="form-field"><label>' + esc(f.emailLabel) + ' <span class="req">*</span></label>' +
          '<input placeholder="' + esc(f.emailPlaceholder) + '" disabled></div>' +
          '<div class="form-field"><label>' + esc(f.phoneLabel) + '</label>' +
          '<input placeholder="' + esc(f.phonePlaceholder) + '" disabled></div>' +
          '<div class="form-field full"><label>' + esc(f.industryLabel) + ' <span class="req">*</span></label>' +
          '<select disabled><option>' + esc(f.industryDefault) + '</option></select></div>' +
          '<div class="form-field full"><label>' + esc(f.messageLabel) + ' <span class="req">*</span></label>' +
          '<textarea rows="4" placeholder="' + esc(f.messagePlaceholder) + '" disabled></textarea></div>' +
        '</div><div class="mt-24"><span class="btn btn-primary">' + esc(f.submit) + '</span></div>' +
        '<p class="form-note">' + esc(f.note) + '</p></div>' +
      '</div></div></div></section>' +
      '<section class="section section-cream"><div class="container">' + sectionHead(loc) +
        '<div class="map-embed" style="text-align:center;padding:40px;">' +
        '<p class="label-caps text-muted">Peta lokasi tampil di website</p></div></div></section>'
    );
  }

  /* ---------------- daftarkan ke CMS ---------------- */
  function preview(renderer) {
    return function (props) {
      var data = {};
      try { data = props.entry.getIn(['data']).toJS(); } catch (e) { data = {}; }
      var html = '';
      try { html = renderer(data); }
      catch (err) { html = '<p style="padding:24px;font-family:monospace;color:#9A1208;">Pratinjau gagal dirender: ' + esc(err.message) + '</p>'; }
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    };
  }

  var map = {
    home: renderHome, about: renderAbout, products: renderProducts,
    manufacturing: renderManufacturing, industries: renderIndustries,
    clients: renderClients, contact: renderContact
  };
  Object.keys(map).forEach(function (name) {
    CMS.registerPreviewTemplate(name, preview(map[name]));
  });
})();
