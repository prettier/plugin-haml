const {
  concat,
  group,
  hardline,
  indent,
  join
} = require("prettier/doc").builders;

// https://haml.info/docs/yardoc/file.REFERENCE.html#html-comments-
function comment(path, _opts, print) {
  const { children, value } = path.getValue();
  const parts = ["/"];

  if (value.revealed) {
    parts.push("!");
  }

  if (value.conditional) {
    parts.push(value.conditional);
  } else if (value.text) {
    parts.push(" ", value.text);
  }

  if (children.length > 0) {
    parts.push(
      indent(concat([hardline, join(hardline, path.map(print, "children"))]))
    );
  }

  return group(concat(parts));
}

module.exports = comment;
