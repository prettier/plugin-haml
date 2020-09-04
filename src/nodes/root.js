const { concat, hardline, join } = require("prettier/doc").builders;

const root = (path, _opts, print) =>
  concat([join(hardline, path.map(print, "children")), hardline]);

module.exports = root;
