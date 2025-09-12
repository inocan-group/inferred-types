import { describe, it, expect } from "vitest";
import type { CamelCase, Expect, Test } from "inferred-types/types";

const target = "twoThreeFour";
type TARGET = typeof target;

describe("CamelCase<T> type utility", () => {
    it("CamelCase<T> provides an identity to a CamelCased string", () => {
        type T1 = CamelCase<"TwoThreeFour">;
        type T2 = CamelCase<"\n TwoThreeFour ">;

        type cases = [
            Expect<Test<T1, "equals", TARGET>>,
            Expect<Test<T2, "equals", TARGET>>
        ];
    });

    it("CamelCase<T> transform snake_case type", () => {
        type T1 = CamelCase<"two_three_four">;

        type cases = [
            Expect<Test<T1, "equals", TARGET>>
        ];
    });

    it("CamelCase<T> transforms camelCase type", () => {
        type T1 = CamelCase<"twoThreeFour">;
        type T2 = CamelCase<"  twoThreeFour \t">;

        type cases = [
            Expect<Test<T1, "equals", TARGET>>,
            Expect<Test<T2, "equals", TARGET>>
        ];
    });

    it("CamelCase<T> transforms camelCase type up to any length", () => {
        type T1 = CamelCase<"twoThreeFour">;
        type T2 = CamelCase<"twoThreeFourFive">;
        type T3 = CamelCase<"twoThreeFourFiveSix">;
        type T4 = CamelCase<"twoThreeFourFiveSixSeven">;
        type T5 = CamelCase<"twoThreeFourFiveSixSevenEight">;
        type T6 = CamelCase<"twoThreeFourFiveSixSevenEightNineTenEleven">;

        type cases = [
            Expect<Test<T1, "equals", TARGET>>,
            Expect<Test<T2, "equals", "twoThreeFourFive">>,
            Expect<Test<T3, "equals", "twoThreeFourFiveSix">>,
            Expect<Test<T4, "equals", "twoThreeFourFiveSixSeven">>,
            Expect<Test<T5, "equals", "twoThreeFourFiveSixSevenEight">>,
            Expect<Test<T6, "equals", "twoThreeFourFiveSixSevenEightNineTenEleven">>
        ];
    });

    it("CamelCase<T> transforms interior space to CamelCased type", () => {
        type T1 = CamelCase<"two three four">;

        type cases = [Expect<Test<T1, "equals", TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("CamelCase<T> transforms ALL CAPS to CamelCased type", () => {
        type T1 = CamelCase<"TWO THREE FOUR">;
        type T2 = CamelCase<"\n TWO_THREE_FOUR ">;
        type T3 = CamelCase<"\n TWO-THREE-FOUR ">;

        type cases = [
            Expect<Test<T1, "equals", TARGET>>,
            Expect<Test<T2, "equals", TARGET>>,
            Expect<Test<T3, "equals", TARGET>>
        ];

    });

    it("CamelCase<T> removes leading and trailing whitespace and still converts", () => {
        type T1 = CamelCase<"  one two three ">;
        type T2 = CamelCase<"\n  one two three ">;

        type cases = [
            Expect<Test<T1, "equals", "oneTwoThree">>,
            Expect<Test<T2, "equals", "oneTwoThree">>
        ];
    });

    it("CamelCase<T> returns 'string' type when passed a non-literal string", () => {
        type T1 = CamelCase<string>;

        type cases = [Expect<Test<T1, "equals", string>>];
    });

    it("CamelCase<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
        type T1 = CamelCase<"one two three four five six seven eight nine">;
        type T2 = CamelCase<"one_two_three_four_five_six_seven_eight_nine">;
        type T3 = CamelCase<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE">;
        // also works for multiple delimiters
        type T4 = CamelCase<"one-two-three-four_five_six_seven_eight_nine">;
        type T5 = CamelCase<"\n one-two-three-four_five_six_seven_eight_nine \t">;

        type cases = [
            Expect<Test<T1, "equals", "oneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T2, "equals", "oneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T3, "equals", "oneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T4, "equals", "oneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T5, "equals", "oneTwoThreeFourFiveSixSevenEightNine">>
        ];
    });

    it("camel casing a tuple of things", () => {
        type T = CamelCase<["foo_bar", 42, true, "BarBaz"]>;

        type cases = [
            Expect<
                Test<T, "equals", ["fooBar", 42, true, "barBaz"]
            >>
        ];
    });

});
