module.exports = {
  layout: "layouts/custom.njk",
  tags: "customPage",
  eleventyComputed: {
    permalink: (data) => {
      // Alamat URL dibuat otomatis dari NAMA FILE (mis. "id-berita-baru" -> /id/berita-baru/).
      // Editor tidak perlu mengisi slug; nama file dihasilkan CMS dari bahasa + judul.
      // Slug eksplisit di frontmatter (jika ada) tetap dihormati demi kompatibilitas.
      const fileSlug = (data.page && data.page.fileSlug) || "";
      const lang = data.lang || (fileSlug.indexOf("en-") === 0 ? "en" : "id");
      const slug = data.slug || fileSlug.replace(/^(en|id)-/, "");
      if (!slug) return false;
      return (lang === "id" ? "id/" : "") + slug + "/index.html";
    }
  }
};
