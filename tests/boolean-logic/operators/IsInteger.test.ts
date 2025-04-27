import { Expect, IsInteger, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsInteger<T>", () => {

    it("Happy Path", () => {
        type T1 = IsInteger<1>;
        type T2 = IsInteger<"1">;
        type T3 = IsInteger<1.0>; // bummer but the `.0` is lost before we can match against

        type F1 = IsInteger<1.1>;
        type F2 = IsInteger<"1.1">;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];

    });

});
