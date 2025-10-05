
import { describe, it } from "vitest";
import type { EmptyObject, Expect, OnlyOptional, Test } from "inferred-types/types";

describe("OnlyOptional<T>", () => {

    describe("Tuple tests", () => {
        it("tuples with optional elements", () => {
            type NoOptional = OnlyOptional<[1, 2, 3]>;

            type LastOptional = OnlyOptional<[1, 2, 3?]>;
            type MultiOptional = OnlyOptional<[1, 2?, 3?]>;
            type AllOptional = OnlyOptional<[1?, 2?, 3?]>;

            type cases = [
                Expect<Test<NoOptional, "equals", []>>,
                Expect<Test<LastOptional, "equals", [3?]>>,
                Expect<Test<MultiOptional, "equals", [2?, 3?]>>,
                Expect<Test<AllOptional, "equals", [1?, 2?, 3?]>>,
            ];
        });

        it("empty tuple", () => {
            type Empty = OnlyOptional<[]>;
            type cases = [
                Expect<Test<Empty, "equals", []>>,
            ];
        });

        it("single element tuples", () => {
            type SingleRequired = OnlyOptional<[42]>;
            type SingleOptional = OnlyOptional<[42?]>;

            type cases = [
                Expect<Test<SingleRequired, "equals", []>>,
                Expect<Test<SingleOptional, "equals", [42?]>>,
            ];
        });

        it("mixed types with optional", () => {
            type Mixed = OnlyOptional<[string, boolean, number?, symbol?]>;

            type cases = [
                Expect<Test<Mixed, "equals", [number?, symbol?]>>,
            ];
        });

        it("consecutive optional elements", () => {
            type ConsecutiveOptional = OnlyOptional<[1, 2?, 3?, 4?, 5?]>;

            type cases = [
                Expect<Test<ConsecutiveOptional, "equals", [2?, 3?, 4?, 5?]>>,
            ];
        });

        it("optional at start (edge case)", () => {
            // Note: TypeScript doesn't allow optional before required in tuples
            // So we test what is syntactically valid
            type TrailingOptional = OnlyOptional<[1, 2, 3?, 4?]>;
            type cases = [
                Expect<Test<TrailingOptional, "equals", [3?, 4?]>>,
            ];
        });

        it("nested tuples with optional", () => {
            type Nested = OnlyOptional<[[1, 2?], [3, 4?], 5?]>;

            type cases = [
                Expect<Test<Nested, "equals", [5?]>>,
            ];
        });

        it("tuple with literal types", () => {
            type Literals = OnlyOptional<["exact", true, 42?, "another"?]>;
            type cases = [
                Expect<Test<Literals, "equals", [42?, "another"?]>>,
            ];
        });
    });

    describe("Object tests", () => {
        it("objects with optional properties", () => {
            type NoOptional = OnlyOptional<{ foo: 1; bar: 2 }>;
            type SomeOptional = OnlyOptional<{ foo: 1; bar?: 2; baz?: number }>;
            type AllOptional = OnlyOptional<{ foo?: 1; bar?: 2; baz?: number }>;

            type cases = [
                Expect<Test<NoOptional, "equals", EmptyObject>>,
                Expect<Test<SomeOptional, "equals", { bar?: 2; baz?: number }>>,
                Expect<Test<AllOptional, "equals", { foo?: 1; bar?: 2; baz?: number }>>,
            ];
        });

        it("empty object", () => {
            type Empty = OnlyOptional<EmptyObject>;
            type cases = [
                Expect<Test<Empty, "equals", EmptyObject>>,
            ];
        });

        it("single property objects", () => {
            type SingleRequired = OnlyOptional<{ prop: string }>;
            type SingleOptional = OnlyOptional<{ prop?: string }>;

            type cases = [
                Expect<Test<SingleRequired, "equals", EmptyObject>>,
                Expect<Test<SingleOptional, "equals", { prop?: string }>>,
            ];
        });

        it("numeric and symbol keys", () => {
            type NumericKeys = OnlyOptional<{ 0: string; 1?: number; 2: boolean; 3?: symbol }>;
            type cases = [
                Expect<Test<NumericKeys, "equals", { 1?: number; 3?: symbol }>>,
            ];
        });

        it("deeply nested objects", () => {
            type DeepNested = OnlyOptional<{
                a: { x: string; y?: number };
                b?: { nested: { deep: string } };
                c: string;
            }>;
            type cases = [
                Expect<Test<DeepNested, "equals", {
                    b?: { nested: { deep: string } };
                }>>,
            ];
        });

        it("function properties", () => {
            type WithFunctions = OnlyOptional<{
                fn1: () => void;
                fn2?: (x: number) => string;
                fn3: (a: string) => boolean;
                fn4?: () => number;
            }>;
            type cases = [
                Expect<Test<WithFunctions, "equals", {
                    fn2?: (x: number) => string;
                    fn4?: () => number;
                }>>,
            ];
        });

        it("readonly properties", () => {
            type WithReadonly = OnlyOptional<{
                readonly a: string;
                b?: number;
                readonly c?: boolean;
            }>;
            type cases = [
                Expect<Test<WithReadonly, "equals", {
                    b?: number;
                    readonly c?: boolean;
                }>>,
            ];
        });

        it("union type values", () => {
            type WithUnions = OnlyOptional<{
                a: string | number;
                b?: number | boolean;
                c: boolean;
                d?: string | null;
            }>;
            type cases = [
                Expect<Test<WithUnions, "equals", {
                    b?: number | boolean;
                    d?: string | null;
                }>>,
            ];
        });

        it("literal types", () => {
            type Literals = OnlyOptional<{
                str: "exact";
                num?: 42;
                bool: true;
                another?: "value";
            }>;
            type cases = [
                Expect<Test<Literals, "equals", {
                    num?: 42;
                    another?: "value";
                }>>,
            ];
        });

        it("template literal types", () => {
            type Templates = OnlyOptional<{
                template: `hello-${string}`;
                optional?: `${number}-world`;
                another: string;
            }>;
            type cases = [
                Expect<Test<Templates, "equals", {
                    optional?: `${number}-world`;
                }>>,
            ];
        });
    });

    describe("Edge cases", () => {
        it("wide types should return themselves", () => {
            type WideArray = OnlyOptional<string[]>;
            type WideObject = OnlyOptional<Record<string, number>>;

            type cases = [
                Expect<Test<WideArray, "equals", string[]>>,
                Expect<Test<WideObject, "equals", Record<string, number>>>,
            ];
        });

        it("array with optional elements and variadic tail", () => {
            type VariadicOptional = OnlyOptional<[1, 2?, ...number[]]>;
            type cases = [
                Expect<Test<VariadicOptional, "equals", [2?]>>,
            ];
        });

        it("mixed required and optional in complex structure", () => {
            type Complex = OnlyOptional<{
                required1: string;
                optional1?: number;
                nested: {
                    innerRequired: boolean;
                    innerOptional?: symbol;
                };
                optional2?: string[];
                required2: number;
            }>;
            type cases = [
                Expect<Test<Complex, "equals", {
                    optional1?: number;
                    optional2?: string[];
                }>>,
            ];
        });

        it("objects containing tuples", () => {
            type ObjectWithTuples = OnlyOptional<{
                tuple1: [string, number?];
                optional?: boolean;
                tuple2?: [string, number?];
                keep: string;
            }>;
            type cases = [
                Expect<Test<ObjectWithTuples, "equals", {
                    optional?: boolean;
                    tuple2?: [string, number?];
                }>>,
            ];
        });

        it("tuples containing objects", () => {
            type TupleWithObjects = OnlyOptional<[
                { a: string; b?: number },
                { c?: string; d: boolean }?
            ]>;
            type cases = [
                Expect<Test<TupleWithObjects, "equals", [
                    { c?: string; d: boolean }?
                ]>>,
            ];
        });

        it("optional with undefined type", () => {
            type WithUndefined = OnlyOptional<{
                a: string;
                b?: undefined;
                c: number;
                d?: string | undefined;
            }>;
            type cases = [
                Expect<Test<WithUndefined, "equals", {
                    b?: undefined;
                    d?: string | undefined;
                }>>,
            ];
        });

        it("optional with null type", () => {
            type WithNull = OnlyOptional<{
                a: string;
                b?: null;
                c: number;
                d?: string | null;
            }>;
            type cases = [
                Expect<Test<WithNull, "equals", {
                    b?: null;
                    d?: string | null;
                }>>,
            ];
        });
    });

    describe("Stress tests", () => {
        it("large tuple with optional elements", () => {
            type LargeTuple = OnlyOptional<[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16?, 17?, 18?, 19?, 20?
            ]>;
            type cases = [
                Expect<Test<LargeTuple, "equals", [16?, 17?, 18?, 19?, 20?]>>,
            ];
        });

        it("large object with optional properties", () => {
            type LargeObject = OnlyOptional<{
                a1: string; a2?: number; a3: boolean; a4?: symbol; a5: string;
                b1?: number; b2: string; b3?: boolean; b4: number; b5?: string;
                c1: boolean; c2?: string; c3: number; c4?: boolean; c5: string;
                d1?: number; d2: boolean; d3?: string; d4: number; d5?: boolean;
            }>;
            type cases = [
                Expect<Test<LargeObject, "equals", {
                    a2?: number; a4?: symbol;
                    b1?: number; b3?: boolean; b5?: string;
                    c2?: string; c4?: boolean;
                    d1?: number; d3?: string; d5?: boolean;
                }>>,
            ];
        });

        it("alternating pattern in tuple", () => {
            type AlternatingPattern = OnlyOptional<[
                "a", "b", "c", "d", "e", "f"?, "g"?, "h"?, "i"?, "j"?
            ]>;
            type cases = [
                Expect<Test<AlternatingPattern, "equals", ["f"?, "g"?, "h"?, "i"?, "j"?]>>,
            ];
        });

        it("complex nested structure", () => {
            type Input = {
                level1?: {
                    tuple?: [string, number?];
                    required: string;
                    nested?: {
                        deeper: boolean;
                        optional?: number;
                    };
                };
                optional?: string;
                topLevelTuple: [boolean, string?];
            };

            type Complex = OnlyOptional<Input>;

            type cases = [
                Expect<Test<Complex, "equals", {
                    level1?: {
                        tuple?: [string, number?];
                        required: string;
                        nested?: {
                            deeper: boolean;
                            optional?: number;
                        };
                    };
                    optional?: string;
                }>>,
            ];
        });
    });

    describe("Type preservation", () => {
        it("preserves exact optional literal types", () => {
            type Literals = OnlyOptional<{
                str: "exact";
                num?: 42;
                bool?: true;
                another: "value";
            }>;
            type cases = [
                Expect<Test<Literals, "equals", {
                    num?: 42;
                    bool?: true;
                }>>,
            ];
        });

        it("preserves generic types", () => {
            type Generic<T> = OnlyOptional<{
                required: T;
                optional?: T;
            }>;
            type StringCase = Generic<string>;
            type cases = [
                Expect<Test<StringCase, "equals", { optional?: string }>>,
            ];
        });

        it("preserves intersection types", () => {
            type WithIntersection = OnlyOptional<{
                a: string & { length: number };
                b?: number & { toFixed: Function };
            }>;
            type cases = [
                Expect<Test<WithIntersection, "equals", {
                    b?: number & { toFixed: Function };
                }>>,
            ];
        });
    });
});
