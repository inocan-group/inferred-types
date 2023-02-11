import { Equal, Expect } from "@type-challenges/utils";
import { uniqueKeys } from "../../src/runtime/dictionary";
import { describe, expect, it } from "vitest";
import { Keys, Unique } from "src/types";
import { ContainsAll } from "src/types/boolean-logic/ContainsAll";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("uniqueKeys(a,b)", () => {

  it("happy path", () => {
    const a = { foo: 1, bar: 23, color: "blue" };
    const b = { bar: 55, baz: 66, color: "red" };
    type A = typeof a;
    type B = typeof b;
    type KA = Keys<A>;
    type KB = Keys<B>;
    type U = Unique<A,B>;

    const shared = uniqueKeys(a,b);
    expect(shared).toEqual([["foo"], ["baz"]]);
    
    type cases = [
      Expect<ContainsAll<KA, ["foo", "bar", "color"]>>,
      Expect<ContainsAll<KB, ["bar", "baz", "color"]>>,
      Expect<Equal<U, readonly [ {foo: number}, {baz: number} ]>>,
    ];
    const cases: cases = [true, true, true];
  });

});
