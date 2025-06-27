import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsLessThan, Test } from "inferred-types/types";



describe("IsLessThan<A,B>", () => {

    it("happy path", () => {
        type T1 = IsLessThan<0, 1>;
        type T2 = IsLessThan<0, 1000>;

        type F1 = IsLessThan<1, 0>;
        type F2 = IsLessThan<1000, 0>;
        type F3 = IsLessThan<1, 1>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];
        const cases: cases = [
            true, true,
            true, true, true
        ];
    });

});
