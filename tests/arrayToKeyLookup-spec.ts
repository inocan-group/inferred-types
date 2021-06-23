import { Equal, Expect } from "@type-challenges/utils";
import { arrayToKeyLookup } from "~/utility";

describe("arrayToKeyLookup()", () => {
  it("simple string array is converted", () => {
    const lookup = arrayToKeyLookup("foo", "bar", "baz");
    expect(lookup.foo).toBe(true);
    expect(lookup.bar).toBe(true);
    expect(lookup.baz).toBe(true);

    type cases = [
      Expect<Equal<typeof lookup, Record<"foo" | "bar" | "baz", true>>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});