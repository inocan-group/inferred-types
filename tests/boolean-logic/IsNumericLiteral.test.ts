import { Expect, IsNumericLiteral, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsNumericLiteral<T>", () => {

    it("happy path", () => {
        type T1 = IsNumericLiteral<1>;
        type T2 = IsNumericLiteral<1 | 2>;
        type F1 = IsNumericLiteral<number>;
        type F2 = IsNumericLiteral<"foo">;

        type Never = IsNumericLiteral<never>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<Never, "equals",  never>>,
        ];
    });

});
