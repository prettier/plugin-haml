const embed = require("./embed");
const parser = require("./parser");
const printer = require("./printer");

module.exports = {
  languages: [
    {
      name: "HAML",
      parsers: ["haml"],
      extensions: [".haml"],
      vscodeLanguageIds: ["haml"]
    }
  ],
  parsers: {
    haml: parser
  },
  printers: {
    haml: {
      embed,
      print: printer
    }
  },
  defaultOptions: {
    printWidth: 80,
    tabWidth: 2
  }
};
