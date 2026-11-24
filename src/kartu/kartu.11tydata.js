/**
 * Kartu Nama Digital — satu file per karyawan di folder ini (dibuat dari /admin,
 * koleksi "🪪 Kartu Nama Karyawan"). Tiap file jadi halaman /kartu/<nama-file>/
 * yang dituju QR code di kartu nama.
 *
 * ⚠️ Nama file = alamat QR. Jangan ganti nama file setelah kartu dicetak.
 *    Kalau karyawan keluar, cukup matikan "Masih Aktif" di admin: halamannya
 *    tetap ada dan otomatis mengarahkan ke kontak kantor.
 */
function normWa(v) {
  var d = String(v || "").replace(/\D/g, "");
  if (d.indexOf("0") === 0) d = "62" + d.slice(1);
  else if (d.indexOf("8") === 0) d = "62" + d;
  return d;
}

module.exports = {
  layout: "layouts/kartu.njk",
  // Tidak masuk sitemap / daftar halaman mana pun.
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    permalink: (data) => "kartu/" + data.page.fileSlug + "/index.html",
    waNumber: (data) => normWa(data.whatsapp),
    // Format tampilan: +62 812-3456-7890
    waDisplay: (data) => {
      var d = normWa(data.whatsapp);
      if (!d) return "";
      return "+" + d.slice(0, 2) + " " + d.slice(2, 5) + "-" + d.slice(5, 9) + (d.length > 9 ? "-" + d.slice(9) : "");
    },
    firstName: (data) => String(data.nama || "").trim().split(/\s+/)[0] || ""
  }
};
