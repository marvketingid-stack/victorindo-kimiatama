# Panduan Mengelola Website — PT Victorindo Kimiatama

> Panduan untuk staf yang bertugas mengisi/mengubah konten website.
> **Tidak perlu bisa coding sama sekali.** Semua lewat halaman admin.

---

## 1. Cara Masuk ke Halaman Admin

1. Buka **https://victorindokimiatama.com/admin/**
2. Klik tombol **"Login with GitHub"**
3. Login dengan akun GitHub Anda → klik **Authorize**
4. Halaman admin terbuka.

**Belum punya akses?** Hubungi tim IT — mereka perlu:
- Membuatkan/mendaftarkan akun GitHub Anda (gratis, di github.com)
- Mengundang akun tersebut sebagai *Collaborator* di repo website

---

## 2. Isi Menu Halaman Admin

| Menu | Isinya |
|---|---|
| **Halaman (Bahasa Indonesia)** | Konten 7 halaman versi Indonesia |
| **Halaman (English)** | Konten 7 halaman versi English |
| **Halaman Baru** | Membuat halaman tambahan (berita, promo, dll.) |
| **Pengaturan Situs** | Alamat, telepon, email, peta, widget WhatsApp |
| **Media** | Kumpulan semua foto yang sudah diunggah |

---

## 3. Mengubah Tulisan atau Foto

1. Klik menu **Halaman (Bahasa Indonesia)** *(atau English)*
2. Pilih halaman yang mau diubah, misalnya **Beranda**
3. Bagian-bagiannya bisa dibuka-tutup (klik judul bagiannya). Ubah isian yang diinginkan:
   - Kolom teks → langsung ketik
   - Kolom foto → klik fotonya → **Upload** foto baru atau pilih dari Media
4. Lihat **panel kanan** — itu pratinjau tampilan asli website, berubah mengikuti ketikan Anda.
   Ada juga tautan **View Live** di atas untuk membuka halaman aslinya di tab baru.
5. Setelah selesai, simpan. Perubahan masuk sebagai **Draft** dulu (belum tayang).
6. Buka tab **Workflow** (menu atas) → geser kartu ke **Ready**, atau di dalam editor ubah
   status ke **Ready**, lalu klik **Publish → Publish now**.
7. **Tunggu 1–2 menit**, lalu buka websitenya → perubahan sudah tampil.

> 💡 **Kenapa ada tahap Draft?** Supaya ada kesempatan "cek dulu" sebelum konten benar-benar
> tayang ke publik — mirip draft di Instagram sebelum posting. Kalau ada beberapa editor,
> ini mencegah typo langsung terlihat pengunjung.

> ⚠️ **PALING PENTING:** website ini punya **2 bahasa**. Kalau Anda mengubah sesuatu di
> versi Indonesia, **ubah juga padanannya di versi English** (atau sebaliknya). Kalau tidak,
> isinya jadi beda antar bahasa.

---

## 4. Menambah Halaman Baru

1. Klik menu **Halaman Baru** → tombol **New Halaman**
2. Isi:
   - **Bahasa:** Indonesia atau English
   - **Slug URL:** alamat halaman — **huruf kecil semua, tanpa spasi**, pakai tanda hubung.
     Contoh: `berita-pabrik-baru` → jadi `victorindokimiatama.com/berita-pabrik-baru/`
   - **Judul Halaman**, **Deskripsi**, **Foto Utama** (opsional)
   - **Isi Halaman:** ketik bebas, bisa dikasih judul, daftar, tebal/miring, foto, tabel
3. Klik **Publish**

> Halaman baru **tidak otomatis muncul di menu navigasi atas**. Kalau ingin dimasukkan ke
> menu, minta bantuan tim IT (perlu sedikit ubah kode).

---

## 5. Mengubah Info Perusahaan (alamat, telepon, email)

Klik **Pengaturan Situs → Info Perusahaan & Kontak**.
Ubah di sini **satu kali**, otomatis berubah di **semua halaman** (termasuk footer).

Di menu yang sama juga ada:
- **URL Embed Google Maps** — peta lokasi pabrik di halaman Contact
- **ID Widget WhatsApp** — kalau nomor WA/tampilan chat mau diganti
- **Peta Distribusi** — daftar titik kota di halaman Clients (bisa tambah/hapus kota)

---

## 6. Tips Foto

- Format terbaik: **JPG** atau **WebP**
- Lebar maksimal sekitar **1920 piksel**, ukuran file **di bawah 300 KB**
- Jangan unggah foto mentah dari kamera (biasanya 5–10 MB) — bikin website lambat
- Kompres dulu gratis di **squoosh.app** atau **tinypng.com**
- Jangan lupa isi **"Teks Alt Foto"** (deskripsi singkat foto) — membantu Google & aksesibilitas

---

## 7. Kalau Ada Masalah

| Masalah | Yang harus dilakukan |
|---|---|
| Sudah Publish tapi website belum berubah | Tunggu 2–3 menit lalu refresh dengan **Ctrl+Shift+R**. Kalau masih belum, hubungi tim IT. |
| Tidak bisa login | Pastikan akun GitHub Anda sudah diundang sebagai Collaborator — hubungi tim IT. |
| Salah edit / ingin kembalikan | Semua perubahan tersimpan riwayatnya. Tim IT bisa mengembalikan versi lama kapan saja. |
| Halaman baru tidak bisa dibuka (404) | Cek slug-nya — harus huruf kecil, tanpa spasi. |

> 💡 **Tenang, tidak bisa "merusak" website.** Setiap perubahan tersimpan riwayatnya dan
> selalu bisa dikembalikan oleh tim IT. Kalau ragu, tanya dulu sebelum Publish.


---

## 8. Pengaturan Situs — Logo, Tagline, Kontak, dsb

Buka menu **⚙️ Pengaturan Situs → 🏢 Logo, Kontak & Info Perusahaan**. Field disusun dari
yang paling sering diubah (logo di paling atas) sampai yang teknis (di bawah, bertanda ⚙️).

**Ganti Logo (paling sering):**
1. Field paling atas: **🖼️ Logo Website (pojok kiri atas)**.
2. **Seret & lepas** file logo baru ke kotaknya (atau klik untuk memilih file dari komputer).
3. **Publish.** Logo langsung berganti di seluruh situs.
> Sama caranya untuk **Logo Footer** (versi putih) dan **Favicon** (ikon tab browser) — semua drag-and-drop.

**Ganti Tagline** (teks kecil "Since 1978 · Proven Results" di bawah logo):
- Buka menu **✏️ Teks Menu, Tombol & Tagline** → bagian English & Indonesia → field **🏷️ Tagline**.

**Field lain di Pengaturan Situs:**
- **🏢 Nama, 📞 Telepon, ✉️ Email, 📍 Alamat** — langsung ketik.
- **📄 File Company Profile (PDF)** — drag-drop PDF baru untuk menggantikan yang lama.
- **🔗 Media Sosial** — tempel URL Instagram/LinkedIn/dll → ikon otomatis muncul di footer. Kosongkan yang tidak dipakai.
- **🖼️ Foto Default Saat Link Dibagikan** — gambar yang muncul saat link situs di-share ke WhatsApp/LinkedIn.
- **Bagian bertanda ⚙️ (paling bawah)** — pengaturan teknis (Google Analytics, kunci form kontak, dll). Biasanya diatur tim IT, jarang perlu disentuh.

**Teks menu, tombol & footer:** menu **✏️ Teks Menu, Tombol & Tagline** — ubah nama menu (About/Produk/dll),
teks tombol, tagline, dan tulisan footer. **Isi versi English DAN Indonesia.**

**Halaman Berita/Promo:** halaman yang dibuat lewat **📰 Berita / Halaman Baru** otomatis muncul di
`victorindokimiatama.com/news/` (EN) & `/id/berita/` (ID), dan ada link "Berita & Promo" di footer.

> 💡 **Kotak upload** ditandai kotak garis putus-putus merah — tinggal **seret file dari komputer
> dan lepas di kotak itu**, atau klik untuk memilih. Berlaku untuk semua foto, logo, dan PDF.

## 9. Mengaktifkan Email Formulir Kontak

Secara default, formulir "Contact Us" hanya membuka aplikasi email pengunjung — pesan **tidak**
otomatis masuk ke inbox perusahaan. Untuk membuat pesan benar-benar terkirim ke email:

1. Buka **web3forms.com** (gratis, tidak perlu daftar akun).
2. Masukkan email tujuan: **info@victorindokimiatama.com** → klik "Create Access Key".
3. Sebuah **Access Key** dikirim ke email itu. Salin key tersebut.
4. Buka **/admin → Pengaturan Situs → Info Perusahaan & Kontak → "Kunci Formulir Kontak"**.
5. Tempel Access Key → **Publish**.

Setelah itu, setiap pengunjung yang mengisi formulir → pesannya langsung masuk ke
**info@victorindokimiatama.com**. Untuk mengganti email tujuan, daftarkan Access Key baru
dengan email lain di web3forms.com, lalu ganti key-nya di admin.

---

## 10. Mengganti File Company Profile (PDF)

Tombol "Download Company Profile" di seluruh situs mengambil dari satu file yang sama.
Untuk mengganti dengan versi baru:

1. Buka **/admin → Pengaturan Situs → Info Perusahaan & Kontak**.
2. Cari field **"File PDF Profil Perusahaan"**.
3. Klik area file → **upload PDF baru** (drag-drop). File lama otomatis tergantikan.
4. **Publish.** Semua tombol download di situs otomatis memakai PDF yang baru — tidak perlu
   mengubah apa pun secara manual.
