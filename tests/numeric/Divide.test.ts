import { describe, it } from "vitest";
import type { Divide, Expect, Test } from "inferred-types/types";

describe("Divide type utility", () => {
  it("should handle basic division operations", () => {
    type cases = [
      // Integer division tests
      Expect<Test<Divide<10, 2>, "equals", 5>>,
      Expect<Test<Divide<20, 4>, "equals", 5>>,
      Expect<Test<Divide<100, 10>, "equals", 10>>,
      Expect<Test<Divide<15, 3>, "equals", 5>>,
      Expect<Test<Divide<12, 4>, "equals", 3>>,
      Expect<Test<Divide<8, 2>, "equals", 4>>,
      Expect<Test<Divide<21, 7>, "equals", 3>>,
      // Edge cases
      Expect<Test<Divide<0, 1>, "equals", 0>>,
      Expect<Test<Divide<1, 1>, "equals", 1>>,
      Expect<Test<Divide<7, 1>, "equals", 7>>,
      Expect<Test<Divide<0, 5>, "equals", 0>>,
      // Larger numbers
      Expect<Test<Divide<144, 12>, "equals", 12>>,
      Expect<Test<Divide<200, 25>, "equals", 8>>,
    ];
  });

  it("should error on non-integer inputs", () => {
    type cases = [
      Expect<Test<Divide<10.5, 2>, "isError", "divide/non-integer">>,
      Expect<Test<Divide<10, 2.5>, "isError", "divide/non-integer">>,
      Expect<Test<Divide<3.14, 2>, "isError", "divide/non-integer">>,
      Expect<Test<Divide<5, 1.5>, "isError", "divide/non-integer">>,
      Expect<Test<Divide<2.5, 1.5>, "isError", "divide/non-integer">>,
    ];
  });

  it("should error on division by zero", () => {
    type cases = [
      Expect<Test<Divide<1, 0>, "isError", "divide/division-by-zero">>,
      Expect<Test<Divide<10, 0>, "isError", "divide/division-by-zero">>,
      Expect<Test<Divide<0, 0>, "isError", "divide/division-by-zero">>,
    ];
  });

  it("should handle generic number type", () => {
    type cases = [
      Expect<Test<Divide<number, 2>, "equals", number>>,
      Expect<Test<Divide<5, number>, "equals", number>>,
      Expect<Test<Divide<number, number>, "equals", number>>,
    ];
  });

  it("should handle negative numbers", () => {
    type NegDividend = Divide<-10, 3>;
    type NegDivisor = Divide<10, -3>;
    type NegBoth = Divide<-10, -3>;

    type cases = [
      Expect<Test<NegDividend, "equals", -3>>,
      Expect<Test<NegDivisor, "equals", -3>>,
      Expect<Test<NegBoth, "equals", 3>>,
    ];
  });

  it("should handle division that doesn't result in whole numbers", () => {
    type cases = [
      Expect<Test<Divide<10, 3>, "equals", 3>>,
      Expect<Test<Divide<7, 2>, "equals", 3>>,
      Expect<Test<Divide<5, 2>, "equals", 2>>,
    ];
  });
});
