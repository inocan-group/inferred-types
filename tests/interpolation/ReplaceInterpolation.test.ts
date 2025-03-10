import { Equal, Expect } from "@type-challenges/utils";
import {
    ReplaceBooleanInterpolation,
    ReplaceNumericInterpolation,
    ReplaceStringInterpolation
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("ReplaceInterpolation Utilities", () => {

  it("ReplaceStringInterpolation", () => {
    type Middle = ReplaceStringInterpolation<`Foo${string} Bar`,`Baz`>;
    type MiddleAndEnd = ReplaceStringInterpolation<`Foo${string} Bar${string}`,"Baz">;
    type Everywhere = ReplaceStringInterpolation<`${string} Foo${string} Bar${string}`,"Baz">;

    type cases = [
        Expect<Equal<Middle, `FooBaz Bar`>>,
        Expect<Equal<MiddleAndEnd, `FooBaz BarBaz`>>,
        Expect<Equal<Everywhere, `Baz FooBaz BarBaz`>>,
    ];
  });


  it("ReplaceNumericInterpolation<...> with single replacement value", () => {
    type TheAnswer = ReplaceNumericInterpolation<`${number} is the answer`, "42">;
    type Foey = ReplaceNumericInterpolation<`foo${number}`, "{{number}}">;
    type Multi = ReplaceNumericInterpolation<`42: ${number} x ${number} = ${number}`, "{{number}}">;

    type cases = [
      Expect<Equal<TheAnswer, `42 is the answer`>>,
      Expect<Equal<Foey, `foo{{number}}`>>,
      Expect<Equal<Multi, `42: {{number}} x {{number}} = {{number}}`>>
    ];
  });

  it("ReplaceNumericInterpolation<...> with an array of values", () => {
    type TheAnswer = ReplaceNumericInterpolation<`${number} is the answer`, ["42"]>;
    type Foey = ReplaceNumericInterpolation<`foo${number},${number}`, ["9","000"]>;
    type PartialMulti = ReplaceNumericInterpolation<
        `42: ${number} x ${number} = ${number}`,
        ["2","2"]
    >;
    type Multi = ReplaceNumericInterpolation<
        `42: ${number} x ${number} = ${number}`,
        ["2","2", "4"]
    >;

    type TooMany = ReplaceNumericInterpolation<
        `42: ${number} x ${number} = ${number}`,
        ["2","2","4", "100"]
    >;

    type PartialMultiWithNumbers = ReplaceNumericInterpolation<
        `42: ${number} x ${number} = ${number}`,
        [2,2]
    >;

    type cases = [
      Expect<Equal<TheAnswer, `42 is the answer`>>,
      Expect<Equal<PartialMulti, `42: 2 x 2 = ${number}`>>,
      Expect<Equal<PartialMultiWithNumbers, `42: 2 x 2 = ${number}`>>,
      Expect<Equal<Multi, `42: 2 x 2 = 4`>>,
      Expect<Equal<TooMany, `42: 2 x 2 = 4`>>,
    ];
  });


  it("ReplaceBooleanInterpolation<...> with single replacement value", () => {

    type Multi = ReplaceBooleanInterpolation<
        `Employed: ${boolean}; Married: ${boolean}`,
        `{{boolean}}`
    >

    type cases = [
      Expect<Equal<Multi, `Employed: {{boolean}}; Married: {{boolean}}`>>
    ];
  });

  it("ReplaceBooleanInterpolation<...> with array of replacement values", () => {

    type Multi = ReplaceBooleanInterpolation<
        `Employed: ${boolean}; Married: ${boolean}`,
        [true, "false"]
    >

    type cases = [
      Expect<Equal<Multi, `Employed: true; Married: false`>>
    ];
  });
});
