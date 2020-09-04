// https://haml.info/docs/yardoc/file.REFERENCE.html#plain-text
const plain = (path, _opts, _print) => path.getValue().value.text;

module.exports = plain;
