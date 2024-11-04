import { Equal, Expect } from "@type-challenges/utils";
import { UnionWithAll } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionWithAll<TList,TUnion>", () => {

  it("happy path", () => {
    type MightBeNumber = UnionWithAll<[1,2,3, "foo"], number>;
    type Consider42 = UnionWithAll<[1,2,3,"foo"], 42>;

    type cases = [
      Expect<Equal<MightBeNumber, [number, number, number, "foo" | number]>>,
      Expect<Equal<Consider42, [1|42, 2|42, 3|42, "foo"|42]>>,
    ];
    const cases: cases = [ true, true];
  });

});
