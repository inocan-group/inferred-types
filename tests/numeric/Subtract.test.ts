import { describe, it } from "vitest";
import { Expect, Subtract, Test } from "inferred-types/types";



describe("Subtract<A,B>", () => {

    it("returns wide types due to circular dependency constraints", () => {
        type One = Subtract<5, 4>;
        type OneS = Subtract<"5", "4">;

        type Two = Subtract<500, 498>;
        type TwoS = Subtract<"500", "498">;

        // Due to circular dependencies with Add, Subtract returns wide types
        type cases = [
            Expect<Test<One, "equals",  number>>,
            Expect<Test<OneS, "equals",  `${number}`>>,
            Expect<Test<Two, "equals",  number>>,
            Expect<Test<TwoS, "equals",  `${number}`>>,
        ];

    });


    it("Negative results also return wide types", () => {
        type NegOne = Subtract<4, 5>;
        type NegOneS = Subtract<"4", "5">;
        type NegTwo = Subtract<498, 500>;
        type NegTwoS = Subtract<"498", "500">;

        // Due to circular dependencies with Add, Subtract returns wide types
        type cases = [
            Expect<Test<NegOne, "equals",  number>>,
            Expect<Test<NegOneS, "equals",  `${number}`>>,
            Expect<Test<NegTwo, "equals",  number>>,
            Expect<Test<NegTwoS, "equals",  `${number}`>>,
        ];
    });


});
