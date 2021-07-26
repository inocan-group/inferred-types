import { Equal, Expect } from "@type-challenges/utils";
import { CamelCase } from "~/types";

const target = "twoThreeFour";
type TARGET = typeof target;

describe("CamelCase<T> type utility", () => {

  it("CamelCase<T> provides an identity to a CamelCased string", () => {
    type T1 = CamelCase<"TwoThreeFour">;
    type T2 = CamelCase<"\n TwoThreeFour ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> transform snake_case type", () => {
    type T1 = CamelCase<"two_three_four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> transforms camelCase type", () => {
    type T1 = CamelCase<"twoThreeFour">;
    type T2 = CamelCase<"  twoThreeFour \t">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> transforms camelCase type up to any length", () => {
    type T1 = CamelCase<"twoThreeFour">;
    type T2 = CamelCase<"twoThreeFourFive">;
    type T3 = CamelCase<"twoThreeFourFiveSix">;
    type T4 = CamelCase<"twoThreeFourFiveSixSeven">;
    type T5 = CamelCase<"twoThreeFourFiveSixSevenEight">;
    type T6 = CamelCase<"twoThreeFourFiveSixSevenEightNineTenEleven">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, "twoThreeFourFive">>,
      Expect<Equal<T3, "twoThreeFourFiveSix">>,
      Expect<Equal<T4, "twoThreeFourFiveSixSeven">>,
      Expect<Equal<T5, "twoThreeFourFiveSixSevenEight">>,
      Expect<Equal<T6, "twoThreeFourFiveSixSevenEightNineTenEleven">>,
    ];
    const c: cases = [true, true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> transforms interior space to CamelCased type", () => {
    type T1 = CamelCase<"two three four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> transforms ALL CAPS to CamelCased type", () => {
    type T1 = CamelCase<"TWO THREE FOUR">;
    type T2 = CamelCase<"\n TWO_THREE_FOUR ">;
    type T3 = CamelCase<"\n TWO-THREE-FOUR ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
      Expect<Equal<T3, TARGET>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> removes leading and trailing whitespace and still converts", () => {
    type T1 = CamelCase<"  one two three ">;
    type T2 = CamelCase<"\n  one two three ">;

    type cases = [
      Expect<Equal<T1, "oneTwoThree">>,
      Expect<Equal<T2, "oneTwoThree">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> returns 'string' type when passed a non-literal string", () => {
    type T1 = CamelCase<string>;

    type cases = [
      Expect<Equal<T1, string>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("CamelCase<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
    type T1 = CamelCase<"one two three four five six seven eight nine">;
    type T2 = CamelCase<"one_two_three_four_five_six_seven_eight_nine">;
    type T3 = CamelCase<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE">;
    // also works for multiple delimiters
    type T4 = CamelCase<"one-two-three-four_five_six_seven_eight_nine">;
    type T5 = CamelCase<"\n one-two-three-four_five_six_seven eight_nine \t">;

    type cases = [
      Expect<Equal<T1, "oneTwoThreeFourFiveSixSevenEightNine">>,
      Expect<Equal<T2, "oneTwoThreeFourFiveSixSevenEightNine">>,
      Expect<Equal<T3, "oneTwoThreeFourFiveSixSevenEightNine">>,
      Expect<Equal<T4, "oneTwoThreeFourFiveSixSevenEightNine">>,
      Expect<Equal<T5, "oneTwoThreeFourFiveSixSevenEightNine">>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

});