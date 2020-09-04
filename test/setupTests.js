const path = require("path");
const prettier = require("prettier");

const checkFormat = (before, after, config) => {
  const formatted = prettier.format(
    before,
    Object.assign({}, config, { parser: "haml", plugins: ["."] })
  );

  return {
    pass: formatted === `${after}\n`,
    message: () => `Expected:\n${after}\nReceived:\n${formatted}`
  };
};

expect.extend({
  toInferParser(filename) {
    const filepath = path.join(__dirname, filename);
    const plugins = [path.join(__dirname, "..", "..", "src", "plugin")];

    return prettier.getFileInfo(filepath, { plugins }).then((props) => {
      return {
        pass: props.inferredParser === "haml",
        message: () => `
            Expected prettier to infer the haml parser for ${filename},
            but got ${props.inferredParser} instead
          `
      };
    });
  },
  toChangeFormat(before, after, config = {}) {
    return checkFormat(before, after, config);
  },
  toMatchFormat(before, config = {}) {
    return checkFormat(before, before, config);
  }
});
