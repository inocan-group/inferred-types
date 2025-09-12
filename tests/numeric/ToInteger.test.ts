import { describe, it } from "vitest";
import type { Expect, Test, ToInteger } from "inferred-types/types";

describe("ToInteger", () => {

    it("happy path", () => {
        type Numeric = ToInteger<4.555>;
        type StrNum = ToInteger<"4.755">;
        type StrRoundUp = ToInteger<"4.755", "round">;
        type StrRoundDown = ToInteger<"4.355", "round">;

        type NumInt = ToInteger<4>;
        type StrInt = ToInteger<"4">;

        type cases = [
            Expect<Test<Numeric, "equals",  4>>,
            Expect<Test<StrNum, "equals",  "4">>,

            Expect<Test<StrRoundUp, "equals",  "5">>,
            Expect<Test<StrRoundDown, "equals",  "4">>,

            Expect<Test<NumInt, "equals",  4>>,
            Expect<Test<StrInt, "equals",  "4">>,
        ];
    });

});
