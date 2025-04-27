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
        Expect<Test<Middle, "equals",  `FooBaz Bar`>>,
        Expect<Test<MiddleAndEnd, "equals",  `FooBaz BarBaz`>>,
        Expect<Test<Everywhere, "equals",  `Baz FooBaz BarBaz`>>,
    ];
  });


  it("ReplaceNumericInterpolation<...> with single replacement value", () => {
    type TheAnswer = ReplaceNumericInterpolation<`${number} is the answer`, "42">;
    type Foey = ReplaceNumericInterpolation<`foo${number}`, "{{number}}">;
    type Multi = ReplaceNumericInterpolation<`42: ${number} x ${number} = ${number}`, "{{number}}">;

    type cases = [
      Expect<Test<TheAnswer, "equals",  `42 is the answer`>>,
      Expect<Test<Foey, "equals",  `foo{{number}}`>>,
      Expect<Test<Multi, "equals",  `42: {{number}} x {{number}} = {{number}}`>>
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
      Expect<Test<TheAnswer, "equals",  `42 is the answer`>>,
      Expect<Test<PartialMulti, "equals",  `42: 2 x 2 = ${number}`>>,
      Expect<Test<PartialMultiWithNumbers, "equals",  `42: 2 x 2 = ${number}`>>,
      Expect<Test<Multi, "equals",  `42: 2 x 2 = 4`>>,
      Expect<Test<TooMany, "equals",  `42: 2 x 2 = 4`>>,
    ];
  });


  it("ReplaceBooleanInterpolation<...> with single replacement value", () => {

    type Multi = ReplaceBooleanInterpolation<
        `Employed: ${boolean}; Married: ${boolean}`,
        `{{boolean}}`
    >

    type cases = [
      Expect<Test<Multi, "equals",  `Employed: {{boolean}}; Married: {{boolean}}`>>
    ];
  });

  it("ReplaceBooleanInterpolation<...> with array of replacement values", () => {

    type Multi = ReplaceBooleanInterpolation<
        `Employed: ${boolean}; Married: ${boolean}`,
        [true, "false"]
    >

    type cases = [
      Expect<Test<Multi, "equals",  `Employed: true; Married: false`>>
    ];
  });
});
