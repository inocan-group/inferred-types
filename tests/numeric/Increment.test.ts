import { describe, expect, it } from "vitest";
import type { Expect, Increment, Test } from "inferred-types/types";

import { increment } from "inferred-types/runtime";

describe("Increment<T>", () => {

    it("happy path (numbers)", () => {
        type Ten = Increment<10>;
        type Thirty = Increment<30>;
        type Zero = Increment<0>;

        type cases = [
            Expect<Test<Ten, "equals",  11>>,
            Expect<Test<Thirty, "equals",  31>>,
            Expect<Test<Zero, "equals",  1>>
        ];
    });

    it("happy path (string literals)", () => {
        type Ten = Increment<"10">;
        type Thirty = Increment<"30">;
        type Zero = Increment<"0">;

        type cases = [
            Expect<Test<Ten, "equals",  "11">>,
            Expect<Test<Thirty, "equals",  "31">>,
            Expect<Test<Zero, "equals",  "1">>
        ];
    });

});

describe("increment(val)", () => {

    it("happy path", () => {
        const two = increment(2);
        const twoStr = increment("2");

        expect(two).toBe(3);
        expect(twoStr).toBe("3");

        type cases = [
            Expect<Test<typeof two, "equals", 3>>,
            Expect<Test<typeof twoStr, "equals", "3">>,
        ];
    });

})
