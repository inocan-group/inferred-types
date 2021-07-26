import { Equal, Expect } from "@type-challenges/utils";
import { Dasherize } from "~/types";

const target = "two-three-four";
type TARGET = typeof target;

describe("Dasherize<T> type utility", () => {

  it("Dasherize<T> provides an identity to a dasherized string", () => {
    type T1 = Dasherize<"two-three-four">;
    type T2 = Dasherize<"\n two-three-four ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> transform snake_case type", () => {
    type T1 = Dasherize<"two_three_four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> transforms PascalCase type", () => {
    type T1 = Dasherize<"TwoThreeFour">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> transforms camelCase type up to a pretty long length", () => {
    type T1 = Dasherize<"twoThreeFour">;
    type T2 = Dasherize<"twoThreeFourFive">;
    type T3 = Dasherize<"twoThreeFourFiveSix">;
    type T4 = Dasherize<"twoThreeFourFiveSixSeven">;
    type T5 = Dasherize<"twoThreeFourFiveSixSevenEight">;
    // type T6 = Dasherize<"twoThreeFourFiveSixSevenEightNine">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, "two-three-four-five">>,
      Expect<Equal<T3, "two-three-four-five-six">>,
      Expect<Equal<T4, "two-three-four-five-six-seven">>,
      Expect<Equal<T5, "two-three-four-five-six-seven-eight">>,
      // Expect<Equal<T6, "two-three-four-five-six-seven-eight-nine">>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> transforms interior space to dasherized type", () => {
    type T1 = Dasherize<"two three four">;

    type cases = [
      Expect<Equal<T1, TARGET>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> transforms ALL CAPS to dasherized type", () => {
    type T1 = Dasherize<"TWO THREE FOUR">;
    type T2 = Dasherize<"\n TWO_THREE_FOUR ">;
    type T3 = Dasherize<"\n TWO-THREE-FOUR ">;

    type cases = [
      Expect<Equal<T1, TARGET>>,
      Expect<Equal<T2, TARGET>>,
      Expect<Equal<T3, TARGET>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> removes leading and trailing whitespace and still converts", () => {
    type T1 = Dasherize<"  one two three ">;
    type T2 = Dasherize<"\n  one two three ">;

    type cases = [
      Expect<Equal<T1, "one-two-three">>,
      Expect<Equal<T2, "one-two-three">>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> returns 'string' type when passed a non-literal string", () => {
    type T1 = Dasherize<string>;

    type cases = [
      Expect<Equal<T1, string>>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

  it("Dasherize<T> can handle long strings which do not have caps (unless they're ALL CAPS)", () => {
    type T1 = Dasherize<"one two three four five six seven eight nine ten">;
    type T2 = Dasherize<"one_two_three_four_five_six_seven_eight_nine_ten">;
    type T3 = Dasherize<"ONE_TWO_THREE_FOUR_FIVE_SIX_SEVEN_EIGHT_NINE_TEN">;
    type T4 = Dasherize<"one-two-three-four_five_six_seven_eight_nine_ten">;
    type T5 = Dasherize<"\n one-two-three-four_five_six_seven_eight_nine_ten \t">;

    type cases = [
      Expect<Equal<T1, "one-two-three-four-five-six-seven-eight-nine-ten">>,
      Expect<Equal<T2, "one-two-three-four-five-six-seven-eight-nine-ten">>,
      Expect<Equal<T3, "one-two-three-four-five-six-seven-eight-nine-ten">>,
      Expect<Equal<T4, "one-two-three-four-five-six-seven-eight-nine-ten">>,
      Expect<Equal<T5, "one-two-three-four-five-six-seven-eight-nine-ten">>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

});