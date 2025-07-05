import { Expect, Add, Test } from "inferred-types/types";
import { describe, it } from "vitest";

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

        type cases = [
            Expect<Test<Three, "equals",  3>>,
            Expect<Test<ThreeStr, "equals",  "3">>
        ];
    });

    it("Second operand is negative", () => {
        type Three = Add<5, -2>;
        type ThreeStr = Add<"5", -2>;

        type cases = [
            Expect<Test<Three, "equals",  3>>,
            Expect<Test<ThreeStr, "equals",  "3">>
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
