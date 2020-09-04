const doc = require("prettier/doc");

const { concat, hardline, indent, literalline, markAsRoot } = doc.builders;
const { mapDoc, stripTrailingHardline } = doc.utils;

// Get the name of the parser that is represented by the given element node,
// return null if a matching parser cannot be found
function getParser(name, opts) {
  let parser = name;

  // We don't want to deal with some weird recursive parser situation, so we
  // need to explicitly call out the HAML parser here and just return null
  if (parser === "haml") {
    return null;
  }

  // In HAML the name of the JS filter is :javascript, whereas in prettier the
  // name of the JS parser is babel. Here we explicitly handle that conversion.
  if (parser === "javascript") {
    parser = "babel";
  }

  // If there is a plugin that has a parser that matches the name of this
  // element, then we're going to assume that's correct for embedding and go
  // ahead and switch to that parser
  if (
    opts.plugins.some(
      (plugin) =>
        plugin.parsers &&
        Object.prototype.hasOwnProperty.call(plugin.parsers, parser)
    )
  ) {
    return parser;
  }

  return null;
}

function replaceNewlines(doc) {
  return mapDoc(doc, (currentDoc) =>
    typeof currentDoc === "string" && currentDoc.includes("\n")
      ? concat(
          currentDoc
            .split(/(\n)/g)
            .map((v, i) => (i % 2 === 0 ? v : literalline))
        )
      : currentDoc
  );
}

function embed(path, _print, textToDoc, opts) {
  const node = path.getValue();
  if (node.type !== "filter") {
    return null;
  }

  const parser = getParser(node.value.name, opts);
  if (!parser) {
    return null;
  }

  return markAsRoot(
    concat([
      ":",
      node.value.name,
      indent(
        concat([
          hardline,
          replaceNewlines(
            stripTrailingHardline(textToDoc(node.value.text, { parser }))
          )
        ])
      )
    ])
  );
}

module.exports = embed;
