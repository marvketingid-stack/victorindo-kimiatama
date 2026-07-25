module.exports = {
  layout: "layouts/custom.njk",
  tags: "customPage",
  eleventyComputed: {
    permalink: (data) => {
      if (!data.slug) return false;
      return (data.lang === "id" ? "id/" : "") + data.slug + "/index.html";
    }
  }
};
