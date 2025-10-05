import { describe, it } from "vitest";
import type { Expand, Expect, Intersection, Test, Values } from "inferred-types/types";

import { IsLiteral } from "inferred-types";

describe("Intersection<A,B>", () => {

    it("with tuples", () => {
        type T1 = Intersection<
            ["a","b","c"],
            ["a","c"]
        >;

        type cases = [
            Expect<Test<T1, "equals", ["a","c"]>>,
        ];
    });

    it("tuple of objects", () => {
        type A = [
            { id: 1, name: "Bob" },
            { id: 2, name: "Mary" },
        ];
        type B = [
            { id: 2, name: "Chris" },
            { id: 3, name: "Joe" }
        ];

        type WithOffset = Intersection<A,B, "id">;
        type WithoutOffset = Intersection<A,B>;

        type cases = [
            Expect<Test<WithOffset, "equals", [ { id: 2; name: "Mary" | "Chris"} ]>>,
            Expect<Test<WithoutOffset, "equals", []>>,
        ];
    });

    it("wide arrays", () => {
        // even though both are wide their possible values do not intersect
        type T1 = Intersection<string[], number[]>;
        // we don't know which matches (if any) will occur but we know they will be string
        type T2 = Intersection<string[], string[]>;
        // same logic applies to both being numeric arrays
        type T3 = Intersection<number[], number[]>;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", string[]>>,
            Expect<Test<T3, "equals", number[]>>,
        ];
    });

    it("different container types", () => {
        type T1 = Intersection<[1,2,3], { foo: 1 }>;

        type cases = [
            Expect<Test<T1, "isError", "invalid-comparison">>,
        ];
    });

    it("with object", () => {
        // both 1 and 2 are found in both type's values
        type T1 = Intersection<
            { foo: 1, bar: 2 },
            { foo: 2, bar: 1 }
        >

        // even though it's from different keys, both A and B share the same values
        type T2 = Intersection<
            { foo: "uno", bar: "dos" },
            { baz: "uno", bax: "dos" }
        >;

        // here are NO shared values between A and B
        type T3 = Intersection<
            { foo: 1, bar: 2 },
            { foo: 3, bar: 4 }
        >;

        type cases = [
            Expect<Test<T1, "equals", [1,2]>>,
            Expect<Test<T2, "equals", ["uno","dos"]>>,
            Expect<Test<T3, "equals", []>>,

        ];
    });

    it("edge cases - empty arrays", () => {
        type T1 = Intersection<[], []>;
        type T2 = Intersection<[], [1,2]>;
        type T3 = Intersection<[1,2], []>;
        type T4 = Intersection<[1], [1]>;
        type T5 = Intersection<[1], [2]>;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", []>>,
            Expect<Test<T4, "equals", [1]>>,
            Expect<Test<T5, "equals", []>>,
        ];
    });

    it("edge cases - null and undefined values", () => {
        type T1 = Intersection<[1, null], [null, 2]>;
        type T2 = Intersection<[undefined, 1], [1, undefined]>;
        type T3 = Intersection<[null, undefined], [undefined, null]>;
        type T4 = Intersection<[1, null, 3], [null, 2, 3]>;

        type cases = [
            Expect<Test<T1, "equals", [null]>>,
            Expect<Test<T2, "equals", [undefined, 1]>>,
            Expect<Test<T3, "equals", [null, undefined]>>,
            Expect<Test<T4, "equals", [null, 3]>>,
        ];
    });

    it("complex offset cases", () => {
        // Invalid offset property
        type T1 = Intersection<
            [{ id: 1, name: "foo" }, { id: 2, name: "bar" }],
            [{ id: 2, name: "bar" }],
            "nonexistent"
        >;

        // Offset with non-object elements
        type T2 = Intersection<[1, 2, 3], [2, 3, 4], "id">;

        // Mixed objects where some have offset property
        type T3 = Intersection<
            [{ id: 1, name: "foo" }, { name: "bar" }],
            [{ id: 1, name: "foo" }, { id: 2, name: "baz" }],
            "id"
        >;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", [{id: 1, name: "foo"}]>>,
        ];
    });

    it("union and mixed types", () => {
        // Arrays with union types
        type T1 = Intersection<[string | number], [string | boolean]>;
        type T2 = Intersection<[number | boolean], [string | boolean]>;
        type T3 = Intersection<[string | number | boolean], [number | boolean | null]>;

        // Mixed primitive arrays
        type T4 = Intersection<[1, "hello", true], [1, "world", false]>;
        type T5 = Intersection<[1, "hello", true, null], [null, "hello", 2, false]>;
        type T6 = Intersection<[42, "test", undefined], [42, undefined, "different"]>;

        // One comparator is a union and the other is not
        type T7 = Intersection<[string | number], [string]>



        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", []>>,
            Expect<Test<T4, "equals", [1]>>,
            Expect<Test<T5, "equals", ["hello", null]>>,
            Expect<Test<T6, "equals", [42, undefined]>>,
        ];
    });

    it("object edge cases", () => {
        // Empty objects
        type T1 = Intersection<{}, {}>;
        type T2 = Intersection<{}, { a: 1 }>;
        type T3 = Intersection<{ a: 1, b: 2 }, {}>;

        // Objects with null/undefined values
        type T4 = Intersection<{ a: null, b: 2 }, { a: null, c: 3 }>;
        type T5 = Intersection<{ a: undefined, b: 1 }, { a: undefined, b: 2 }>;
        type T6 = Intersection<{ x: null, y: undefined }, { y: undefined, z: null }>;

        // Objects with complex values
        type T7 = Intersection<{ a: { nested: 1 }, b: [1, 2] }, { a: { nested: 1 }, c: [3, 4] }>;
        type T8 = Intersection<{ arr: [1, 2, 3], obj: { x: 1 } }, { arr: [1, 2, 3], str: "hello" }>;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", []>>,
            Expect<Test<T3, "equals", []>>,
            Expect<Test<T4, "equals", [null]>>,
            Expect<Test<T5, "equals", [undefined]>>,
            Expect<Test<T6, "hasSameValues", [undefined, null]>>,
            Expect<Test<T7, "equals", [{ nested: 1 }]>>,
            Expect<Test<T8, "equals", [[1, 2, 3]]>>,
        ];
    });

    it("additional error cases", () => {
        // More mixed container type combinations that should error
        type T1 = Intersection<[1, 2, 3], Record<string, number>>;
        type T2 = Intersection<Record<number, string>, [1, 2, 3]>;
        type T3 = Intersection<readonly [1, 2], { 0: 1, 1: 2 }>;

        type cases = [
            Expect<Test<T1, "isError", "invalid-comparison">>,
            Expect<Test<T2, "isError", "invalid-comparison">>,
            Expect<Test<T3, "isError", "invalid-comparison">>,
        ];
    });

    it("wide container variations", () => {
        // Different wide container types
        type T1 = Intersection<string[], number[]>;
        type T2 = Intersection<boolean[], boolean[]>;
        type T3 = Intersection<(string | number)[], string[]>;
        type T4 = Intersection<any[], unknown[]>;

        // Wide vs narrow container combinations
        type T5 = Intersection<string[], ["hello", "world"]>;
        type T6 = Intersection<[1, 2, 3], number[]>;
        type T7 = Intersection<(string | number)[], [1, "hello", 2]>;
        type T8 = Intersection<readonly string[], ["a", "b"]>;

        type cases = [
            Expect<Test<T1, "equals", []>>,
            Expect<Test<T2, "equals", boolean[]>>,
            Expect<Test<T3, "equals", string[]>>,
            Expect<Test<T4, "equals", any[]>>,
            Expect<Test<T5, "equals", ("hello" | "world")[]>>,
            Expect<Test<T6, "equals", (1|2|3)[]>>,
            Expect<Test<T7, "equals", (1|2|"hello")[]>>,
            Expect<Test<T8, "equals", ("a" | "b")[]>>,
        ];
    });

    it("complex scenarios", () => {
        // Mixed readonly arrays
        type T1 = Intersection<readonly [1, 2, 3], readonly [2, 3, 4]>;
        type T2 = Intersection<readonly [1, 2], [2, 3]>;

        // Arrays with complex union intersections
        type T3 = Intersection<
            [(string | number), (boolean | string)],
            [(number | boolean), string]
        >;

        // Optional properties in objects (edge case)
        type T4 = Intersection<
            { a: string, b?: number },
            { a: string, c?: boolean }
        >;


        type cases = [
            Expect<Test<T1, "equals", [2, 3]>>,
            Expect<Test<T2, "equals", [2]>>,
            Expect<Test<T3, "equals", [string?]>>,
            Expect<Test<T4, "equals", [string]>>,
        ];
    });

});

