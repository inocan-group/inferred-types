import { describe, it } from "vitest";
import { Expect, LessThan, Test } from "inferred-types/types";



describe("LessThan<A,B>", () => {

    it("happy path", () => {
        type T1 = LessThan<0, 1>;
        type T2 = LessThan<0, 1000>;

        type F1 = LessThan<1, 0>;
        type F2 = LessThan<1000, 0>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

});
