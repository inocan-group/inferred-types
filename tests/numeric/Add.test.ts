
import { describe, it } from "vitest";
import type { Add, Expect, Test } from "inferred-types/types";

describe("Add<A,B>", () => {

    it("happy path", () => {
        type Three = Add<1, 2>;
        type OneHundred = Add<40, 60>;

        type cases = [
            Expect<Test<Three, "equals",  3>>,
            Expect<Test<OneHundred, "equals",  100>>
        ];
    });

    it("adding where one operand is a string literal", () => {
        type Three = Add<"1", 2>;
        type OneHundred = Add<40, "60">;

        type cases = [
            Expect<Test<Three, "equals",  "3">>,
            Expect<Test<OneHundred, "equals",  100>>
        ];
    });

    it("adding where both operands are a string literals", () => {
        type Three = Add<"1", "2">;
        type OneHundred = Add<"40", "60">;

        type cases = [
            Expect<Test<Three, "equals",  "3">>,
            Expect<Test<OneHundred, "equals",  "100">>
        ];
    });

    it("First operand is negative", () => {
        type Three = Add<-2, 5>;
        type ThreeStr = Add<"-2", "5">;

        // Mixed sign operations return wide types to avoid complexity
        type cases = [
            Expect<Test<Three, "equals",  number>>,
            Expect<Test<ThreeStr, "equals",  `${number}`>>
        ];
    });

    it("Second operand is negative", () => {
        type Three = Add<5, -2>;
        type ThreeStr = Add<"5", -2>;

        // Mixed sign operations return wide types to avoid complexity
        type cases = [
            Expect<Test<Three, "equals",  number>>,
            Expect<Test<ThreeStr, "equals",  `${number}`>>
        ];
    });

    it("adding two negative operands", () => {
        type NegThree = Add<-1, -2>;
        type NegOneHundred = Add<"-40", "-60">;

        type cases = [
            Expect<Test<NegThree, "equals",  -3>>,
            Expect<Test<NegOneHundred, "equals",  "-100">>
        ];
    });

});
