import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Decrement, Test } from "inferred-types/types";
import { decrement } from "inferred-types/runtime";



describe("Decrement<T>", () => {

    it("happy path (numbers)", () => {
        type Ten = Decrement<10>;
        type Thirty = Decrement<30>;
        type Zero = Decrement<0>;

        type cases = [
            Expect<Test<Ten, "equals",  9>>,
            Expect<Test<Thirty, "equals",  29>>,
            Expect<Test<Zero, "equals",  0>>
        ];
    });

    it("happy path (string literals)", () => {
        type Ten = Decrement<"10">;
        type Thirty = Decrement<"30">;
        type Zero = Decrement<"0">;

        type cases = [
            Expect<Test<Ten, "equals",  "9">>,
            Expect<Test<Thirty, "equals",  "29">>,
            Expect<Test<Zero, "equals",  "0">>
        ];
    });

});

describe("decrement(val)", () => {


    it("happy path", () => {
        const two = decrement(2);
        const twoStr = decrement("2");

        expect(two).toBe(1);
        expect(twoStr).toBe("1");

        type cases = [
            Expect<Test<typeof two, "equals", 1>>,
            Expect<Test<typeof twoStr, "equals", "1">>,
        ];
    });


})
