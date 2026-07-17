# PT Victorindo Kimiatama — Corporate Website

Situs statis **Eleventy** + admin page **Decap CMS**. Live: https://victorindo-kimiatama.netlify.app

## Struktur

```
src/
  _data/site.json          ← pengaturan situs (kontak, base URL, dll.) — bisa diedit dari /admin
  _data/ui.json            ← label UI (nav, footer, tombol) per bahasa
  _data/pagedata/en/*.json ← konten 7 halaman English  — diedit dari /admin
  _data/pagedata/id/*.json ← konten 7 halaman Indonesia — diedit dari /admin
  pages/*.njk              ← template halaman (1 template = EN + ID)
  custom/                  ← halaman baru buatan admin (markdown)
  admin/                   ← Decap CMS (config.yml = definisi form admin)
  assets/                  ← CSS, JS, gambar, PDF
```

## Perintah

```bash
npm install          # sekali saja
npm run build        # build ke _site/
npm run serve        # dev server di http://localhost:8735
npx decap-server     # (terminal terpisah) untuk tes /admin secara lokal tanpa login GitHub
```

Deploy manual (sebelum repo terhubung ke Netlify):
```bash
netlify deploy --prod --dir vk-site/_site   # jalankan dari folder induk yang ter-link
```

## Setup admin page (sekali saja)

1. Buat repo GitHub `victorindo-kimiatama` (akun `marvketingid-stack`), lalu:
   ```bash
   git remote add origin https://github.com/marvketingid-stack/victorindo-kimiatama.git
   git push -u origin main
   ```
2. Netlify dashboard → site `victorindo-kimiatama` → **Build & deploy → Link repository** → pilih repo tadi. Build command & publish dir otomatis terbaca dari `netlify.toml`.
3. Buat **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps → New):
   - Homepage URL: `https://app.netlify.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
4. Netlify dashboard → **Site configuration → Access & security → OAuth (Install provider)** → GitHub → isi Client ID & Secret dari langkah 3.
5. Buka `https://victorindo-kimiatama.netlify.app/admin/` → Login with GitHub. Selesai.

Setiap kali admin menekan **Publish** di CMS, perubahan di-commit ke GitHub dan Netlify otomatis build + deploy (±1 menit).

## Ganti domain nanti

1. Netlify → Domain management → Add domain `victorindokimiatama.com` (ikuti instruksi DNS).
2. Di /admin → Pengaturan Situs → ganti **Base URL Situs** ke `https://victorindokimiatama.com` → Publish.
3. Update `site_url`, `display_url`, `logo_url` di `src/admin/config.yml`.
