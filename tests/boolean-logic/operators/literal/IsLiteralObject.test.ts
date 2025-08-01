import { describe, it } from "vitest";
import {
    Expect,
    IsLiteralObject,
    Test,
} from "inferred-types/types";
import { EmptyObject } from "inferred-types";

describe("IsLiteralObject<T>", () => {
    it("should return true for literal objects", () => {
        type T1 = IsLiteralObject<{ foo: "bar"; baz: 42 }>;
        type T2 = IsLiteralObject<{ foo: "bar"; baz: 42 }>;

        type F1 = IsLiteralObject<EmptyObject>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("wide values with literal keys is true when 'accept-wide-values' set", () => {
        type WideValues = { foo: string; bar: number };
        type T1 = IsLiteralObject<WideValues, "allow-wide-values">;
        type F1 = IsLiteralObject<WideValues>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });
});
