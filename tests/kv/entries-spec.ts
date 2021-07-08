import type { Expect, NotEqual, Equal, ExpectExtends } from "@type-challenges/utils";
import { entries } from "~/utility";

describe("entries() => ", () => {
  it("literal types are retained", () => {
    const obj = { foo: 1, bar: "hi" } as const;
    type Value = 1 | "hi";

    for (const [k, v] of entries(obj)) {
      type cases = [
        // the key should extend string
        Expect<ExpectExtends<string, typeof k>>,
        // but because it's a literal, it should not be a string
        Expect<NotEqual<string, typeof k>>,
        // this is shown as a union of literals here
        Expect<Equal<"foo" | "bar", typeof k>>,
        // the value should also be a union of the possible literals
        Expect<ExpectExtends<typeof v, Value>>
      ];
      const cases: cases = [true, true, true, true];
      expect(cases).toBe(cases);

      if (k === "foo") {
        type cases2 = [
          // inside a conditional, typescript knows as an
          // explicit type and no longer a union of keys
          Expect<Equal<typeof k, "foo">>,
          // but the value is still a union of all KV 
          // values which makes it far less valueable
          Expect<Equal<typeof v, Value>>,
        ];
        const c: cases2 = [true, true];
        expect(c).toBe(c);
      }
    }

    // for (const entry of entries(obj)) {
    //   if (entry[0] === "foo") {
    //     type K = typeof entry[0];
    //     type V = typeof entry[1];

    //     type cases3 = [
    //       // inside a conditional, typescript knows as an
    //       // explicit type and no longer a union of keys
    //       Expect<Equal<typeof entry[0], "foo">>,
    //       // but the value is still a union of all KV 
    //       // values which makes it far less valueable
    //       Expect<Equal<typeof v, Value>>,
    //     ];
    //     const c: cases3 = [true, true];
    //     expect(c).toBe(c);
    //   }
    // }



  });

  it("values maintain their implicit type even when nested objects", () => {
    const obj = { foo: { bar: { baz: 42 } } };
    for (const [k, v] of entries(obj)) {
      expect(k).toBe("foo");
      expect(v).toBe(obj.foo);
    }
  });
});
