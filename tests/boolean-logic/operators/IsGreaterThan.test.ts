import { describe, it } from "vitest";
import { Expect, IsGreaterThan, Test } from "inferred-types/types";



describe("IsGreaterThan<A,B>", () => {

    it("happy path", () => {
        type T1 = IsGreaterThan<1, 0>;
        type T2 = IsGreaterThan<1000, 0>;
        type T3 = IsGreaterThan<42, 30>;

        type F1 = IsGreaterThan<0, 1>;
        type F2 = IsGreaterThan<0, 1000>;

        type O1 = IsGreaterThan<number, 42>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,

            Expect<Test<O1, "equals", boolean>>,
        ];
    });

});
