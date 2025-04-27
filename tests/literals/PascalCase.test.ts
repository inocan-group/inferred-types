import { describe, it, expect } from "vitest";

import { Equal, Expect } from "@type-challenges/utils";
import { PascalCase } from "inferred-types/types";

const target = "TwoThreeFour";
type TARGET = typeof target;

describe("PascalCase<T> type utility", () => {
    it("PascalCase<T> provides an identity to a PascalCased string", () => {
        type T1 = PascalCase<"TwoThreeFour">;
        type T2 = PascalCase<"\n TwoThreeFour ">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, "equals",  TARGET>>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> transform snake_case type", () => {
        type T1 = PascalCase<"two_three_four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> transforms camelCase type", () => {
        type T1 = PascalCase<"twoThreeFour">;
        type T2 = PascalCase<"  twoThreeFour \t">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, "equals",  TARGET>>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> transforms camelCase type up to any length", () => {
        type T1 = PascalCase<"twoThreeFour">;
        type T2 = PascalCase<"twoThreeFourFive">;
        type T3 = PascalCase<"twoThreeFourFiveSix">;
        type T4 = PascalCase<"twoThreeFourFiveSixSeven">;
        type T5 = PascalCase<"twoThreeFourFiveSixSevenEight">;
        type T6 = PascalCase<"twoThreeFourFiveSixSevenEightNineTenEleven">;

        type cases = [
            Expect<Test<T1, "equals",  TARGET>>,
            Expect<Test<T2, "equals",  "TwoThreeFourFive">>,
            Expect<Test<T3, "equals",  "TwoThreeFourFiveSix">>,
            Expect<Test<T4, "equals",  "TwoThreeFourFiveSixSeven">>,
            Expect<Test<T5, "equals",  "TwoThreeFourFiveSixSevenEight">>,
            Expect<Test<T6, "equals",  "TwoThreeFourFiveSixSevenEightNineTenEleven">>
        ];
        const c: cases = [true, true, true, true, true, true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> transforms interior space to PascalCased type", () => {
        type T1 = PascalCase<"two three four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> transforms ALL CAPS to PascalCased type", () => {
        type T1 = PascalCase<"TWO THREE FOUR">;
        type T2 = PascalCase<"\n TWO_THREE_FOUR ">;
        type T3 = PascalCase<"\n TWO-THREE-FOUR ">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, TARGET>>, Expect<Equal<T3, "equals",  TARGET>>];
        const c: cases = [true, true, true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> removes leading and trailing whitespace and still converts", () => {
        type T1 = PascalCase<"  one two three ">;
        type T2 = PascalCase<"\n  one two three ">;

        type cases = [Expect<Test<T1, "OneTwoThree">>, Expect<Equal<T2, "equals",  "OneTwoThree">>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> returns 'string' type when passed a non-literal string", () => {
        type T1 = PascalCase<string>;

        type cases = [Expect<Test<T1, "equals",  string>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("PascalCase<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
        type T1 = PascalCase<"one two three four five six seven eight nine">;
        type T2 = PascalCase<"one_two_three_four_five_six_seven_eight_nine">;
        type T3 = PascalCase<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE">;
        // also works for multiple delimiters
        type T4 = PascalCase<"one-two-three-four_five_six_seven_eight_nine">;
        type T5 = PascalCase<"\n one-two-three-four_five_six_seven eight_nine \t">;

        type cases = [
            Expect<Test<T1, "equals",  "OneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T2, "equals",  "OneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T3, "equals",  "OneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T4, "equals",  "OneTwoThreeFourFiveSixSevenEightNine">>,
            Expect<Test<T5, "equals",  "OneTwoThreeFourFiveSixSevenEightNine">>
        ];
        const c: cases = [true, true, true, true, true];
        expect(c).toBe(c);
    });
});
