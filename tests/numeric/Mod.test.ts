import { describe, it } from "vitest";
import type { Expect, Mod, Test } from "inferred-types/types";

describe("Mod type utility", () => {
    it("should handle basic modulus operations", () => {
        type cases = [
            // Integer modulus tests
            Expect<Test<Mod<10, 3>, "equals", 1>>,
            Expect<Test<Mod<20, 6>, "equals", 2>>,
            Expect<Test<Mod<15, 4>, "equals", 3>>,
            Expect<Test<Mod<25, 7>, "equals", 4>>,
            Expect<Test<Mod<12, 5>, "equals", 2>>,
            Expect<Test<Mod<17, 8>, "equals", 1>>,
            Expect<Test<Mod<30, 9>, "equals", 3>>,

            // Edge cases
            Expect<Test<Mod<0, 1>, "equals", 0>>,
            Expect<Test<Mod<1, 1>, "equals", 0>>,
            Expect<Test<Mod<7, 1>, "equals", 0>>,
            Expect<Test<Mod<0, 5>, "equals", 0>>,
            Expect<Test<Mod<5, 5>, "equals", 0>>,
            Expect<Test<Mod<10, 10>, "equals", 0>>,

            // Cases where dividend is less than divisor
            Expect<Test<Mod<3, 5>, "equals", 3>>,
            Expect<Test<Mod<2, 7>, "equals", 2>>,
            Expect<Test<Mod<1, 10>, "equals", 1>>,

            // Larger numbers
            Expect<Test<Mod<144, 13>, "equals", 1>>,
            Expect<Test<Mod<200, 17>, "equals", 13>>,
        ];
    });

    it("should error on non-integer inputs", () => {
        type cases = [
            Expect<Test<Mod<10.5, 2>, "isError", "mod/non-integer">>,
            Expect<Test<Mod<10, 2.5>, "isError", "mod/non-integer">>,
            Expect<Test<Mod<3.14, 2>, "isError", "mod/non-integer">>,
            Expect<Test<Mod<5, 1.5>, "isError", "mod/non-integer">>,
            Expect<Test<Mod<2.5, 1.5>, "isError", "mod/non-integer">>,
        ];
    });

    it("should error on modulus by zero", () => {
        type cases = [
            Expect<Test<Mod<1, 0>, "isError", "mod/division-by-zero">>,
            Expect<Test<Mod<10, 0>, "isError", "mod/division-by-zero">>,
            Expect<Test<Mod<0, 0>, "isError", "mod/division-by-zero">>,
        ];
    });

    it("should handle generic number type", () => {
        type cases = [
            Expect<Test<Mod<number, 2>, "equals", number>>,
            Expect<Test<Mod<5, number>, "equals", number>>,
            Expect<Test<Mod<number, number>, "equals", number>>,
        ];
    });

    it("should handle negative numbers", () => {
        type NegDividend = Mod<-10, 3>;
        type NegDivisor = Mod<10, -3>;
        type NegBoth = Mod<-10, -3>;

        type cases = [
            Expect<Test<Mod<-10, 3>, "equals", 1>>,
            Expect<Test<Mod<10, -3>, "equals", 1>>,
            Expect<Test<Mod<-10, -3>, "equals", 1>>,
        ];
    });

    it("should handle perfect divisions", () => {
        type cases = [
            Expect<Test<Mod<10, 2>, "equals", 0>>,
            Expect<Test<Mod<15, 3>, "equals", 0>>,
            Expect<Test<Mod<20, 4>, "equals", 0>>,
            Expect<Test<Mod<21, 7>, "equals", 0>>,
            Expect<Test<Mod<100, 10>, "equals", 0>>,
        ];
    });
});
