import { describe, it } from "vitest";
import type { Expect, Subtract, Test } from "inferred-types/types";

describe("Subtract<A,B>", () => {

    it("positive results return literal types", () => {
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

    it("negative results return literal types", () => {
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

    it("handles mixed sign operations", () => {
        // Positive minus negative = positive + positive
        type PosMinusNeg = Subtract<5, -3>;
        type PosMinusNegS = Subtract<"5", "-3">;
        
        // Negative minus positive = -(positive + positive)
        type NegMinusPos = Subtract<-5, 3>;
        type NegMinusPosS = Subtract<"-5", "3">;
        
        // Negative minus negative
        type NegMinusNeg1 = Subtract<-5, -3>; // -5 - (-3) = -5 + 3 = -2
        type NegMinusNeg2 = Subtract<-3, -5>; // -3 - (-5) = -3 + 5 = 2
        
        type cases = [
            Expect<Test<PosMinusNeg, "equals", 8>>,
            Expect<Test<PosMinusNegS, "equals", "8">>,
            Expect<Test<NegMinusPos, "equals", -8>>,
            Expect<Test<NegMinusPosS, "equals", "-8">>,
            Expect<Test<NegMinusNeg1, "equals", -2>>,
            Expect<Test<NegMinusNeg2, "equals", 2>>,
        ];
    });

    it("handles zero cases", () => {
        type ZeroMinusPos = Subtract<0, 5>;
        type ZeroMinusNeg = Subtract<0, -5>;
        type PosMinusZero = Subtract<5, 0>;
        type NegMinusZero = Subtract<-5, 0>;
        type ZeroMinusZero = Subtract<0, 0>;
        
        type cases = [
            Expect<Test<ZeroMinusPos, "equals", -5>>,
            Expect<Test<ZeroMinusNeg, "equals", 5>>,
            Expect<Test<PosMinusZero, "equals", 5>>,
            Expect<Test<NegMinusZero, "equals", -5>>,
            Expect<Test<ZeroMinusZero, "equals", 0>>,
        ];
    });

    it("handles larger numbers", () => {
        type Large1 = Subtract<1000, 999>;
        type Large2 = Subtract<"9999", "1">;
        type Large3 = Subtract<123456, 123450>;
        type Large4 = Subtract<100, 200>;
        
        type cases = [
            Expect<Test<Large1, "equals", 1>>,
            Expect<Test<Large2, "equals", "9998">>,
            Expect<Test<Large3, "equals", 6>>,
            Expect<Test<Large4, "equals", -100>>,
        ];
    });

});
