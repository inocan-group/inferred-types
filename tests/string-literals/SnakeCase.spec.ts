import { Equal, Expect } from "@type-challenges/utils";
import { SnakeCase } from "~/types";

const target = "two_three_four";
type TARGET = typeof target;

describe("SnakeCase<T> type utility", () => {

  it("SnakeCase<T> provides an identity to a SnakeCased string", () => {
    type T1 = SnakeCase<"TwoThreeFour">;
    type T2 = SnakeCase<"\n TwoThreeFour ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> transform snake_case type", () => {
    type T1 = SnakeCase<"two_three_four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> transforms camelCase type", () => {
    type T1 = SnakeCase<"twoThreeFour">;
    type T2 = SnakeCase<"  twoThreeFour \t">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
    ];
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
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, "two_three_four_five">>,
      Expect<Equal<T3, "two_three_four_five_six">>,
      Expect<Equal<T4, "two_three_four_five_six_seven">>,
      Expect<Equal<T5, "two_three_four_five_six_seven_eight">>,
      // Expect<Equal<T6, "TwoThreeFourFiveSixSevenEightNineTenEleven">>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> transforms interior space to SnakeCased type", () => {
    type T1 = SnakeCase<"two three four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> transforms ALL CAPS to SnakeCased type", () => {
    type T1 = SnakeCase<"TWO THREE FOUR">;
    type T2 = SnakeCase<"\n TWO_THREE_FOUR ">;
    type T3 = SnakeCase<"\n TWO-THREE-FOUR ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
      Expect<Equal<T3, TARGET>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> removes leading and trailing whitespace and still converts", () => {
    type T1 = SnakeCase<"  one two three ">;
    type T2 = SnakeCase<"\n  one two three ">;

    type cases = [
      Expect<Equal<T1, "one_two_three">>,
      Expect<Equal<T2, "one_two_three">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("SnakeCase<T> returns 'string' type when passed a non-literal string", () => {
    type T1 = SnakeCase<string>;

    type cases = [
      Expect<Equal<T1, string>>,
    ];
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
      Expect<Equal<T1, "one_two_three_four_five_six_seven_eight_nine">>,
      Expect<Equal<T2, "one_two_three_four_five_six_seven_eight_nine">>,
      Expect<Equal<T3, "one_two_three_four_five_six_seven_eight_nine">>,
      Expect<Equal<T4, "one_two_three_four_five_six_seven_eight_nine">>,
      Expect<Equal<T5, "one_two_three_four_five_six_seven_eight_nine">>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

});