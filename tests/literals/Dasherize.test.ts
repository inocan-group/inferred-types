import { describe, it, expect } from "vitest";

import { Equal, Expect } from "@type-challenges/utils";
import { KebabCase } from "inferred-types/types";

const target = "two-three-four";
type TARGET = typeof target;

describe("Dasherize<T> type utility", () => {
    it("Dasherize<T> provides an identity to a dasherized string", () => {
        type T1 = KebabCase<"two-three-four">;
        type T2 = KebabCase<"\n two-three-four ">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, "equals",  TARGET>>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> transform snake_case type", () => {
        type T1 = KebabCase<"two_three_four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> transforms PascalCase type", () => {
        type T1 = KebabCase<"TwoThreeFour">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> transforms camelCase type up to a pretty long length", () => {
        type T1 = KebabCase<"twoThreeFour">;
        type T2 = KebabCase<"twoThreeFourFive">;
        type T3 = KebabCase<"twoThreeFourFiveSix">;
        type T4 = KebabCase<"twoThreeFourFiveSixSeven">;
        type T5 = KebabCase<"twoThreeFourFiveSixSevenEight">;
        // type T6 = Dasherize<"twoThreeFourFiveSixSevenEightNine">;

        type cases = [
            Expect<Test<T1, "equals",  TARGET>>,
            Expect<Test<T2, "equals",  "two-three-four-five">>,
            Expect<Test<T3, "equals",  "two-three-four-five-six">>,
            Expect<Test<T4, "equals",  "two-three-four-five-six-seven">>,
            Expect<Test<T5, "equals",  "two-three-four-five-six-seven-eight">>
            // Expect<Test<T6, "equals",  "two-three-four-five-six-seven-eight-nine">>,
        ];
        const c: cases = [true, true, true, true, true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> transforms interior space to dasherized type", () => {
        type T1 = KebabCase<"two three four">;

        type cases = [Expect<Test<T1, "equals",  TARGET>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> transforms ALL CAPS to dasherized type", () => {
        type T1 = KebabCase<"TWO THREE FOUR">;
        type T2 = KebabCase<"\n TWO_THREE_FOUR ">;
        type T3 = KebabCase<"\n TWO-THREE-FOUR ">;

        type cases = [Expect<Test<T1, TARGET>>, Expect<Equal<T2, TARGET>>, Expect<Equal<T3, "equals",  TARGET>>];
        const c: cases = [true, true, true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> removes leading and trailing whitespace and still converts", () => {
        type T1 = KebabCase<"  one two three ">;
        type T2 = KebabCase<"\n  one two three ">;

        type cases = [Expect<Test<T1, "one-two-three">>, Expect<Equal<T2, "equals",  "one-two-three">>];
        const c: cases = [true, true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> returns 'string' type when passed a non-literal string", () => {
        type T1 = KebabCase<string>;

        type cases = [Expect<Test<T1, "equals",  string>>];
        const c: cases = [true];
        expect(c).toBe(c);
    });

    it("Dasherize<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
        type T1 = KebabCase<"one two three four five six seven eight nine ten">;
        type T2 = KebabCase<"one_two_three_four_five_six_seven_eight_nine_ten">;
        type T3 = KebabCase<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE_TEN">;
        type T4 = KebabCase<"one-two-three-four_five_six_seven_eight_nine_ten">;
        type T5 = KebabCase<"\n one-two-three-four_five_six_seven_eight_nine_ten \t">;

        type cases = [
            Expect<Test<T1, "equals",  "one-two-three-four-five-six-seven-eight-nine-ten">>,
            Expect<Test<T2, "equals",  "one-two-three-four-five-six-seven-eight-nine-ten">>,
            Expect<Test<T3, "equals",  "one-two-three-four-five-six-seven-eight-nine-ten">>,
            Expect<Test<T4, "equals",  "one-two-three-four-five-six-seven-eight-nine-ten">>,
            Expect<Test<T5, "equals",  "one-two-three-four-five-six-seven-eight-nine-ten">>
        ];
        const c: cases = [true, true, true, true, true];
        expect(c).toBe(c);
    });
});
