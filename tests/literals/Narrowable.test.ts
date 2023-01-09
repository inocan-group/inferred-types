import { Equal, Expect } from "@type-challenges/utils";
import { narrow } from "src/runtime/literals/narrow";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Narrowable", () => {

  it("narrow() runtime util", () => {
    const stringLiteral = narrow("foo");
    const numericLiteral = narrow(42);

    const stringTuple1 = narrow(["foo", "bar"] as const);
    const stringTuple2 = narrow(["foo", "bar"]);
    const stringTuple3 = narrow("foo", "bar");

    const mixedTuple1 = narrow(["foo", 42] as const);
    const mixedTuple2 = narrow(["foo", 42]);
    const mixedTuple3 = narrow("foo", 42);
    
    type cases = [
      Expect<Equal<typeof stringLiteral, "foo">>,
      Expect<Equal<typeof numericLiteral, 42>>,
      
      Expect<Equal<typeof stringTuple1, ["foo", "bar"]>>,
      Expect<Equal<typeof stringTuple2, string[]>>,
      Expect<Equal<typeof stringTuple3, ["foo", "bar"]>>,

      Expect<Equal<typeof mixedTuple1, ["foo", 42]>>,
      Expect<Equal<typeof mixedTuple2, (string | number)[]>>,
      Expect<Equal<typeof mixedTuple3, ["foo", 42]>>,

    ];
    const cases: cases = [true, true, true, true, true, true, true, true];
  });

});
