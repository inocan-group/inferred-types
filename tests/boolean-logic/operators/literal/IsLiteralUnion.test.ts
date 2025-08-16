import { describe, it } from "vitest";
import { Expect, IsLiteralUnion, Test } from "inferred-types/types";

describe("IsLiteralUnion<T>", () => {
    it("should return true for literal unions", () => {
        type cases = [
            Expect<Test<IsLiteralUnion<"a" | "b">, "equals", true>>,
            Expect<Test<IsLiteralUnion<1 | 2 | 3>, "equals", true>>,
            Expect<Test<IsLiteralUnion<true | "hello">, "equals", true>>,
        ];
    });

    it("should return false for non-union literals", () => {
        type cases = [
            Expect<Test<IsLiteralUnion<"a">, "equals", false>>,
            Expect<Test<IsLiteralUnion<123>, "equals", false>>,
            Expect<Test<IsLiteralUnion<string>, "equals", false>>,
        ];
    });
});
