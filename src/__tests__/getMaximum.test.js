import getMaximum from "../getMaximum";

test("getMaximum", () => {
  const data = { foo: 10, bar: 20, baz: 30 };

  expect(getMaximum(data)).toBe(30);
});
