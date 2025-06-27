import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { Expect, IsFloat, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsFloat<T>", () => {

    it("Happy Path", () => {
        type T1 = IsFloat<1.1>;
        type T2 = IsFloat<"1.1">;
        type T3 = IsFloat<"1.0">;

        type F1 = IsFloat<1>;
        type F2 = IsFloat<"1">;
        type F3 = IsFloat<1.0>;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,

        ];
    });

});
