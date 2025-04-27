import { describe, it } from "vitest";
import { Expect, IsNegativeNumber, NumberLike, Test } from "inferred-types/types";



describe("IsNegativeNumber<T>", () => {

    it("Happy Path", () => {
        type T1 = IsNegativeNumber<-1>;
        type T2 = IsNegativeNumber<"-1">;

        type F1 = IsNegativeNumber<1>;
        type F2 = IsNegativeNumber<"1">;

        type M1 = IsNegativeNumber<number>;
        type M2 = IsNegativeNumber<NumberLike>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

            // if the input to the utility is wide we can only know
            // if it's negative at runtime.
            Expect<Test<M1, "equals",  boolean>>,
            Expect<Test<M2, "equals",  boolean>>,
        ];

    });

});
