import { Equal, Expect } from "@type-challenges/utils";
import { uniqueKeys } from "../../src/runtime/dictionary";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("uniqueKeys(a,b)", () => {

  it("happy path", () => {
    const a = { foo:1, bar: 23, color: "blue" } ;
    const b = { bar: 55, baz: 66, color: "red" } ;

    const shared = uniqueKeys(a,b);
    expect(shared).toEqual([["foo"], ["baz"]]);
    
    type cases = [
      Expect<Equal<typeof shared, readonly [["foo"],["baz"]]>>
    ];
    const cases: cases = [true];
  });

});
