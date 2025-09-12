import { describe, expect, it } from "vitest";
import { ifScalar } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

describe("ifScalar(value)", () => {

  it("happy path for runtime and types", () => {
    const wide: number = 42 as number;
    const narrow = 42;
    const arr: number[] = [42, 56] as number[];

    const t1 = ifScalar(
      wide,
      v => `${v} is the meaning of life`,
      () => "no array for you!"
    );
    const t2 = ifScalar(narrow, v => v, () => "no");
    const t3 = ifScalar(arr, v => v, () => "no")

    expect(t1).toBe("42 is the meaning of life");
    expect(t2).toBe(42);

    type cases = [
      Expect<Test<typeof t1, "equals",  `${number} is the meaning of life`>>,
      Expect<Test<typeof t2, "equals",  42>>,
      Expect<Test<typeof t3, "equals",  "no">>,
    ];

  });

});
