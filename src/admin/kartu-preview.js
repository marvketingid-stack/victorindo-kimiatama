/* ============================================================================
   PRATINJAU "🪪 Kartu Nama Karyawan" di /admin + QR code siap unduh.
   Dimuat oleh admin/index.html setelah decap-cms.js dan qrcode-generator.
   Tampilan halaman aslinya: src/_includes/layouts/kartu.njk
   ========================================================================= */
(function () {
  var h = window.h || (window.React && window.React.createElement);
  if (!window.CMS || !h) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------------- 🪪 Kartu Nama Karyawan ----------------
     Pratinjau ringkas + QR code yang bisa langsung diunduh (PNG untuk umum, SVG untuk
     percetakan). Tampilan halaman aslinya ada di src/_includes/layouts/kartu.njk.
     QR dibuat oleh library qrcode-generator (dimuat di admin/index.html). */
  var KARTU_BASE = 'https://victorindokimiatama.com/kartu/';

  function kartuSlug(props, nama) {
    var s = '';
    try { s = props.entry.get('slug') || ''; } catch (e) {}
    if (s) return { slug: s, final: true };
    // Entri baru: alamat = kode acak (field "kode"), final setelah disimpan.
    return { slug: String(nama || ''), final: false };
  }

  function qrMatrix(text) {
    if (!window.qrcode || !text) return null;
    var q = window.qrcode(0, 'M');
    q.addData(text); q.make();
    return q;
  }

  function download(name, href) {
    var a = document.createElement('a');
    a.href = href; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  }

  function qrPng(q, size) {
    var n = q.getModuleCount(), quiet = 4, cell = Math.floor(size / (n + quiet * 2));
    var dim = cell * (n + quiet * 2);
    var c = document.createElement('canvas'); c.width = c.height = dim;
    var x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, dim, dim); x.fillStyle = '#000';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++)
      if (q.isDark(r, k)) x.fillRect((k + quiet) * cell, (r + quiet) * cell, cell, cell);
    return c.toDataURL('image/png');
  }

  function qrSvg(q) {
    var n = q.getModuleCount(), quiet = 4, dim = n + quiet * 2, p = '';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++)
      if (q.isDark(r, k)) p += 'M' + (k + quiet) + ' ' + (r + quiet) + 'h1v1h-1z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + dim + ' ' + dim + '" shape-rendering="crispEdges">' +
      '<rect width="100%" height="100%" fill="#fff"/><path d="' + p + '" fill="#000"/></svg>';
  }

  function renderKartuPreview(props) {
    var d = {};
    try { d = props.entry.getIn(['data']).toJS(); } catch (e) { d = {}; }
    var s = kartuSlug(props, d.kode);
    var url = s.slug ? KARTU_BASE + '?id=' + s.slug : '';
    var q = qrMatrix(url);
    var aktif = d.aktif !== false;

    var btn = { fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase',
      padding: '10px 14px', border: '2px solid #9A1208', cursor: 'pointer', background: '#9A1208', color: '#fff' };
    var btn2 = Object.assign({}, btn, { background: '#fff', color: '#9A1208' });
    var file = 'QR-' + (s.slug || 'kartu');

    return h('div', { style: { fontFamily: 'Inter, sans-serif', padding: '32px', background: '#faf9f9', minHeight: '100vh' } },
      h('div', { style: { maxWidth: '420px', margin: '0 auto' } },
        h('div', { style: { background: 'linear-gradient(160deg,#4a0404,#210000)', color: '#f3b29e', padding: '20px 20px 56px',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase' } }, 'Kontak Resmi Karyawan'),
        h('div', { style: { background: '#fff', border: '1px solid #e3e2e2', margin: '-40px 16px 0', padding: '18px' } },
          d.jabatan ? h('div', { style: { fontFamily: 'JetBrains Mono, monospace', color: '#9A1208', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase' } }, d.jabatan) : null,
          h('div', { style: { fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '22px', marginTop: '4px' } }, d.nama || '(Nama karyawan)'),
          h('div', { style: { fontSize: '13px', color: '#554240', marginTop: '10px' } }, 'WA: ' + (d.whatsapp || '—')),
          h('div', { style: { fontSize: '13px', color: '#554240' } }, 'Email: ' + (d.email || '—'))
        ),
        aktif ? null : h('div', { style: { margin: '14px 16px 0', padding: '12px', background: '#fff4ef', border: '1px solid #f6c9b6', fontSize: '13px', color: '#6a1c0c' } },
          'Nonaktif: halaman ini menampilkan kontak kantor, bukan data karyawan di atas.'),

        h('div', { style: { marginTop: '28px', padding: '20px', background: '#fff', border: '1px solid #e3e2e2', textAlign: 'center' } },
          h('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '12px' } }, 'QR Code untuk Kartu Nama'),
          q ? h('div', { style: { width: '220px', margin: '0 auto' }, dangerouslySetInnerHTML: { __html: qrSvg(q) } })
            : h('div', { style: { padding: '40px 0', color: '#6B6B6B', fontSize: '13px' } }, window.qrcode ? 'Kode kartu belum dibuat.' : 'Library QR belum termuat — muat ulang halaman admin.'),
          url ? h('div', { style: { fontSize: '12px', color: '#1a1c1c', marginTop: '10px', wordBreak: 'break-all' } }, url) : null,
          (url && !s.final) ? h('div', { style: { fontSize: '12px', color: '#9A1208', marginTop: '8px' } },
            'Simpan (Save) & Publish dulu, lalu unduh QR-nya.') : null,
          q ? h('div', { style: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' } },
            h('button', { type: 'button', style: btn, onClick: function () { download(file + '.png', qrPng(q, 1200)); } }, 'Unduh PNG'),
            h('button', { type: 'button', style: btn2, onClick: function () {
              download(file + '.svg', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(qrSvg(q)));
            } }, 'Unduh SVG (cetak)')
          ) : null
        )
      )
    );
  }

  CMS.registerPreviewTemplate('kartu_nama', renderKartuPreview);

  /* Widget "kartu_id": kode acak 8 karakter, dibuat sekali saat entri baru, lalu terkunci.
     Huruf mirip (i, l, o, 0, 1) dihindari supaya mudah dibaca/diketik. */
  var createClass = window.createClass;
  if (createClass && CMS.registerWidget) {
    var ALPHA = 'abcdefghjkmnpqrstuvwxyz23456789';
    var genKode = function () {
      var out = '', buf = new Uint32Array(8);
      (window.crypto || window.msCrypto).getRandomValues(buf);
      for (var i = 0; i < 8; i++) out += ALPHA[buf[i] % ALPHA.length];
      return out;
    };
    var KartuIdControl = createClass({
      componentDidMount: function () { if (!this.props.value) this.props.onChange(genKode()); },
      render: function () {
        return h('div', { id: this.props.forID, className: this.props.classNameWrapper,
          style: { fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', letterSpacing: '.08em', color: '#1a1c1c', background: '#f4f3f3' } },
          this.props.value || '…');
      }
    });
    var KartuIdPreview = function (props) { return h('span', {}, props.value || ''); };
    CMS.registerWidget('kartu_id', KartuIdControl, KartuIdPreview);
  }
})();
