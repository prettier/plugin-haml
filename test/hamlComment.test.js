const { haml } = require("./utils");

describe("haml comment", () => {
  test("same line", () => {
    expect("-# comment").toMatchFormat();
  });

  test("multi line", () => {
    const content = haml(`
      -#
        this is
          a multi line
        comment
    `);

    expect(content).toMatchFormat();
  });

  test("weird spacing same line", () => {
    expect("-#      foobar     ").toChangeFormat("-# foobar");
  });
});
