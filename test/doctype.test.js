describe("doctype", () => {
  test("basic", () => {
    expect("!!! Basic").toMatchFormat();
  });

  test("frameset", () => {
    expect("!!! Frameset").toMatchFormat();
  });

  test("mobile", () => {
    expect("!!! Mobile").toMatchFormat();
  });

  test("rdfa", () => {
    expect("!!! RDFa").toMatchFormat();
  });

  test("strict", () => {
    expect("!!! Strict").toMatchFormat();
  });

  test("xml", () => {
    expect("!!! XML").toMatchFormat();
  });

  test("encoding", () => {
    expect("!!! XML iso-8859-1").toMatchFormat();
  });
});
