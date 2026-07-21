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
5. Setelah selesai, klik **Publish** (kanan atas) → **Publish now**
6. **Tunggu 1–2 menit**, lalu buka websitenya → perubahan sudah tampil.

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
