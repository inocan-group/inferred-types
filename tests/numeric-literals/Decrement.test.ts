import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Decrement, Test } from "inferred-types/types";



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
