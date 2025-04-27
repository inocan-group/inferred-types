import { Expect, IsLiteral, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsLiteral<T>", () => {

    it("Happy Path", () => {
        type T1 = IsLiteral<"foo">;
        type T2 = IsLiteral<42>;
        type T3 = IsLiteral<true>;
        type T4 = IsLiteral<{ foo: 1; bar: 2 }>;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];

    });

});
