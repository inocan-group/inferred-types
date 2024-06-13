import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { ifScalar } from "../../../src/runtime/boolean-logic";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ifScalar(value)", () => {


  it("happy path for runtime and types", () => {
    const wide: number = 42 as number;
    const narrow = 42;
    const arr:  number[] = [42,56] as number[];

    const t1 = ifScalar(
        wide,
        v => `${v} is the meaning of life`,
        () => "no array for you!"
    );
    const t2 = ifScalar(narrow, v => v, () => "no");
    const t3 = ifScalar(arr, v=> v, () => "no")

    expect(t1).toBe("42 is the meaning of life");
    expect(t2).toBe(42);

    type cases = [
      Expect<Equal<typeof t1, `${number} is the meaning of life`>>,
      Expect<Equal<typeof t2, 42>>,
      Expect<Equal<typeof t3, "no">>,
    ];
    const cases: cases = [ true, true, true ];

  });

});
