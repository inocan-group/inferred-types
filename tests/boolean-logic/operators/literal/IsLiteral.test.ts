import { describe, it } from "vitest";
import {
    Expect,
    IsLiteral,
    Test,
} from "inferred-types/types";

describe("IsLiteral<T>", () => {
    it("should return true for literal values", () => {
        type StringLiteral = "hello";
        type NumberLiteral = 42;
        type BooleanLiteral = true;

        type T1 = IsLiteral<StringLiteral>;
        type T2 = IsLiteral<NumberLiteral>;
        type T3 = IsLiteral<BooleanLiteral>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("should return false for wide types", () => {
        type T1 = IsLiteral<string>;
        type T2 = IsLiteral<number>;
        type T3 = IsLiteral<boolean>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });
});
