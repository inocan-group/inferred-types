import { describe, it } from "vitest";
import type { Expect, IsLiteralNumber, Test } from "inferred-types/types";

describe("IsLiteralNumber<T>", () => {

    it("happy path", () => {

        type T1 = IsLiteralNumber<42>;
        type T2 = IsLiteralNumber<42 | 99, "allow-union">;

        type F1 = IsLiteralNumber<"foo">;
        type F2 = IsLiteralNumber<number>;
        type F3 = IsLiteralNumber<42 | 99>;
        type F4 = IsLiteralNumber<string>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,

        ];
    });

});
