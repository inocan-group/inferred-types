import { describe, it } from "vitest";
import { Expect, Increment, Test } from "inferred-types/types";



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
