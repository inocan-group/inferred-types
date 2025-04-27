import { IsObjectLiteral, Dictionary, Test, Expect } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsObjectLiteral<T>", () => {

    it("happy path", () => {
        type T1 = IsObjectLiteral<{ foo: 1 }>;
        type T2 = IsObjectLiteral<Readonly<{ foo: 1 }>>;

        type F1 = IsObjectLiteral<object>;
        type F2 = IsObjectLiteral<Dictionary>;
        type F3 = IsObjectLiteral<Record<string, string>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,

        ];

    });

});
