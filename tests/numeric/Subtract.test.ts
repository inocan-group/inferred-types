import { describe, it } from "vitest";
import { Expect, Subtract, Test } from "inferred-types/types";



describe("Subtract<A,B>", () => {

    it("happy path", () => {
        type One = Subtract<5, 4>;
        type OneS = Subtract<"5", "4">;

        type Two = Subtract<500, 498>;
        type TwoS = Subtract<"500", "498">;

        type cases = [
            Expect<Test<One, "equals",  1>>,
            Expect<Test<OneS, "equals",  "1">>,
            Expect<Test<Two, "equals",  2>>,
            Expect<Test<TwoS, "equals",  "2">>,
        ];

    });


    it("Negative results", () => {
        type NegOne = Subtract<4, 5>;
        type NegOneS = Subtract<"4", "5">;
        type NegTwo = Subtract<498, 500>;
        type NegTwoS = Subtract<"498", "500">;

        type cases = [
            Expect<Test<NegOne, "equals",  -1>>,
            Expect<Test<NegOneS, "equals",  "-1">>,
            Expect<Test<NegTwo, "equals",  -2>>,
            Expect<Test<NegTwoS, "equals",  "-2">>,
        ];
    });


});
