import { describe, it } from "vitest";
import type { Expect, HasVariadicParameters, Test } from "inferred-types/types";

describe("HasVariadicParameters<T>", () => {
    it("should return true for functions with variadic parameters that are not wide arrays", () => {
        // Function with rest parameters (variadic tail) - this should return true
        type T1 = HasVariadicParameters<(name: string, ...nickNames: string[]) => string>;
        // Function with only rest parameters (wide array) - this should return true
        type T3 = HasVariadicParameters<(...args: any[]) => void>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];


    });

    it("should return false for functions without variadic parameters or with wide arrays", () => {
        // Function with no parameters
        type T1 = HasVariadicParameters<() => string>;

        // Function with fixed parameters
        type T2 = HasVariadicParameters<(x: string, y: number) => boolean>;



        // Non-function types
        type T4 = HasVariadicParameters<string>;
        type T5 = HasVariadicParameters<number>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T4, "equals", false>>,
            Expect<Test<T5, "equals", false>>,
        ];
    });

    it("should handle edge cases correctly", () => {
        type T1 = HasVariadicParameters<any>;
        type T2 = HasVariadicParameters<unknown>;
        type T3 = HasVariadicParameters<never>;

        type cases = [
            Expect<Test<T1, "equals", boolean>>,
            Expect<Test<T2, "equals", boolean>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });
});
