module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("date", (value, format) => {
    const date = value === "now" ? new Date() : new Date(value);
    if (format === "Y") return date.getFullYear().toString();
    return date.toLocaleDateString("en-US");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
