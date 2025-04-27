import { Equal, Expect } from "@type-challenges/utils";
import { takeProp } from "inferred-types/runtime";
import { Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";



describe("takeProp(obj,prop,else)", () => {

  it("happy path", () => {
    const TEST = { foo: 42, bar: 12, baz: true } as const;

    const foo = takeProp(TEST, "foo", "not");
    expect(foo).toEqual(42);

    const notContainer = takeProp(true, "bob", "not");
    expect(notContainer).toEqual("not");

    const notIndex = takeProp(TEST, "bob", "not");
    expect(notIndex).toEqual("not");

    type cases = [
      Expect<Test<typeof foo, "equals",  42>>,
      Expect<Test<typeof notContainer, "equals",  "not">>,
      Expect<Test<typeof notIndex, "equals",  "not">>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

});
