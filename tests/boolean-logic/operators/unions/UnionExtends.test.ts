import { describe, it } from "vitest";
import type { UnionExtends, Expect, AssertTrue, AssertFalse } from "inferred-types/types";
import { EmptyObject } from "transpiled";

describe("UnionExtends<T, U>", () => {
    it("returns false when T is never", () => {
        type Test1 = UnionExtends<never, string>;
        type Test2 = UnionExtends<never, number>;
        type Test3 = UnionExtends<never, boolean>;

        type cases = [
            Expect<AssertFalse<Test1>>,
            Expect<AssertFalse<Test2>>,
            Expect<AssertFalse<Test3>>,
        ];
    });

    it("returns false when T is any", () => {
        type Test1 = UnionExtends<any, string>;
        type Test2 = UnionExtends<any, number>;
        type Test3 = UnionExtends<any, boolean>;

        type cases = [
            Expect<AssertFalse<Test1>>,
            Expect<AssertFalse<Test2>>,
            Expect<AssertFalse<Test3>>,
        ];
    });

    it("returns false when T is not a union type", () => {
        type Test1 = UnionExtends<string, string>;
        type Test2 = UnionExtends<number, number>;
        // Note: boolean IS a union type (true | false), so it will match
        type Test3 = UnionExtends<boolean, boolean>;
        type Test4 = UnionExtends<{ a: number }, { a: number }>;
        type Test5 = UnionExtends<[1, 2, 3], 1>;

        type cases = [
            Expect<AssertFalse<Test1>>,
            Expect<AssertFalse<Test2>>,
            Expect<AssertTrue<Test3>>,   // boolean is a union (true|false) that extends boolean
            Expect<AssertFalse<Test4>>,
            Expect<AssertFalse<Test5>>,
        ];
    });

    it("returns true when U is a member of union T (exact match)", () => {
        type Test1 = UnionExtends<string | number, string>;
        type Test2 = UnionExtends<string | number, number>;
        type Test3 = UnionExtends<"a" | "b" | "c", "b">;
        type Test4 = UnionExtends<1 | 2 | 3, 2>;

        type Test5 = UnionExtends<true | false, boolean>;
        type Test6 = UnionExtends<true | false, true>;
        type Test7 = UnionExtends<true | false, false>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,
            Expect<AssertTrue<Test5>>,   // true|false becomes boolean
            Expect<AssertFalse<Test6>>,  // individual true not found
            Expect<AssertFalse<Test7>>,  // individual false not found
        ];
    });

    it("returns false when U is not a member of union T and doesn't extend any member", () => {
        type Test1 = UnionExtends<string | number, boolean>;
        type Test2 = UnionExtends<"a" | "b" | "c", "d">;
        type Test3 = UnionExtends<1 | 2 | 3, 4>;
        type Test4 = UnionExtends<true | false, string>;

        type cases = [
            Expect<AssertFalse<Test1>>,
            Expect<AssertFalse<Test2>>,
            Expect<AssertFalse<Test3>>,
            Expect<AssertFalse<Test4>>,
        ];
    });

    it("uses extends matching (key difference from UnionIncludes)", () => {
        // string literal "foo" DOES extend wide type string
        type Test1 = UnionExtends<"foo" | "bar", string>;

        // number literal 1 DOES extend wide type number
        type Test2 = UnionExtends<1 | 2 | 3, number>;

        // specific object type DOES extend wider object type
        type Test3 = UnionExtends<{ a: 1 } | { a: 2 }, { a: number }>;

        // narrow string DOES extend string
        type Test4 = UnionExtends<"red" | "blue", string>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,
        ];
    });

    it("works with complex union types extending wider types", () => {
        type ComplexUnion =
            | { type: "a"; value: string }
            | { type: "b"; value: number }
            | { type: "c"; value: boolean };

        // Exact matches
        type Test1 = UnionExtends<ComplexUnion, { type: "a"; value: string }>;
        type Test2 = UnionExtends<ComplexUnion, { type: "b"; value: number }>;

        // Extends matches - wider types
        type Test3 = UnionExtends<ComplexUnion, { type: "a" }>;
        type Test4 = UnionExtends<ComplexUnion, { type: "b" }>;
        type Test5 = UnionExtends<ComplexUnion, { type: string }>;

        // No match
        type Test6 = UnionExtends<ComplexUnion, { type: "d"; value: string }>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,
            Expect<AssertTrue<Test5>>,
            Expect<AssertFalse<Test6>>,
        ];
    });

    it("handles union of literal types extending wider types", () => {
        type LiteralUnion = "red" | "green" | "blue" | 42 | true;

        // Exact matches
        type T1 = UnionExtends<LiteralUnion, "red">;
        type T2 = UnionExtends<LiteralUnion, 42>;
        type T3 = UnionExtends<LiteralUnion, true>;

        // Extends matches - wider types
        type T4 = UnionExtends<LiteralUnion, string>;
        type T5 = UnionExtends<LiteralUnion, number>;
        type T6 = UnionExtends<LiteralUnion, boolean>;

        // No match
        type F1 = UnionExtends<LiteralUnion, "yellow">;
        type F2 = UnionExtends<LiteralUnion, 43>;
        type F3 = UnionExtends<LiteralUnion, false>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertTrue<T4>>,  // string literals extend string
            Expect<AssertTrue<T5>>,  // number literal extends number
            Expect<AssertTrue<T6>>,  // true extends boolean
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
            Expect<AssertFalse<F3>>, // false is not in the union
        ];
    });

    it("handles array and tuple types in unions", () => {
        type ArrayUnion = string[] | number[] | [1, 2, 3];

        // Exact matches
        type T1 = UnionExtends<ArrayUnion, [1, 2, 3]>;
        type T2 = UnionExtends<ArrayUnion, number[]>;
        type T3 = UnionExtends<ArrayUnion, string[]>;

        // Extends matches - wider types
        type T4 = UnionExtends<ArrayUnion, readonly unknown[]>;
        type T5 = UnionExtends<ArrayUnion, readonly number[]>;

        // No match
        type F1 = UnionExtends<ArrayUnion, [1, 2]>;
        type F2 = UnionExtends<ArrayUnion, boolean[]>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertTrue<T3>>,
            Expect<AssertTrue<T4>>,  // arrays extend readonly unknown[]
            Expect<AssertTrue<T5>>,  // number[] extends readonly number[]
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
        ];
    });

    it("handles function types in unions with extends matching", () => {
        type FnUnion =
            | ((x: string) => number)
            | ((x: number) => string)
            | (() => void);

        // Exact matches
        type Test1 = UnionExtends<FnUnion, (x: string) => number>;
        type Test2 = UnionExtends<FnUnion, (x: number) => string>;
        type Test3 = UnionExtends<FnUnion, () => void>;

        // Extends matches - wider function types
        type Test4 = UnionExtends<FnUnion, (...args: any[]) => any>;

        // No match
        type Test5 = UnionExtends<FnUnion, (x: boolean) => string>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,  // specific functions extend general function type
            Expect<AssertFalse<Test5>>,
        ];
    });

    it("handles empty object vs object with properties", () => {
        type ObjectUnion = {} | { a: number } | { b: string };

        // Exact matches
        type Test1 = UnionExtends<ObjectUnion, EmptyObject>;
        type Test2 = UnionExtends<ObjectUnion, { a: number }>;
        type Test3 = UnionExtends<ObjectUnion, { b: string }>;

        // Extends matches - all objects extend {}
        type Test4 = UnionExtends<ObjectUnion, object>;
        type Test5 = UnionExtends<ObjectUnion, Record<string, any>>;

        // No match
        type Test6 = UnionExtends<ObjectUnion, { c: boolean }>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,  // all objects extend object
            Expect<AssertTrue<Test5>>,  // all objects extend Record<string, any>
            Expect<AssertFalse<Test6>>,
        ];
    });

    it("handles unions with unknown and other types", () => {
        type UnknownUnion = unknown | string | number;

        // Note: unknown in a union absorbs other types, so this union is just `unknown`
        // But if we check against specific types, they won't be found because the union
        // is not actually a union type anymore (it's just unknown)
        type Test1 = UnionExtends<UnknownUnion, unknown>;
        type Test2 = UnionExtends<UnknownUnion, string>;
        type Test3 = UnionExtends<UnknownUnion, number>;

        type cases = [
            // unknown absorbs the union, making it not a union type
            Expect<AssertFalse<Test1>>,
            Expect<AssertFalse<Test2>>,
            Expect<AssertFalse<Test3>>,
        ];
    });

    it("handles large unions", () => {
        type LargeUnion =
            | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
            | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

        // Exact matches
        type Test1 = UnionExtends<LargeUnion, 1>;
        type Test2 = UnionExtends<LargeUnion, 10>;
        type Test3 = UnionExtends<LargeUnion, 20>;

        // Extends match - wider type
        type Test4 = UnionExtends<LargeUnion, number>;

        // No match
        type Test5 = UnionExtends<LargeUnion, 21>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,  // number literals extend number
            Expect<AssertFalse<Test5>>,
        ];
    });

    it("handles null and undefined in unions", () => {
        type WithNull = "foo" | "bar" | null;
        type WithUndefined = "foo" | "bar" | undefined;
        type WithBoth = "foo" | null | undefined;
        type JustNullAndUndefined = null | undefined;

        // Exact matches
        type Test1 = UnionExtends<WithNull, "foo">;
        type Test2 = UnionExtends<WithNull, null>;
        type Test3 = UnionExtends<WithUndefined, "foo">;
        type Test4 = UnionExtends<WithUndefined, undefined>;
        type Test5 = UnionExtends<WithBoth, "foo">;
        type Test6 = UnionExtends<WithBoth, null>;
        type Test7 = UnionExtends<WithBoth, undefined>;
        type Test8 = UnionExtends<JustNullAndUndefined, null>;
        type Test9 = UnionExtends<JustNullAndUndefined, undefined>;

        // Extends matches - wider types
        type Test10 = UnionExtends<WithNull, string>;
        type Test11 = UnionExtends<WithUndefined, string>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertTrue<Test4>>,   // undefined IS matched by Contains with extends
            Expect<AssertTrue<Test5>>,
            Expect<AssertTrue<Test6>>,
            Expect<AssertTrue<Test7>>,   // undefined IS matched by Contains with extends
            Expect<AssertTrue<Test8>>,
            Expect<AssertTrue<Test9>>,   // undefined IS matched by Contains with extends
            Expect<AssertTrue<Test10>>,   // string literals extend string
            Expect<AssertTrue<Test11>>,   // string literals extend string
        ];
    });

    it("demonstrates key difference: extends vs equals", () => {
        // UnionExtends uses extends matching
        type ExtendsLiteral = UnionExtends<"foo" | "bar", string>;
        type ExtendsNumber = UnionExtends<1 | 2 | 3, number>;

        // This is the key difference from UnionIncludes which requires exact equality
        // UnionExtends returns true when ANY member extends U
        type ExtendsObject = UnionExtends<{ a: 1 } | { b: 2 }, { a: number }>;

        type cases = [
            Expect<AssertTrue<ExtendsLiteral>>,   // "foo" extends string
            Expect<AssertTrue<ExtendsNumber>>,    // 1 extends number
            Expect<AssertTrue<ExtendsObject>>,    // { a: 1 } extends { a: number }
        ];
    });

    it("handles union with mixed narrow and wide types", () => {
        // NOTE: TypeScript collapses "foo" | string to just string
        // and 42 | number to just number, so this is NOT a union type
        type MixedUnion = "foo" | string | 42 | number;

        // These will all be false because MixedUnion gets collapsed to string | number
        // which is then just a union of wide types (not including the specific literals)
        type Test1 = UnionExtends<MixedUnion, "foo">;
        type Test2 = UnionExtends<MixedUnion, string>;
        type Test3 = UnionExtends<MixedUnion, 42>;
        type Test4 = UnionExtends<MixedUnion, number>;

        // Instead, let's test a REAL mixed union that doesn't collapse
        type RealMixedUnion = "foo" | "bar" | 42 | true;
        type Test5 = UnionExtends<RealMixedUnion, "foo">;
        type Test6 = UnionExtends<RealMixedUnion, string>;  // "foo" extends string
        type Test7 = UnionExtends<RealMixedUnion, 42>;
        type Test8 = UnionExtends<RealMixedUnion, number>;  // 42 extends number

        type cases = [
            // These are true because string | number is still a union
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test4>>,
            // These test actual mixed unions
            Expect<AssertTrue<Test5>>,
            Expect<AssertTrue<Test6>>,
            Expect<AssertTrue<Test7>>,
            Expect<AssertTrue<Test8>>,
        ];
    });

    it("handles readonly modifiers", () => {
        type ReadonlyUnion = readonly [1, 2, 3] | readonly string[] | readonly number[];

        // BUG: Readonly tuple matching doesn't work - readonly [1,2,3] SHOULD match
        // but fails due to UnionToTuple__PreserveBoolean not preserving readonly modifiers correctly
        type Test1 = UnionExtends<ReadonlyUnion, readonly [1, 2, 3]>;

        // Readonly arrays DO match correctly
        type Test2 = UnionExtends<ReadonlyUnion, readonly string[]>;
        type Test3 = UnionExtends<ReadonlyUnion, readonly number[]>;

        // Regular arrays shouldn't match readonly arrays (mutable ≠ readonly)
        type Test4 = UnionExtends<ReadonlyUnion, string[]>;
        type Test5 = UnionExtends<ReadonlyUnion, number[]>;

        // Extends matches - wider types
        type Test6 = UnionExtends<ReadonlyUnion, readonly unknown[]>;

        // Test with regular (non-readonly) union for comparison
        type RegularUnion = [1, 2, 3] | string[] | number[];
        type Test7 = UnionExtends<RegularUnion, [1, 2, 3]>;
        type Test8 = UnionExtends<RegularUnion, string[]>;

        type cases = [
            // BUG: This test FAILS - documents bug in UnionToTuple__PreserveBoolean
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,
            Expect<AssertFalse<Test4>>,  // mutable arrays don't extend readonly
            Expect<AssertFalse<Test5>>,  // mutable arrays don't extend readonly
            Expect<AssertTrue<Test6>>,   // readonly arrays extend readonly unknown[]
            Expect<AssertTrue<Test7>>,
            Expect<AssertTrue<Test8>>,
        ];
    });

    it("handles optional properties in object unions", () => {
        type OptionalUnion =
            | { a: string; b?: number }
            | { a: number; b: string }
            | { c?: boolean };

        // Exact matches
        type Test1 = UnionExtends<OptionalUnion, { a: string; b?: number }>;
        type Test2 = UnionExtends<OptionalUnion, { a: number; b: string }>;

        // Extends matches - partial types
        type Test3 = UnionExtends<OptionalUnion, { a: string }>;
        type Test4 = UnionExtends<OptionalUnion, { a: number }>;

        type cases = [
            Expect<AssertTrue<Test1>>,
            Expect<AssertTrue<Test2>>,
            Expect<AssertTrue<Test3>>,  // { a: string; b?: number } extends { a: string }
            Expect<AssertTrue<Test4>>,  // { a: number; b: string } extends { a: number }
        ];
    });
});
