const { haml } = require("./utils");

describe("script", () => {
  test("single line", () => {
    expect('%p= "hello"').toMatchFormat();
  });

  test("multi line", () => {
    const content = haml(`
      %p
        = ['hi', 'there', 'reader!'].join " "
        = "yo"
    `);

    expect(content).toMatchFormat();
  });

  test("preserve", () => {
    expect('~ "Foo\\n<pre>Bar\\nBaz</pre>"').toMatchFormat();
  });
});
