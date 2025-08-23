module.exports = {
  extends: ["next/core-web-vitals"],
  overrides: [
    {
      files: ["**/*.mdx"],
      processor: null, // هیچ پردازشی روی MDX انجام نده
      parser: null, // هیچ parser ای برای MDX انتخاب نکن
      rules: {},
    },
  ],
  ignorePatterns: ["**/*.mdx"], // برای اطمینان دوباره ignore کن
};
