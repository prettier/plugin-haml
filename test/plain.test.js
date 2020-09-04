describe("plain", () => {
  const specialChars = ["%", ".", "#", "/", "!", "=", "&", "~", "-", "\\", ":"];

  test.each(specialChars)("escapes starting %s", (specialChar) => {
    expect(`\\${specialChar}`).toMatchFormat();
  });

  test("does not unnecessarily escape other characters", () => {
    expect("foo").toMatchFormat();
  });
});
