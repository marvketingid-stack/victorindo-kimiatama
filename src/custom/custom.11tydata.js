module.exports = {
  layout: "layouts/custom.njk",
  eleventyComputed: {
    permalink: (data) => {
      if (!data.slug) return false;
      return (data.lang === "id" ? "id/" : "") + data.slug + ".html";
    }
  }
};
