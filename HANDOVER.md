# Dokumen Serah Terima — Website PT Victorindo Kimiatama

> Untuk tim IT PT Victorindo Kimiatama. Sistem **sudah live dan berjalan penuh**.
> Dokumen ini menjelaskan cara kerjanya, apa yang perlu diambil alih, dan cara merawatnya.
> Panduan untuk staf yang hanya mengedit konten ada di **`PANDUAN-EDITOR.md`**.

Status: ✅ **LIVE sejak Juli 2026**

---

## 1. Alamat Penting

| Item | Alamat |
|---|---|
| Website (English) | https://victorindokimiatama.com |
| Website (Indonesia) | https://victorindokimiatama.com/id/ |
| **Halaman Admin (CMS)** | https://victorindokimiatama.com/admin/ |
| Kode sumber (GitHub) | https://github.com/marvketingid-stack/victorindo-kimiatama |
| Panel hosting | hPanel Hostinger → cPanel (Niagahoster `srv147.niagahoster.com`) |

## 2. Cara Kerja Sistem (penting dipahami dulu)

Website ini **bukan WordPress**. Ini situs **statis** (HTML/CSS/JS murni) yang dihasilkan
oleh *static site generator* **Eleventy**, dengan **Decap CMS** sebagai halaman admin.
Keuntungannya: sangat cepat, hemat resource, dan hampir tidak ada celah keamanan
(tidak ada PHP/database/plugin yang bisa diretas).

**Alur kerja otomatis:**

```
Editor buka /admin → edit konten → klik "Publish"
        ↓
Perubahan tersimpan sebagai commit di GitHub
        ↓
GitHub Actions otomatis jalan: install → build (Eleventy) → upload FTP
        ↓
File masuk ke public_html Hostinger → website ter-update (± 1-2 menit)
```

Hal yang sama terjadi jika developer mengubah kode lalu `git push`.

**Tidak ada langkah manual sama sekali** — tidak perlu upload FTP manual, tidak perlu
klik apa pun di Hostinger.

## 3. Komponen & Kepemilikan Akun (yang perlu diambil alih)

| Komponen | Fungsi | Status | Tindakan saat handover |
|---|---|---|---|
| **Hostinger / cPanel** | Hosting file website + domain + email | Sudah milik PT VK | — (tidak berubah) |
| **GitHub** repo `marvketingid-stack/victorindo-kimiatama` | Kode + konten + riwayat perubahan | Milik developer | **Transfer** ke akun/organisasi GitHub PT VK (Settings → Transfer ownership), atau tambahkan tim IT sebagai admin |
| **Netlify** project `victorindo-kimiatama` | **HANYA gerbang login** halaman /admin. Tidak meng-host website. | Milik developer | Transfer atau buat ulang di akun PT VK (lihat §7) |
| **GitHub OAuth App** "VK CMS Login" | Kredensial tombol *Login with GitHub* | Milik developer | Buat ulang di akun PT VK bila akun dipindah (lihat §7) |
| **Elfsight** widget WhatsApp | Tombol chat WA melayang | Milik developer | Buat akun Elfsight PT VK → buat widget baru → ganti ID-nya via /admin (§6) |

> ⚠️ Setelah semua dipindahkan, **cabut akses developer** dari repo GitHub dan project Netlify.

## 4. Konfigurasi yang Sudah Terpasang (jangan diubah tanpa alasan)

**GitHub → Settings → Secrets and variables → Actions:**

| Nama Secret | Isi |
|---|---|
| `HOSTINGER_FTP_SERVER` | `194.163.41.89` |
| `HOSTINGER_FTP_USERNAME` | `deploy@victorindokimiatama.com` |
| `HOSTINGER_FTP_PASSWORD` | *(password akun FTP)* |

**Akun FTP di cPanel:** `deploy@victorindokimiatama.com`, dibatasi hanya ke folder
`public_html` (sengaja — bukan password utama cPanel, agar aman bila bocor).

**GitHub OAuth App** ("VK CMS Login"):
- Homepage URL: `https://victorindokimiatama.com`
- Authorization callback URL: `https://api.netlify.com/auth/done` ← wajib persis
- Client ID & Secret-nya terpasang di Netlify → Project configuration → Access & security → OAuth

**Workflow deploy:** `.github/workflows/deploy-hostinger.yml` — jalan otomatis setiap
`push` ke branch `main`, dan bisa juga dijalankan manual dari tab **Actions**.

> ⚠️ **Catatan penting soal `dangerous-clean-slate`:** opsi ini ada di workflow tetapi
> **sengaja dinonaktifkan** (dikomentari). Pernah dipakai sekali untuk menghapus instalasi
> WordPress lama. Jika diaktifkan, `public_html` dikosongkan dulu setiap deploy → **situs
> down ±1 menit setiap kali publish**. Aktifkan hanya bila benar-benar perlu reset total.

## 5. Siapa yang Bisa Login ke /admin?

**Aturannya sederhana: siapa pun yang punya akses tulis (write) ke repo GitHub.**

Menambah editor baru:
1. Editor membuat akun GitHub gratis (hanya untuk login — tidak perlu paham Git).
2. Repo GitHub → **Settings → Collaborators** → **Add people** → masukkan username → role **Write**.
3. Editor menerima undangan lewat email, lalu bisa langsung login di `/admin`.

Mencabut akses: hapus orang tersebut dari daftar Collaborators. Efektif seketika.

## 6. Hal yang Diatur di Luar Repo

- **Widget WhatsApp (Elfsight):** nomor WA, teks sapaan, jam tayang, dan bahasa widget
  diatur di dashboard Elfsight — bukan di kode. Kode hanya memuat ID widget
  (`1fe47c4b-b489-4504-94d1-1b8095756233`), yang bisa diganti via **/admin → Pengaturan Situs**.
  ⚠️ Jangan tambahkan atribut `data-elfsight-app-lazy` pada kode embed — dengan atribut itu
  widget tidak pernah muncul (sudah pernah terjadi).
- **Form kontak:** saat ini validasi di browser lalu membuka aplikasi email pengguna
  (mailto ke info@victorindokimiatama.com). **Belum ada backend penyimpan submission.**
  Opsi upgrade: layanan form pihak ketiga (Formspree/Web3Forms) atau script PHP sederhana
  di cPanel — keduanya cukup mengubah `src/pages/contact.njk`.
- **Peta distribusi (halaman Clients):** peta interaktif Leaflet + OpenStreetMap (gratis,
  tanpa API key), 19 titik kota yang bisa diedit via **/admin → Pengaturan Situs → Peta Distribusi**.
  Bila ingin memakai **Google My Maps**: buat peta di mymaps.google.com dengan akun Google
  perusahaan → Share → Embed → salin URL `src` iframe → tempel di field *"URL Embed Google
  My Maps"*. Peta bawaan otomatis tergantikan.
- **Peta lokasi pabrik (halaman Contact):** embed Google Maps biasa, URL-nya di Pengaturan Situs.

## 7. Bila Akun Netlify Ingin Dipindah / Dihapus

Netlify **hanya** berperan sebagai gerbang OAuth login `/admin` (tidak meng-host apa pun).
Kalau tim IT ingin lepas dari Netlify sepenuhnya, ada dua jalur:

**Jalur A — pindahkan ke akun Netlify PT VK:**
1. Buat project Netlify baru (boleh kosong) di akun PT VK.
2. Buat GitHub OAuth App baru, callback tetap `https://api.netlify.com/auth/done`.
3. Pasang Client ID/Secret di project baru (Access & security → OAuth).
4. Ubah `site_domain` di `src/admin/config.yml` menjadi subdomain project Netlify yang baru.

**Jalur B — tanpa Netlify sama sekali:**
Deploy proxy OAuth gratis `sveltia-cms-auth` di Cloudflare Workers
(https://github.com/sveltia/sveltia-cms-auth, ±10 menit), lalu di `src/admin/config.yml`
ubah `base_url` dari `https://api.netlify.com` ke URL Worker tersebut, dan hapus `site_domain`.

## 8. Struktur Repo

```
vk-site/
├── .github/workflows/deploy-hostinger.yml   # pipeline auto-deploy ke Hostinger
├── netlify.toml                             # sisa konfigurasi (tidak dipakai untuk hosting)
├── package.json                             # Eleventy 3 — npm run build / npm run serve
├── eleventy.config.js
├── README.md                                # cara menjalankan proyek secara lokal
├── HANDOVER.md                              # dokumen ini
├── PANDUAN-EDITOR.md                        # panduan non-teknis untuk staf pengisi konten
└── src/
    ├── _data/            # ← SEMUA KONTEN ADA DI SINI
    │   ├── site.json         # info perusahaan, kontak, base URL
    │   ├── ui.json           # label menu/footer/tombol per bahasa
    │   ├── distribution.json # titik kota peta + slot embed Google My Maps
    │   └── pagedata/en|id/   # konten 7 halaman, per bahasa
    ├── _includes/        # layout & komponen (base, page-hero, cta-band, custom)
    ├── pages/*.njk       # 7 template halaman (1 template merender EN + ID sekaligus)
    ├── custom/           # halaman tambahan yang dibuat lewat CMS (markdown)
    ├── admin/            # Decap CMS (index.html + config.yml = definisi form admin)
    └── assets/           # css / js / img / docs (PDF company profile)
```

## 9. Menjalankan & Mengubah Kode (untuk developer)

```bash
npm install         # sekali saja
npm run serve       # dev server http://localhost:8735
npm run build       # hasil build ke folder _site/
npx decap-server    # (terminal terpisah) mencoba /admin lokal tanpa login GitHub
```

Setelah mengubah kode: `git push` ke `main` → deploy berjalan otomatis.

**Aturan penting saat menambah/mengubah konten di kode:** struktur JSON di
`pagedata/en/` dan `pagedata/id/` **harus identik**. Kalau menambah field di satu bahasa,
tambahkan padanannya di bahasa lain, dan daftarkan juga di `src/admin/config.yml`
agar muncul di halaman admin.

## 10. Troubleshooting

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| Publish di CMS tapi web tidak berubah | Build/deploy gagal | GitHub → tab **Actions** → buka run paling atas → baca log yang merah. Paling sering: JSON tidak valid (koma/kutip kurang). |
| Login /admin gagal | OAuth app/Netlify berubah | Cek §4 & §7. Callback URL harus persis `https://api.netlify.com/auth/done`. |
| Deploy gagal di langkah "Upload via FTP" | Password FTP berubah / akun terhapus | Buat ulang akun FTP di cPanel, perbarui GitHub Secrets (§4). |
| Situs down ±1 menit tiap publish | `dangerous-clean-slate` aktif | Nonaktifkan (komentari) di workflow — lihat §4. |
| Widget WA tidak muncul | Atribut `data-elfsight-app-lazy` terpasang / widget nonaktif | Hapus atribut tsb; cek status di dashboard Elfsight. |
| Halaman baru dari CMS 404 | Slug pakai huruf besar/spasi | Slug harus huruf kecil, angka, dan tanda hubung saja. |
| Build gagal: versi Node | Node < 18 | Netlify/Actions memakai Node 20 (diatur di workflow). |

## 11. Catatan Konten

- Sumber tulisan: **Company Profile VK (English)** — tersimpan di
  `src/assets/docs/VK-Company-Profile.pdf` (dipakai juga untuk tombol *Download Company Profile*).
- **Timeline "Growth Journey" (halaman About) tidak memiliki tahun per milestone** — dokumen
  company profile aslinya memang tidak mencantumkannya, jadi hanya milestone pertama (1978)
  dan terakhir yang berlabel; sisanya bernomor urut. Bila perusahaan punya data tahun aslinya,
  tinggal isi field *"Tahun / Label"* tiap milestone lewat /admin.
- Semua foto sudah dioptimasi ke format **WebP** + *lazy loading*. Bila mengunggah foto baru
  lewat /admin, usahakan lebar maksimal ±1920px dan ukuran < 300KB agar situs tetap ringan.

## 12. Struktur URL

URL memakai format folder tanpa `.html`, dan slug versi Indonesia dilokalkan:

| Halaman | English | Indonesia |
|---|---|---|
| Beranda | `/` | `/id/` |
| About | `/about/` | `/id/tentang-kami/` |
| Products | `/products/` | `/id/produk/` |
| Manufacturing | `/manufacturing/` | `/id/manufaktur/` |
| Industries | `/industries/` | `/id/industri/` |
| Clients | `/clients/` | `/id/klien/` |
| Contact | `/contact/` | `/id/kontak/` |

Seluruh alamat didefinisikan **satu tempat** di `src/_data/routes.json` (`url` untuk link,
`file` untuk permalink). Mengubah slug di file itu otomatis mengubah semua link di situs —
jangan menulis URL secara manual di template.

URL lama berakhiran `.html` di-*redirect* permanen (301) lewat `src/.htaccess`, yang juga
mengatur kompresi, cache aset, dan halaman `404.html`.

## 13. Panel Pratinjau di Halaman Admin (PENTING untuk perawatan)

Panel kanan di `/admin` menampilkan konten memakai **markup + CSS website asli**, sehingga
editor melihat hasil sesungguhnya sambil mengetik. Ini diatur oleh
`src/admin/preview-templates.js`.

> ⚠️ **Konsekuensi yang harus disadari:** markup halaman kini ada di **dua tempat** —
> `src/pages/*.njk` (yang tayang di website) dan `src/admin/preview-templates.js`
> (yang tampil di pratinjau). **Kalau mengubah struktur/kelas CSS di file .njk,
> ubah juga di preview-templates.js.** Kalau tidak, pratinjau akan menyesatkan editor
> (melihat A, hasilnya B).
>
> Bila beban ini dinilai tidak sepadan, file `preview-templates.js` boleh **dihapus**
> beserta baris `<script>` pemanggilnya di `src/admin/index.html`. Admin tetap
> berfungsi 100%; pratinjau hanya kembali ke tampilan bawaan Decap (daftar field polos).

Tampilan antarmuka admin (warna, font, sudut siku) diatur oleh blok `<style>` di
`src/admin/index.html` — murni kosmetik dan juga aman dihapus bila suatu saat
pembaruan Decap membuatnya tampak aneh.
