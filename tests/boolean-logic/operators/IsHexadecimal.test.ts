import { Expect, IsCssHexadecimal, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Hexadecimal<T>", () => {

    it("happy path", () => {
        type T1 = IsCssHexadecimal<"#ABABAB">;
        type T2 = IsCssHexadecimal<"#ccc">;

        type F1 = IsCssHexadecimal<"GG">;
        type F2 = IsCssHexadecimal<"ABABAB">;

        type B1 = IsCssHexadecimal<string>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

            Expect<Test<B1, "equals",  boolean>>
        ];

    });

});
