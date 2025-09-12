import { describe, it } from "vitest";
import type { Expect, HasTypedFunctionKeys, Test, TypedFunction } from "inferred-types/types";

describe("HasTypedFunctionKeys<T, K>", () => {

    it("happy path - all specified keys are typed functions", () => {
        type TestObj = {
            fn1: TypedFunction<[string], string>;
            fn2: TypedFunction<[number, boolean], void>;
            fn3: TypedFunction;
            notFn: string;
        };

        type cases = [
            // Single key that is a typed function
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1"]>, "equals", true>>,
            // Multiple keys that are all typed functions
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "fn2"]>, "equals", true>>,
            // All typed function keys
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "fn2", "fn3"]>, "equals", true>>,
            // Empty array returns true
            Expect<Test<HasTypedFunctionKeys<TestObj, []>, "equals", true>>,
        ];
    });

    it("failure cases - some keys are not functions", () => {
        type TestObj = {
            fn1: TypedFunction<[string], string>;
            fn2: TypedFunction<[number], number>;
            str: string;
            num: number;
            obj: { a: string };
            regularFn: (x: string) => void;
        };

        type cases = [
            // Single key that is not a function
            Expect<Test<HasTypedFunctionKeys<TestObj, ["str"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["num"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["obj"]>, "equals", false>>,
            // Regular function IS a TypedFunction (since TypedFunction is just a function type wrapper)
            Expect<Test<HasTypedFunctionKeys<TestObj, ["regularFn"]>, "equals", true>>,
            // Mix of functions and non-functions
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "str"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "fn2", "num"]>, "equals", false>>,
            // First key is not a function
            Expect<Test<HasTypedFunctionKeys<TestObj, ["str", "fn1"]>, "equals", false>>,
        ];
    });

    it("failure cases - keys don't exist in object", () => {
        type TestObj = {
            fn1: TypedFunction;
            fn2: TypedFunction<[string], boolean>;
            other: string;
        };

        type cases = [
            // Single non-existent key
            Expect<Test<HasTypedFunctionKeys<TestObj, ["nonExistent"]>, "equals", false>>,
            // Mix of existing typed function and non-existent key
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "nonExistent"]>, "equals", false>>,
            // Non-existent key comes first
            Expect<Test<HasTypedFunctionKeys<TestObj, ["nonExistent", "fn1"]>, "equals", false>>,
        ];
    });

    it("edge cases with different object types", () => {
        // Empty object
        type EmptyObj = {};
        // Object with only typed functions
        type OnlyTypedFunctions = {
            a: TypedFunction;
            b: TypedFunction<[string], string>;
            c: TypedFunction<[number, boolean], void>;
        };
        // Object with no functions (regular functions ARE TypedFunctions)
        type NoFunctions = {
            a: string;
            b: number;
            c: boolean;
            d: { x: number };
        };

        type cases = [
            // Empty object with empty keys
            Expect<Test<HasTypedFunctionKeys<EmptyObj, []>, "equals", true>>,
            // Empty object with any key
            Expect<Test<HasTypedFunctionKeys<EmptyObj, ["anyKey"]>, "equals", false>>,
            // Object with only typed functions - all keys
            Expect<Test<HasTypedFunctionKeys<OnlyTypedFunctions, ["a", "b", "c"]>, "equals", true>>,
            // Object with no functions - any key
            Expect<Test<HasTypedFunctionKeys<NoFunctions, ["a"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<NoFunctions, ["b"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<NoFunctions, ["c"]>, "equals", false>>,
        ];
    });

    it("works with readonly arrays and const assertions", () => {
        type TestObj = {
            fn1: TypedFunction<[string], string>;
            fn2: TypedFunction;
            notFn: number;
        };

        const keys1 = ["fn1", "fn2"] as const;
        const keys2 = ["fn1", "notFn"] as const;
        const keys3 = ["fn1"] as const;

        type cases = [
            // Const assertions work correctly
            Expect<Test<HasTypedFunctionKeys<TestObj, typeof keys1>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, typeof keys2>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, typeof keys3>, "equals", true>>,
            // Direct readonly arrays
            Expect<Test<HasTypedFunctionKeys<TestObj, readonly ["fn1", "fn2"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, readonly ["fn1", "notFn"]>, "equals", false>>,
        ];
    });

    it("works with complex typed function signatures", () => {
        type ComplexObj = {
            simple: TypedFunction;
            withParams: TypedFunction<[string, number], boolean>;
            withOptional: TypedFunction<[string, number?], string>;
            withRest: TypedFunction<[string, ...number[]], void>;
            withGenerics: TypedFunction<[input: unknown], unknown>;
            nested: {
                fn: TypedFunction;
            };
            regularFn: (x: string) => number;
        };

        type cases = [
            // Various typed function signatures all work
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["simple"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["withParams"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["withOptional"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["withRest"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["withGenerics"]>, "equals", true>>,
            // All typed functions together
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["simple", "withParams", "withOptional", "withRest", "withGenerics"]>, "equals", true>>,
            // Nested object property is not a function
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["nested"]>, "equals", false>>,
            // Regular function IS a TypedFunction (since TypedFunction is just a function type)
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["regularFn"]>, "equals", true>>,
            // Mix including regular function
            Expect<Test<HasTypedFunctionKeys<ComplexObj, ["simple", "regularFn"]>, "equals", true>>,
        ];
    });

    it("order of keys matters for failure detection", () => {
        type TestObj = {
            fn1: TypedFunction;
            fn2: TypedFunction;
            str: string;
            num: number;
        };

        type cases = [
            // Fails as soon as a non-typed function is found
            Expect<Test<HasTypedFunctionKeys<TestObj, ["str", "fn1", "fn2"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "str", "fn2"]>, "equals", false>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "fn2", "str"]>, "equals", false>>,
            // All typed functions pass regardless of order
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn1", "fn2"]>, "equals", true>>,
            Expect<Test<HasTypedFunctionKeys<TestObj, ["fn2", "fn1"]>, "equals", true>>,
        ];
    });

});
