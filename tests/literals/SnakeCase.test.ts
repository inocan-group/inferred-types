import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import type { SnakeCase } from "inferred-types/types";

const target = "two_three_four";
type TARGET = typeof target;

describe("SnakeCase<T> type utility", () => {
    it("SnakeCase<T> provides an identity to a SnakeCased string", () => {
        type T1 = SnakeCase<"TwoThreeFour">;
        type T2 = SnakeCase<"\n TwoThreeFour ">;

        type cases = [
            Expect<Test<T1, TARGET>>, Expect<Equal<T2, "equals",  TARGET>> //
        ];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> transform snake_case type", () => {
        type T1 = SnakeCase<"two_three_four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> transforms camelCase type", () => {
        type T1 = SnakeCase<"twoThreeFour">;
        type T2 = SnakeCase<"  twoThreeFour \t">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, "equals",  TARGET>>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> transforms camelCase type up to a reasonable length", () => {
        type T1 = SnakeCase<"twoThreeFour">;
        type T2 = SnakeCase<"twoThreeFourFive">;
        type T3 = SnakeCase<"twoThreeFourFiveSix">;
        type T4 = SnakeCase<"twoThreeFourFiveSixSeven">;
        type T5 = SnakeCase<"twoThreeFourFiveSixSevenEight">;
        // type T6 = SnakeCase<"twoThreeFourFiveSixSevenEightNineTenEleven">;

        type cases = [
            Expect<Test<T1, "equals",  TARGET>>,
            Expect<Test<T2, "equals",  "two_three_four_five">>,
            Expect<Test<T3, "equals",  "two_three_four_five_six">>,
            Expect<Test<T4, "equals",  "two_three_four_five_six_seven">>,
            Expect<Test<T5, "equals",  "two_three_four_five_six_seven_eight">>
            // Expect<Test<T6, "equals",  "TwoThreeFourFiveSixSevenEightNineTenEleven">>,
        ];
        const c: cases = [true, true, true, true, true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> transforms interior space to SnakeCased type", () => {
        type T1 = SnakeCase<"two three four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> transforms ALL CAPS to SnakeCased type", () => {
        type T1 = SnakeCase<"TWO THREE FOUR">;
        type T2 = SnakeCase<"\n TWO_THREE_FOUR ">;
        type T3 = SnakeCase<"\n TWO-THREE-FOUR ">;

        type cases = [
            Expect<Test<T1, "equals",  TARGET>>, //
            Expect<Test<T2, "equals",  TARGET>>,
            Expect<Test<T3, "equals",  TARGET>>
        ];
        const c: cases = [true, true, true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> removes leading and trailing whitespace and still converts", () => {
        type T1 = SnakeCase<"  one two three ">;
        type T2 = SnakeCase<"\n  one two three ">;

        type cases = [
            Expect<Test<T1, "equals",  "one_two_three">>,
            Expect<Test<T2, "equals",  "one_two_three">>
        ];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> returns 'string' type when passed a non-literal string", () => {
        type T1 = SnakeCase<string>;

        type cases = [Expect<Test<T1, "equals",  string>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("SnakeCase<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
        type T1 = SnakeCase<"one two three four five six seven eight nine">;
        type T2 = SnakeCase<"one_two_three_four_five_six_seven_eight_nine">;
        type T3 = SnakeCase<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE">;
        // also works for multiple delimiters
        type T4 = SnakeCase<"one-two-three-four_five_six_seven_eight_nine">;
        type T5 = SnakeCase<"\n one-two-three-four_five_six_seven eight_nine \t">;

        type cases = [
            Expect<Test<T1, "equals",  "one_two_three_four_five_six_seven_eight_nine">>,
            Expect<Test<T2, "equals",  "one_two_three_four_five_six_seven_eight_nine">>,
            Expect<Test<T3, "equals",  "one_two_three_four_five_six_seven_eight_nine">>,
            Expect<Test<T4, "equals",  "one_two_three_four_five_six_seven_eight_nine">>,
            Expect<Test<T5, "equals",  "one_two_three_four_five_six_seven_eight_nine">>
        ];
        const c: cases = [true, true, true, true, true];
        expect(c).toBe(c);
    });
});
