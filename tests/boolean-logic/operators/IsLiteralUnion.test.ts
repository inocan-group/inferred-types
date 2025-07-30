import { describe, it } from "vitest";
import { Expect, IsLiteralUnion, Test } from "inferred-types/types";

describe("IsLiteralUnion<T>", () => {
  it("should return true for literal unions", () => {
    // String literal unions
    type StringLiterals = "red" | "green" | "blue";
    type T1 = IsLiteralUnion<StringLiterals>;

    // Numeric literal unions
    type NumericLiterals = 1 | 2 | 3 | 42;
    type T2 = IsLiteralUnion<NumericLiterals>;

    // Boolean literal unions
    type BooleanLiterals = true | false;
    type T3 = IsLiteralUnion<BooleanLiterals>;

    // Mixed literal unions
    type MixedLiterals = "hello" | 42 | true | null;
    type T4 = IsLiteralUnion<MixedLiterals>;

    // Symbol literal unions
    type SymbolLiterals = typeof Symbol.iterator | typeof Symbol.hasInstance;
    type T5 = IsLiteralUnion<SymbolLiterals>;

    type cases = [
      Expect<Test<T1, "equals", true>>,
      Expect<Test<T2, "equals", true>>,
      Expect<Test<T3, "equals", true>>,
      Expect<Test<T4, "equals", true>>,
      Expect<Test<T5, "equals", true>>
    ];
  });

  it("should return false for non-union types", () => {
    // Single literal (not a union)
    type SingleLiteral = "hello";
    type T1 = IsLiteralUnion<SingleLiteral>;

    // Single primitive
    type SinglePrimitive = string;
    type T2 = IsLiteralUnion<SinglePrimitive>;

    // Single number
    type SingleNumber = number;
    type T3 = IsLiteralUnion<SingleNumber>;

    // Single boolean
    type SingleBoolean = boolean;
    type T4 = IsLiteralUnion<SingleBoolean>;

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
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>,
      Expect<Test<T6, "equals", false>>
    ];
  });

  it("should return false for unions with non-literal members", () => {
    // Union with string type (non-literal)
    type StringUnion = "red" | string;
    type T1 = IsLiteralUnion<StringUnion>;

    // Union with number type (non-literal)
    type NumberUnion = 1 | number;
    type T2 = IsLiteralUnion<NumberUnion>;

    // Union with boolean type (non-literal)
    type BooleanUnion = true | boolean;
    type T3 = IsLiteralUnion<BooleanUnion>;

    // Union with object type
    type ObjectUnion = "literal" | { foo: string };
    type T4 = IsLiteralUnion<ObjectUnion>;

    // Union with array type
    type ArrayUnion = "literal" | string[];
    type T5 = IsLiteralUnion<ArrayUnion>;

    type cases = [
      Expect<Test<T1, "equals", false>>,
      Expect<Test<T2, "equals", false>>,
      Expect<Test<T3, "equals", false>>,
      Expect<Test<T4, "equals", false>>,
      Expect<Test<T5, "equals", false>>
    ];
  });

  it("should handle edge cases correctly", () => {
    // Empty union (never)
    type EmptyUnion = never;
    type T1 = IsLiteralUnion<EmptyUnion>;

    // Union with undefined
    type UndefinedUnion = "hello" | undefined;
    type T2 = IsLiteralUnion<UndefinedUnion>;

    // Union with null
    type NullUnion = "hello" | null;
    type T3 = IsLiteralUnion<NullUnion>;

    // Union with both null and undefined
    type NullableUnion = "hello" | null | undefined;
    type T4 = IsLiteralUnion<NullableUnion>;

    // Union with literal objects
    type LiteralObjectUnion = { type: "A" } | { type: "B" };
    type T5 = IsLiteralUnion<LiteralObjectUnion>;

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
    type TemplateLiterals = `prefix_${"a" | "b" | "c"}`;
    type T1 = IsLiteralUnion<TemplateLiterals>;

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
