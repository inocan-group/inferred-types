import { Equal, Expect } from "@type-challenges/utils";
import { takeProp } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<typeof foo, 42>>,
      Expect<Equal<typeof notContainer, "not">>,
      Expect<Equal<typeof notIndex, "not">>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

});
