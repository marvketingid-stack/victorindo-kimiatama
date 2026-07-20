# Dokumen Serah Terima (Handover) — Website PT Victorindo Kimiatama

> Untuk tim IT PT Victorindo Kimiatama. Dokumen ini mencakup arsitektur, kepemilikan akun,
> operasional harian, dan pengembangan lanjutan. Panduan setup teknis singkat ada di `README.md`.

---

## 1. Ringkasan

| Item | Nilai |
|---|---|
| URL Live | https://victorindo-kimiatama.netlify.app |
| Domain final (rencana) | https://victorindokimiatama.com — lihat §7 |
| Admin page (CMS) | https://victorindo-kimiatama.netlify.app/admin/ |
| Teknologi | HTML/CSS/JS statis, di-build dengan Eleventy 3 (Node.js) |
| CMS | Decap CMS (open source, gratis, berbasis Git) |
| Hosting | Netlify (paket gratis) |
| Bahasa | English (`/`) & Bahasa Indonesia (`/id/`), dengan hreflang + toggle EN/ID |
| Live chat | Widget WhatsApp Elfsight (WA 0859-5719-0397) |

Halaman: Home, About Us, Products & Services, Manufacturing & Quality, Industries, Clients, Contact Us — masing-masing dalam 2 bahasa (14 halaman), plus halaman tambahan yang bisa dibuat lewat CMS.

## 2. Kepemilikan Akun — WAJIB DIPINDAHKAN SAAT HANDOVER

Saat ini semua akun berada di pihak developer. Tim IT harus mengambil alih:

| Layanan | Kondisi sekarang | Cara ambil alih |
|---|---|---|
| **Netlify** (hosting) | Site `victorindo-kimiatama` di akun developer | Buat tim/akun Netlify perusahaan → developer melakukan **Site transfer** (Site settings → General → Transfer site), ATAU deploy ulang dari repo GitHub ke akun baru |
| **GitHub** (kode + konten) | Repo lokal siap push ke `marvketingid-stack/victorindo-kimiatama` | Buat organisasi GitHub perusahaan → repo di-transfer (Settings → Transfer ownership) atau langsung dibuat di org perusahaan sejak awal |
| **Elfsight** (widget WhatsApp) | Widget ID `1fe47c4b-b489-4504-94d1-1b8095756233` di akun developer | Buat akun Elfsight perusahaan, buat widget WhatsApp baru, lalu ganti "ID Widget WhatsApp" lewat /admin → Pengaturan Situs (atau `src/_data/site.json`) |
| **Domain** victorindokimiatama.com | Dikelola terpisah (registrar) | Pastikan tim IT punya akses registrar untuk setting DNS (lihat §7) |
| **Email** info@victorindokimiatama.com | Sudah ada (tujuan form kontak) | Tidak ada perubahan |

Setelah transfer, **cabut akses developer** dari repo GitHub dan site Netlify.

## 3. Arsitektur & Alur Kerja

```
Editor konten → /admin (Decap CMS) → commit ke GitHub → Netlify build otomatis → live (±1 menit)
Developer     → edit kode → git push → Netlify build otomatis → live
```

- **Konten** (yang boleh diubah editor): `src/_data/pagedata/{en,id}/*.json`, `src/_data/site.json`, `src/custom/*.md`, gambar di `src/assets/img/`
- **Kode** (wilayah developer): template `src/pages/*.njk`, layout `src/_includes/`, CSS `src/assets/css/styles.css`, JS `src/assets/js/main.js`, konfigurasi CMS `src/admin/config.yml`
- Satu template merender dua bahasa; teks per bahasa diambil dari `pagedata/en/` dan `pagedata/id/`. **Kalau menambah konten baru di EN, tambahkan padanannya di ID** (struktur JSON-nya identik).
- Label global (menu, footer, tombol) ada di `src/_data/ui.json`.

## 4. Setup Awal yang Masih Pending (tugas pertama tim IT)

Repo git lokal sudah di-commit, tapi belum terhubung ke GitHub/Netlify CI. Ikuti `README.md` bagian "Setup admin page":
1. Buat repo GitHub (idealnya langsung di organisasi perusahaan) dan push.
2. Link repo ke site Netlify (build config terbaca otomatis dari `netlify.toml`).
3. Buat GitHub OAuth App + daftarkan di Netlify (Access & security → OAuth) agar login /admin aktif.
4. Sesuaikan `backend.repo` di `src/admin/config.yml` jika nama repo/organisasi berbeda dari `marvketingid-stack/victorindo-kimiatama`.

Sebelum langkah ini selesai, deploy dilakukan manual: `npm run build` lalu `netlify deploy --prod --dir _site` (dari folder repo, site harus ter-link `netlify link`).

**Siapa yang boleh akses /admin?** Semua orang yang punya akses write ke repo GitHub. Tambahkan editor sebagai collaborator repo.

## 5. Operasional Harian (untuk editor konten)

- **Edit teks/foto**: /admin → "Halaman (Bahasa Indonesia)" atau "Halaman (English)" → pilih halaman → edit → **Publish**. Ingat edit KEDUA bahasa untuk perubahan yang sama.
- **Tambah halaman baru**: /admin → "Halaman Baru" → New. Isi bahasa, slug (jadi URL: `slug.html` atau `id/slug.html`), judul, foto, isi (markdown). Halaman baru TIDAK otomatis masuk menu navigasi — link-kan manual dari konten halaman lain, atau minta developer menambah item nav.
- **Upload foto**: langsung dari field foto di /admin, atau menu Media. Rekomendasi: format WebP/JPEG, lebar maks ±1920px, ukuran < 300KB (foto sumber asli 4–5MB PNG sudah dikonversi; jangan upload PNG mentah dari kamera).
- **Ganti info kontak / nomor telepon / alamat**: /admin → Pengaturan Situs (berlaku ke semua halaman & footer sekaligus).
- **Ganti PDF company profile**: ganti file `src/assets/docs/VK-Company-Profile.pdf` di repo (nama file sama), atau upload baru & update path di Pengaturan Situs.

## 6. Hal yang Diatur di Luar Repo

- **Widget WhatsApp**: nomor WA, teks sapaan, bahasa widget diatur di dashboard **Elfsight** (bukan di kode). Kode hanya memuat ID widget-nya. Catatan: atribut `data-elfsight-app-lazy` sengaja TIDAK dipakai — dengan atribut itu widget tidak pernah muncul.
- **Form kontak**: saat ini validasi client-side + membuka aplikasi email (mailto ke info@victorindokimiatama.com). **Upgrade yang disarankan**: aktifkan Netlify Forms (tambah atribut `data-netlify="true"` + input hidden `form-name` di `src/pages/contact.njk`, submit via fetch) supaya submission masuk dashboard Netlify + notifikasi email. Kuota gratis 100 submission/bulan.
- **Google Maps embed** (halaman Contact): URL-nya di Pengaturan Situs (`mapEmbedUrl`).
- **Peta distribusi** (halaman Clients): peta interaktif (Leaflet + OpenStreetMap, gratis tanpa API key) dengan titik kota yang bisa ditambah/diedit di /admin → Pengaturan Situs → Peta Distribusi. Untuk memakai **Google Maps asli multi-titik**: buat peta di [mymaps.google.com](https://mymaps.google.com) dengan akun Google perusahaan (import titik, gratis) → Share → "Embed on my site" → salin URL `src` iframe → tempel di field "URL Embed Google My Maps" di /admin → Publish. Peta bawaan otomatis tergantikan.

## 6b. Opsi Hosting — Netlify vs Hostinger

Situs ini **statis murni** (hasil build = folder HTML/CSS/JS biasa) — tidak butuh PHP/database
seperti WordPress dulu, dan bisa di-host di mana saja, termasuk Hostinger yang sudah dimiliki.
Netlify dipakai saat pengembangan karena gratis dan otomatis menjalankan build setiap kali
editor menekan Publish di CMS. Pilih salah satu:

> **✅ KEPUTUSAN PROYEK (Juli 2026): Opsi C — Hosting di Hostinger, Netlify hanya untuk login /admin.**
> Website + domain + email di Hostinger (auto-deploy via GitHub Actions FTP). Site Netlify
> `victorindo-kimiatama` DIPERTAHANKAN hanya sebagai gateway OAuth login CMS (tidak meng-host
> situs asli). Karena itu `src/admin/config.yml` sudah diberi `site_domain: victorindo-kimiatama.netlify.app`
> agar login tetap jalan walau /admin diakses dari domain Hostinger. Langkah aktivasi: (1) set FTP
> secrets di GitHub + aktifkan workflow deploy-hostinger.yml; (2) install GitHub OAuth provider di
> site Netlify (Access & security → OAuth). Detail di bawah.

**Opsi A — Tetap Netlify (paling sederhana, rekomendasi):**
- Hosting situs gratis di Netlify; Hostinger tetap dipakai untuk domain + email.
- Alur CMS jalan penuh tanpa setup tambahan (Publish → build → live ±1 menit).
- Domain tinggal diarahkan ke Netlify (lihat §7). Email di Hostinger TIDAK terganggu.

**Opsi B — Full Hostinger (tanpa Netlify sama sekali):**
1. Deploy: aktifkan workflow `.github/workflows/deploy-hostinger.yml` (petunjuk di dalam file-nya) —
   setiap Publish di CMS → GitHub Actions build → upload FTP ke `public_html/`. Actions gratis
   2.000 menit/bulan (build ±1 menit) — lebih dari cukup.
2. Login /admin: karena tidak lagi memakai gateway OAuth Netlify, deploy proxy OAuth gratis
   `sveltia-cms-auth` di Cloudflare Workers (https://github.com/sveltia/sveltia-cms-auth —
   ikuti README-nya, ±10 menit), lalu di `src/admin/config.yml` ganti
   `base_url: https://api.netlify.com` menjadi URL Worker tersebut.
3. Upload manual tanpa GitHub sama sekali juga bisa: `npm run build` di komputer lokal →
   upload isi `_site/` ke `public_html/` via File Manager/FTP — tapi kehilangan alur CMS otomatis.

**Opsi C — Hybrid:** hosting di Hostinger, tapi tetap punya site Netlify "kosong" hanya untuk
gateway OAuth login /admin. Berfungsi, tapi Opsi A atau B lebih bersih.

## 7. Migrasi Domain ke victorindokimiatama.com

Domain tetap terdaftar di registrar yang sekarang (Hostinger) — yang berubah hanya **DNS record**,
tergantung opsi hosting di §6b:

**Jika hosting di Netlify (Opsi A):**
1. Netlify → Domain management → **Add a domain** → `victorindokimiatama.com`.
2. Di hPanel Hostinger → DNS Zone Editor: JANGAN pindah nameserver (agar email
   @victorindokimiatama.com di Hostinger tetap aman). Cukup ubah 2 record:
   - Record **A** untuk `@` → arahkan ke IP load balancer Netlify (ditampilkan Netlify saat add domain, mis. `75.2.60.5`)
   - Record **CNAME** untuk `www` → `victorindo-kimiatama.netlify.app`
   - Biarkan record MX/TXT (email) apa adanya.
3. SSL otomatis aktif (Let's Encrypt) beberapa menit setelah DNS terpropagasi.

**Jika hosting di Hostinger (Opsi B):** domain sudah di sana — cukup pastikan `public_html/`
berisi hasil build, tidak ada perubahan DNS.

**Setelah domain aktif (kedua opsi):**
1. /admin → Pengaturan Situs → ganti **Base URL Situs** ke `https://victorindokimiatama.com` → Publish (memperbaiki tag hreflang).
2. Update `site_url`, `display_url`, `logo_url` di `src/admin/config.yml`.
3. Di dashboard Elfsight, tambahkan domain baru jika widget dibatasi per-domain.

## 8. Konten & Aset Sumber

- Sumber copywriting: dokumen **Company Profile VK (English)** — tersalin di `src/assets/docs/VK-Company-Profile.pdf`.
- Foto sumber resolusi penuh & logo: folder proyek asli developer (`aset foto untuk website 1/`, `Logo Victorindo Kimiatama/`) — minta arsipnya saat handover jika perlu foto resolusi penuh.
- **Catatan konten penting**: timeline "Growth Journey" di halaman About TIDAK memiliki tahun per milestone (sumber compro tidak mencantumkannya) — hanya milestone pertama (1978) dan terakhir yang berlabel. Jika perusahaan punya data tahun aslinya, tinggal isi field "Tahun / Label" tiap milestone di /admin.

## 9. Struktur Repo (ringkas)

```
vk-site/
├── netlify.toml            # build config Netlify (command + publish dir)
├── package.json            # Eleventy 3; npm run build / npm run serve
├── eleventy.config.js
├── README.md               # setup teknis
├── HANDOVER.md             # dokumen ini
└── src/
    ├── _data/              # ← SEMUA KONTEN (site.json, ui.json, pagedata/en|id/*.json)
    ├── _includes/          # layout & partial (base, custom, page-hero, cta-band)
    ├── pages/*.njk         # 7 template halaman (masing-masing merender EN+ID)
    ├── custom/             # halaman buatan CMS (markdown)
    ├── admin/              # Decap CMS (index.html + config.yml)
    └── assets/             # css / js / img / docs
```

## 10. Troubleshooting Cepat

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| Login /admin gagal | OAuth belum disetup / repo salah di config.yml | Cek §4 langkah 3–4 |
| Publish di CMS tapi situs tidak berubah | Build Netlify gagal | Netlify → Deploys → lihat log build (biasanya JSON tidak valid — cek koma/kutip) |
| Widget WA tidak muncul | Jangan tambahkan `data-elfsight-app-lazy`; cek status widget di Elfsight | §6 |
| Halaman baru 404 | Slug mengandung huruf besar/spasi | Slug hanya huruf kecil, angka, tanda hubung |
| Build lokal error | Node < 18 | Pakai Node 18+ (Netlify pakai Node 20, lihat netlify.toml) |
