/**
 * Daftar kode kartu nama (= nama file di src/kartu/*.md, tanpa .md).
 * Dipakai halaman /kartu/?id=<kode> (src/kartu-index.njk) untuk mengarahkan QR
 * ke halaman karyawan yang benar. Hanya berisi kode, tanpa data pribadi.
 */
const fs = require("fs");
const path = require("path");

module.exports = function () {
  const dir = path.join(__dirname, "..", "kartu");
  try {
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.slice(0, -3));
  } catch (e) {
    return [];
  }
};
