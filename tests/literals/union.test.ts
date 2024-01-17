import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { union } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("union(options) => (value)", () => {

  it("happy path", () => {
    const str1 = union("foo", "bar", "baz")("foo");
    expect(str1).toBe("foo");

    const num1 = union(1,2,3)(2);
    expect(num1).toBe(2);
    
    type cases = [
      Expect<Equal<typeof str1, "foo" | "bar" | "baz">>,
      Expect<Equal<typeof num1, 1 | 2 | 3>>,
    ];
    const cases: cases = [ true, true ];
  });

});
