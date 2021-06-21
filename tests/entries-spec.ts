import type { Expect, NotEqual, ExpectExtends } from "@type-challenges/utils";
import { entries } from "~/utility";

describe("entries() => ", () => {
  it("keys maintain their string literal type", () => {
    const obj = { foo: 1, bar: "hi" };
    for (const [k, v] of entries(obj)) {
      type Value = string | number;
      type cases = [
        Expect<ExpectExtends<string, typeof k>>,
        Expect<NotEqual<string, typeof k>>,
        Expect<ExpectExtends<typeof v, Value>>
      ];
      const cases: cases = [true, true, true];
      expect(cases).toBe(cases);
    }
  });

  it("values maintain their implicit type even when nested objects", () => {
    const obj = { foo: { bar: { baz: 42 } } };
    for (const [k, v] of entries(obj)) {
      expect(k).toBe("foo");
      expect(v).toBe(obj.foo);
    }
  });
});
