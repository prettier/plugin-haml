const { long, haml } = require("./utils");

describe("tag", () => {
  test("class", () => {
    expect("%p.foo").toMatchFormat();
  });

  test("class multiple", () => {
    expect("%p.foo.bar.baz").toMatchFormat();
  });

  test("id", () => {
    expect("%p#foo").toMatchFormat();
  });

  test("classes and id", () => {
    expect("%p.foo.bar#baz").toMatchFormat();
  });

  test("self closing", () => {
    expect("%br/").toMatchFormat();
  });

  test("whitespace removal right single line", () => {
    expect('%p<= "Foo\\nBar"').toMatchFormat();
  });

  test("whitespace removal right multi line", () => {
    const content = haml(`
      %blockquote<
        %div
          Foo!
    `);

    expect(content).toMatchFormat();
  });

  test("dynamic attributes", () => {
    const content = "%div{ data: { controller: 'lesson-evaluation' } }";

    expect(content).toMatchFormat();
  });

  test("object reference", () => {
    const content = haml(`
      %div[@user, :greeting]
        %bar[290]/
        Hello!
    `);

    expect(content).toMatchFormat();
  });

  test("long declaration before text", () => {
    const declaration = `%button{ data: { current: ${long} } }`;

    expect(`${declaration} foo`).toChangeFormat(`${declaration}\n  foo`);
  });
});
