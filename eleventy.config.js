module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/.htaccess": ".htaccess" });

  // Tanggal ISO untuk sitemap.xml (mis. 2026-07-21)
  eleventyConfig.addFilter("dateISO", function (d) {
    return (d instanceof Date ? d : new Date()).toISOString().slice(0, 10);
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
