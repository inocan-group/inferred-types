
import { describe, it } from "vitest";
import type { Expect, NextDigit, Test } from "inferred-types/types";

describe("NextDigit<T>", () => {

    it("happy path", () => {
        type One = NextDigit<1>;
        type Two = NextDigit<2>;
        type Overflow = NextDigit<9>;

        type OneStr = NextDigit<"1">;
        type TwoStr = NextDigit<"2">;
        type OverflowStr = NextDigit<"9">;

        type cases = [
            Expect<Test<One, "equals",  2>>,
            Expect<Test<Two, "equals",  3>>,
            Expect<Test<Overflow, "equals",  0>>,
            Expect<Test<OneStr, "equals",  "2">>,
            Expect<Test<TwoStr, "equals",  "3">>,
            Expect<Test<OverflowStr, "equals",  "0">>,
        ];
    });

});
