
import { describe, it } from "vitest";
import type { Expect, PriorDigit, Test } from "inferred-types/types";

describe("PriorDigit<T>", () => {

    it("happy path", () => {
        type Two = PriorDigit<2>;
        type Three = PriorDigit<3>;
        type Overflow = PriorDigit<0>;

        type TwoStr = PriorDigit<"2">;
        type ThreeStr = PriorDigit<"3">;
        type OverflowStr = PriorDigit<"0">;

        type cases = [
            Expect<Test<Two, "equals",  1>>,
            Expect<Test<Three, "equals",  2>>,
            Expect<Test<Overflow, "equals",  9>>,

            Expect<Test<TwoStr, "equals",  "1">>,
            Expect<Test<ThreeStr, "equals",  "2">>,
            Expect<Test<OverflowStr, "equals",  "9">>,
        ];
    });

});
