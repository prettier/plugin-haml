const prettier = require("prettier");

function checkFormat(before, after) {
  const formatted = prettier.format(before, { parser: "haml", plugins: ["."] });

  return {
    pass: formatted === `${after}\n`,
    message: () => `Expected:\n${after}\nReceived:\n${formatted}`
  };
}

expect.extend({
  toChangeFormat(before, after) {
    return checkFormat(before, after);
  },
  toMatchFormat(before) {
    return checkFormat(before, before);
  }
});
