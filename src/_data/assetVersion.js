/**
 * Penanda versi aset (cache busting).
 *
 * File CSS/JS di-cache browser sampai 1 minggu (lihat src/.htaccess) supaya situs cepat.
 * Tanpa penanda versi, perubahan desain tidak akan terlihat oleh pengunjung lama sampai
 * cache-nya kedaluwarsa. Hash di bawah ikut berubah setiap isi file berubah, sehingga
 * URL-nya berubah (/styles.css?v=ab12cd34) dan browser otomatis mengambil versi terbaru.
 */
const fs = require("fs");
const crypto = require("crypto");

function hash(path) {
  try {
    return crypto.createHash("md5").update(fs.readFileSync(path)).digest("hex").slice(0, 8);
  } catch (e) {
    return String(Date.now()); // fallback: selalu dianggap baru
  }
}

module.exports = {
  css: hash("src/assets/css/styles.css"),
  js: hash("src/assets/js/main.js")
};
