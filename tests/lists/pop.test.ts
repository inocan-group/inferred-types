import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { pop } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("pop(list)", () => {

  it("happy path", () => {
    const arr = [1,2,3] as const;
    const [val, remaining] = pop(arr);

    expect(remaining).toEqual([1,2]);
    expect(val, "value is").toBe(3);

    const empty = pop([]);

    expect(empty[0]).toBe(undefined)
    expect(empty[1]).toEqual([])

    type cases = [
      Expect<Equal<typeof val, 3>>,
      Expect<Equal<typeof remaining, [1,2]>>,
      Expect<Equal<typeof empty, [undefined, never[]]>>,
    ];
    const cases: cases = [ true, true, true ];
  });

});
