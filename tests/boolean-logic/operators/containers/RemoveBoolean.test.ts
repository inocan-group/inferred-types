import type { AssertEqual, AssertExtends, EmptyObject, Expect, ObjectKeys, RemoveBoolean } from "inferred-types/types";
import { describe, it } from "vitest";

// NOTE: RemoveBoolean is a type utility only, so we only write type tests

describe("RemoveBoolean", () => {
    describe("Array/Tuple handling", () => {
        it("should remove boolean literals from tuples", () => {
            type Input1 = [1, true, "hello", false, 42];
            type Result1 = RemoveBoolean<Input1>;

            type Input2 = [true, false, boolean];
            type Result2 = RemoveBoolean<Input2>;

            type Input3 = ["a", "b", "c"];
            type Result3 = RemoveBoolean<Input3>;

            type cases = [
                Expect<AssertEqual<Result1, [1, "hello", 42]>>,
                Expect<AssertEqual<Result2, []>>,
                Expect<AssertEqual<Result3, ["a", "b", "c"]>>,
            ];
        });

        it("should handle empty tuples", () => {
            type Empty = RemoveBoolean<[]>;

            type cases = [
                Expect<AssertEqual<Empty, []>>,
            ];
        });

        it("should handle tuples with only booleans", () => {
            type OnlyTrue = RemoveBoolean<[true, true, true]>;
            type OnlyFalse = RemoveBoolean<[false, false]>;
            type Mixed = RemoveBoolean<[true, false, boolean, true]>;

            type cases = [
                Expect<AssertEqual<OnlyTrue, []>>,
                Expect<AssertEqual<OnlyFalse, []>>,
                Expect<AssertEqual<Mixed, []>>,
            ];
        });

        it("should handle wide array types", () => {
            type BooleanArray = RemoveBoolean<boolean[]>;
            type StringArray = RemoveBoolean<string[]>;
            type NumberArray = RemoveBoolean<number[]>;
            type MixedArray = RemoveBoolean<(string | number | boolean)[]>;

            type cases = [
                Expect<AssertEqual<BooleanArray, []>>,
                Expect<AssertEqual<StringArray, string[]>>,
                Expect<AssertEqual<NumberArray, number[]>>,
                Expect<AssertEqual<MixedArray, (string | number | boolean)[]>>,
            ];
        });

        it("should handle readonly tuples (readonly modifier is not preserved)", () => {
            // The utility treats readonly arrays the same as regular arrays
            // and does not preserve the readonly modifier
            type ReadonlyInput = readonly [1, true, "test", false];
            type R1 = RemoveBoolean<ReadonlyInput>;

            type ReadonlyAndOptional = readonly [1, true, "test", false?];
            type R2 = RemoveBoolean<ReadonlyAndOptional>;

            type cases = [
                Expect<AssertEqual<R1, [1, "test"]>>,
                Expect<AssertEqual<R2, [1, "test"]>>,
            ];
        });

        it("should handle complex nested types in arrays", () => {
            type WithObjects = RemoveBoolean<[{ id: 1 }, true, { name: "test" }, false]>;
            type WithArrays = RemoveBoolean<[[1, 2], true, [3, 4], false]>;
            type WithUnions = RemoveBoolean<[string | number, true, boolean, "literal"]>;

            type cases = [
                Expect<AssertEqual<WithObjects, [{ id: 1 }, { name: "test" }]>>,
                Expect<AssertEqual<WithArrays, [[1, 2], [3, 4]]>>,
                Expect<AssertEqual<WithUnions, [string | number, "literal"]>>,
            ];
        });

        it("should preserve null and undefined", () => {
            type WithNullish = RemoveBoolean<[null, true, undefined, false, "value"]>;

            type cases = [
                Expect<AssertEqual<WithNullish, [null, undefined, "value"]>>,
            ];
        });
    });

    describe("Dictionary/Object handling", () => {
        it("should remove properties with boolean values", () => {
            type Input1 = { a: string; b: true; c: number; d: false; e: boolean };
            type Result1 = RemoveBoolean<Input1>;

            type Input2 = { flag1: true; flag2: false; flag3: boolean };
            type Result2 = RemoveBoolean<Input2>;

            type Input3 = { name: string; age: number; active: boolean };
            type Result3 = RemoveBoolean<Input3>;

            type cases = [
                Expect<AssertEqual<Result1, { a: string; c: number }>>,
                Expect<AssertEqual<Result2, EmptyObject>>,
                Expect<AssertEqual<Result3, { name: string; age: number }>>,
            ];
        });

        it("should handle empty objects", () => {
            type Empty = RemoveBoolean<EmptyObject>;

            type cases = [
                Expect<AssertEqual<Empty, EmptyObject>>,
            ];
        });

        it("should handle objects with no boolean values", () => {
            type Input = { a: string; b: number; c: { nested: string } };
            type Result = RemoveBoolean<Input>;

            type cases = [
                Expect<AssertEqual<Result, Input>>,
            ];
        });

        it("should handle objects with only boolean values", () => {
            type OnlyBooleans = { a: true; b: false; c: boolean };
            type Result = RemoveBoolean<OnlyBooleans>;

            type cases = [
                Expect<AssertEqual<Result, EmptyObject>>,
            ];
        });

        it("should preserve complex property types", () => {
            type Input = {
                data: { nested: string };
                flag: true;
                list: string[];
                count: number;
                enabled: boolean;
                union: string | number;
            };
            type Result = RemoveBoolean<Input>;

            type Expected = {
                data: { nested: string };
                list: string[];
                count: number;
                union: string | number;
            };

            type cases = [
                Expect<AssertEqual<Result, Expected>>,
            ];
        });

        it("removes optional key/values with typeof Optional<Boolean> by default", () => {
            type Input = { a: string; b?: true; c: number; d?: false; e: boolean };
            type Result = RemoveBoolean<Input>;

            type cases = [
                Expect<AssertEqual<Result, { a: string; c: number; }>>,
            ];
        });

        it("skips optional key/values with typeof Optional<Boolean> when instructed", () => {
            type Input = { a: string; b?: true; c: number; d?: false; e: boolean };
            type Result = RemoveBoolean<Input, false>;

            type cases = [
                Expect<AssertEqual<Result, { a: string; b?: true; c: number; d?: false;  }>>,
            ];
        });


        it("should preserve null and undefined property values", () => {
            type Input = { a: null; b: true; c: undefined; d: false; e: string };
            type Result = RemoveBoolean<Input>;

            type cases = [
                Expect<AssertEqual<Result, { a: null; c: undefined; e: string }>>,
            ];
        });

        it("should handle properties with union types containing boolean", () => {
            type Input = {
                a: string | boolean;
                b: true;
                c: number | false;
                d: string;
            };
            type Result = RemoveBoolean<Input>;

            type cases = [
                Expect<AssertEqual<Result, { a: string | boolean; c: number | false; d: string }>>,
            ];
        });

        it("should work with Record types", () => {
            type Input = Record<"a" | "b", string> & { c: true; d: number };
            type Result = RemoveBoolean<Input>;

            type Expected = { a: string; b: string; d: number };

            type cases = [
                Expect<AssertEqual<Result, Expected>>,
            ];
        });
    });

    describe("Edge cases", () => {
        it("should handle nested structures (not recursive)", () => {
            // RemoveBoolean only operates on the top level
            type NestedArray = RemoveBoolean<[{ flag: true }, false, "test"]>;
            type NestedObject = RemoveBoolean<{ outer: { inner: boolean }; flag: true }>;

            type cases = [
                Expect<AssertEqual<NestedArray, [{ flag: true }, "test"]>>,
                Expect<AssertEqual<NestedObject, { outer: { inner: boolean } }>>,
            ];
        });

        it("should handle mixed literal and wide boolean types", () => {
            type TupleWithWide = RemoveBoolean<[true, boolean, false, "value"]>;
            type ObjectWithWide = { a: true; b: boolean; c: false; d: string };
            type ResultObj = RemoveBoolean<ObjectWithWide>;

            type cases = [
                Expect<AssertEqual<TupleWithWide, ["value"]>>,
                Expect<AssertEqual<ResultObj, { d: string }>>,
            ];
        });

        it("should handle symbols and other special types", () => {
            const sym = Symbol("test");
            type WithSymbol = RemoveBoolean<[symbol, true, typeof sym, false]>;
            type WithBigInt = RemoveBoolean<[bigint, true, 42n, false]>;

            type cases = [
                Expect<AssertEqual<WithSymbol, [symbol, typeof sym]>>,
                Expect<AssertEqual<WithBigInt, [bigint, 42n]>>,
            ];
        });
    });

    describe("Type checking for boolean values", () => {
        it("should correctly identify IsBoolean for true", () => {
            type OnlyTrue = RemoveBoolean<[true]>;

            type cases = [
                Expect<AssertEqual<OnlyTrue, []>>,
            ];
        });

        it("should correctly identify IsBoolean for false", () => {
            type OnlyFalse = RemoveBoolean<[false]>;

            type cases = [
                Expect<AssertEqual<OnlyFalse, []>>,
            ];
        });

        it("should correctly identify IsBoolean for boolean", () => {
            type OnlyBoolean = RemoveBoolean<[boolean]>;

            type cases = [
                Expect<AssertEqual<OnlyBoolean, []>>,
            ];
        });
    });

    describe("Optional elements in tuples (O generic parameter)", () => {
        it("should remove optional boolean elements by default (O=true)", () => {
            // TypeScript requires all required elements before optional ones
            type Input1 = [string, number, true?, false?];
            type Result1 = RemoveBoolean<Input1>;

            type Input2 = [1, true, 42, "hello"?, false?];
            type Result2 = RemoveBoolean<Input2>;

            type Input3 = [boolean?, string?, number?];
            type Result3 = RemoveBoolean<Input3>;

            type cases = [
                // Optional booleans are removed entirely by default
                Expect<AssertEqual<Result1, [string, number]>>,
                Expect<AssertEqual<Result2, [1, 42, "hello"?]>>,
                Expect<AssertEqual<Result3, [string?, number?]>>,
            ];
        });

        it("should preserve optional boolean elements when O=false", () => {
            type Input1 = [string, number, true?, false?];
            type Result1 = RemoveBoolean<Input1, false>;

            type Input2 = [1, true, 42, "hello"?, false?];
            type Result2 = RemoveBoolean<Input2, false>;

            type Input3 = [boolean?, string?, number?];
            type Result3 = RemoveBoolean<Input3, false>;

            type cases = [
                Expect<AssertEqual<Result1, [ string, number, true?, false?]>>,
                Expect<AssertEqual<Result2, [ 1, 42, "hello"?, false? ]>>,
                Expect<AssertEqual<Result3, [ boolean?, string? , number? ]>>,
            ];
        });

        it("should handle mixed required and optional boolean elements", () => {
            type Input = [string, true, boolean, number?, false?];

            // Default: removes both required and optional booleans
            type ResultDefault = RemoveBoolean<Input>;
            // O=false: removes only required booleans, preserves optional
            type ResultPreserve = RemoveBoolean<Input, false>;

            type cases = [
                Expect<AssertEqual<ResultDefault, [string, number?]>>,
                Expect<AssertEqual<ResultPreserve, [string, number?, false?]>>,
            ];
        });

        it("should handle tuples with only optional boolean elements", () => {
            type Input = [true?, false?, boolean?];

            type ResultDefault = RemoveBoolean<Input>;
            type ResultPreserve = RemoveBoolean<Input, false>;

            type cases = [
                Expect<AssertEqual<ResultDefault, []>>,
                Expect<AssertEqual<ResultPreserve, [true?, false?, boolean?]>>,
            ];
        });

        it("should handle complex types in optional positions", () => {
            type Input = [{ id: number }, number, true?, string[]?, false?];

            type ResultDefault = RemoveBoolean<Input>;
            type ResultPreserve = RemoveBoolean<Input, false>;

            type cases = [
                Expect<AssertEqual<ResultDefault, [{ id: number }, number, string[]?]>>,
                Expect<AssertEqual<ResultPreserve, [
                    { id: number}, number, true?, string[]?, false?
                ]>>,
            ];
        });
    });
});
