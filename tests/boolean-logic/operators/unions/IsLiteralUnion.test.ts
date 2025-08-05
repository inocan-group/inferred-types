import { describe, it } from "vitest";
import { Expect, IsLiteralUnion, Test } from "inferred-types/types";

describe("IsLiteralUnion<T>", () => {
    it("should return true for literal unions", () => {
        type T1 = IsLiteralUnion<"red" | "green" | "blue">;
        type T2 = IsLiteralUnion<1 | 2 | 3 | 42>;
        type T3 = IsLiteralUnion<true | 4>;
        type T4 = IsLiteralUnion<false | "foo">;

        type T5 = IsLiteralUnion<"hello" | 42 | true | null>;

        // Symbol literal unions
        type T6 = IsLiteralUnion<typeof Symbol.iterator | typeof Symbol.hasInstance>;

        // boolean is immediately expanded to `true` | `false` which is a literal union
        type T7 = IsLiteralUnion<boolean>;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>,
            Expect<Test<T7, "equals", true>>,
        ];
    });

    it("should return false for non-union types", () => {
        type T1 = IsLiteralUnion<"hello">;
        type T2 = IsLiteralUnion<string>;
        type T3 = IsLiteralUnion<number>;


        // Object type
        type ObjectType = { foo: string };
        type T5 = IsLiteralUnion<ObjectType>;

        // Array type
        type ArrayType = string[];
        type T6 = IsLiteralUnion<ArrayType>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,

            Expect<Test<T5, "equals", false>>,
            Expect<Test<T6, "equals", false>>
        ];
    });

    it("should return false for unions with non-literal members", () => {
        type T1 = IsLiteralUnion<string | number>;
        type T2 = IsLiteralUnion<number | boolean>;
        type T3 = IsLiteralUnion<string | boolean>;
        type T5 = IsLiteralUnion<"literal" | string[]>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
            Expect<Test<T5, "equals", false>>
        ];
    });

    it("should handle edge cases correctly", () => {
        // Empty union (never)
        type T1 = IsLiteralUnion<never>;

        // Union with undefined
        type UndefinedUnion = "hello" | undefined;
        type T2 = IsLiteralUnion<UndefinedUnion>;

        // Union with null
        type NullUnion = "hello" | null;
        type T3 = IsLiteralUnion<NullUnion>;

        // Union with both null and undefined
        type T4 = IsLiteralUnion<"hello" | null | undefined>;

        // Union with literal objects
        type T5 = IsLiteralUnion<{ type: "A" } | { type: "B" }>;

        // Union with literal tuples
        type LiteralTupleUnion = [1, 2] | [3, 4];
        type T6 = IsLiteralUnion<LiteralTupleUnion>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<T6, "equals", true>>
        ];
    });

    it("should handle complex literal unions", () => {
        // Template literal unions
        type T1 = IsLiteralUnion<`prefix_${"a" | "b" | "c"}`>;

        // Discriminated union with literal types
        type DiscriminatedUnion =
            | { type: "success"; data: string }
            | { type: "error"; message: string }
            | { type: "loading" };
        type T2 = IsLiteralUnion<DiscriminatedUnion>;

        // Union of literal arrays
        type LiteralArrayUnion = ["a"] | ["b"] | ["c"];
        type T3 = IsLiteralUnion<LiteralArrayUnion>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>
        ];
    });
});
