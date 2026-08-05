module.exports = {
  layout: "layouts/custom.njk",
  tags: "customPage",
  eleventyComputed: {
    // Struktur i18n Decap "multiple_files": tiap bahasa jadi file <slug>.id.md / <slug>.en.md.
    // Bahasa & slug diturunkan dari NAMA FILE (fileSlug = "<slug>.<lang>").
    // Berita lama gaya lama (punya frontmatter lang/slug) tetap dihormati sebagai cadangan.
    newsBase: (data) => {
      const m = /^(.+)\.(id|en)$/.exec(data.page.fileSlug);
      return m ? m[1] : (data.slug || data.page.fileSlug);
    },
    lang: (data) => {
      const m = /\.(id|en)$/.exec(data.page.fileSlug);
      return m ? m[1] : (data.lang || "id");
    },
    permalink: (data) => {
      const m = /^(.+)\.(id|en)$/.exec(data.page.fileSlug);
      const slug = m ? m[1] : (data.slug || data.page.fileSlug);
      const lang = m ? m[2] : (data.lang || "id");
      if (!slug) return false;
      return (lang === "id" ? "id/" : "") + slug + "/index.html";
    }
  }
};
