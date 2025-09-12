import { describe, it } from "vitest";
import type { Delta, Expect, Test } from "inferred-types/types";

describe("Delta<A,B>", () => {

    it("with numbers", () => {
        type T1a = Delta<1, 2>;
        type T1b = Delta<2, 1>;
        type T5a = Delta<10, 5>;
        type T5b = Delta<5, 10>;

        type cases = [
            Expect<Test<T1a, "equals",  1>>,
            Expect<Test<T1b, "equals",  1>>,
            Expect<Test<T5a, "equals",  5>>,
            Expect<Test<T5b, "equals",  5>>,
        ];

    });

    it("with string numerics", () => {
        type T1a = Delta<"1", "2">;
        type T1b = Delta<"2", "1">;
        type T5a = Delta<"10", "5">;
        type T5b = Delta<"5", "10">;

        type cases = [
            Expect<Test<T1a, "equals",  "1">>,
            Expect<Test<T1b, "equals",  "1">>,
            Expect<Test<T5a, "equals",  "5">>,
            Expect<Test<T5b, "equals",  "5">>,

        ];
    });

    it("the first generic determines if result is numeric or string literal", () => {
        type Num = Delta<10, "5">;
        type Str = Delta<"10", 5>;

        type cases = [
            Expect<Test<Num, "equals", 5>>,
            Expect<Test<Str, "equals", "5">>,
        ];
    });

    it("positive and negative", () => {
        type Six = Delta<1, -5>;
        type SixStr = Delta<"1", -5>;
        type SixAlt = Delta<-5, 1>;

        type cases = [
            Expect<Test<Six, "equals",  6>>,
            Expect<Test<SixStr, "equals", "6">>,
            Expect<Test<SixAlt, "equals",  6>>,
        ];

    });

});
