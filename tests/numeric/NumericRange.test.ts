import { describe, it } from "vitest";
import type { Expect, NumericRange, Test } from "inferred-types/types";

describe("NumericRange<TLow,THigh>", () => {

    it("happy path", () => {
        type R1 = NumericRange<2, 7>;
        type R2 = NumericRange<5, 6>;

        type cases = [
            Expect<Test<R1, "equals",  2 | 3 | 4 | 5 | 6 | 7>>,
            Expect<Test<R2, "equals",  5 | 6>>
        ];
    });

});
