var markdownIt = require("markdown-it")({ html: true, linkify: true, breaks: false });

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Ubah teks Markdown (mis. isi blok "Teks") menjadi HTML.
  eleventyConfig.addFilter("markdownify", function (s) {
    return s ? markdownIt.render(String(s)) : "";
  });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/.htaccess": ".htaccess" });
  eleventyConfig.addPassthroughCopy({ "src/maintenance.html": "maintenance.html" });

  // Tanggal ISO untuk sitemap.xml (mis. 2026-07-21)
  eleventyConfig.addFilter("dateISO", function (d) {
    return (d instanceof Date ? d : new Date()).toISOString().slice(0, 10);
  });

  // Tanggal terbaca-manusia untuk berita, mis. "31 Juli 2026" (id) / "July 31, 2026" (en)
  var MONTHS = {
    id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  eleventyConfig.addFilter("newsDate", function (d, lang) {
    var dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt)) return "";
    var m = MONTHS[lang === "en" ? "en" : "id"][dt.getUTCMonth()];
    return lang === "en"
      ? m + " " + dt.getUTCDate() + ", " + dt.getUTCFullYear()
      : dt.getUTCDate() + " " + m + " " + dt.getUTCFullYear();
  });

  // Helper berita: saring per bahasa, urutkan terbaru dulu, ambil N teratas.
  eleventyConfig.addFilter("byLang", function (arr, lang) {
    return (arr || []).filter(function (p) { return p.data && p.data.lang === lang; });
  });
  eleventyConfig.addFilter("newest", function (arr) {
    return (arr || []).slice().sort(function (a, b) {
      return (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0);
    });
  });
  eleventyConfig.addFilter("head", function (arr, n) {
    return (arr || []).slice(0, n);
  });

  // Cari versi bahasa lain dari berita yang sama (base slug sama, bahasa berbeda).
  eleventyConfig.addFilter("findSibling", function (arr, base, lang) {
    if (!base) return null;
    return (arr || []).find(function (p) {
      return p.data && p.data.newsBase === base && p.data.lang === lang;
    }) || null;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
