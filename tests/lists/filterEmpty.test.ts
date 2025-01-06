import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { filterEmpty, isEmpty } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("filterEmpty", () => {

  it("happy path", () => {
    const t1 = filterEmpty(1,2,undefined,"foo" as string, "")

    expect(isEmpty(undefined)).toBe(true);
    expect(t1).toEqual([1,2,"foo"]);

    type cases = [
      Expect<Equal<typeof t1, [1,2,string]>>
    ];
  });

});
