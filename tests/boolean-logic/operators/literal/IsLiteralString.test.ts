import { describe, it } from "vitest";
import {
    Expect,
    IsLiteralString,
    Test,
} from "inferred-types/types";

describe("IsLiteralString<T>", () => {

    it("happy path", () => {

        type T1 = IsLiteralString<"foo">;
        type T2 = IsLiteralString<"foo" | "bar", "allow-union">;

        type F1 = IsLiteralString<42>;
        type F2 = IsLiteralString<string>;
        type F3 = IsLiteralString<"foo" | "bar">;
        type F4 = IsLiteralString<string>;

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
