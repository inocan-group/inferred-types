import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IntersectWithAll } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IntersectWithAll<TList,TIntersect>", () => {

  it("happy path", () => {
    type DropStrings = IntersectWithAll<[1,2,3, "foo"], number>;
    type Narrow = IntersectWithAll<[number|string, number|boolean], number>;

    type cases = [
      Expect<Equal<DropStrings, [1,2,3]>>,
      Expect<Equal<Narrow, [number, number]>>,
    ];
    const cases: cases = [ true, true];
  });

});
