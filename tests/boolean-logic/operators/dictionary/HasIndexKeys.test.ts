import { describe, it } from "vitest";
import type { Expect, HasIndexKeys, Test } from "inferred-types/types";

describe("HasIndexKeys<T>", () => {

    it("happy path", () => {
        type T1 = HasIndexKeys<{foo: 1; [x: symbol]: number}>;
        type T2 = HasIndexKeys<{foo: 1; [x: string]: number}>;
        type T3 = HasIndexKeys<{[x: symbol]: number}>;
        type T4 = HasIndexKeys<{[x: string]: number}>;
        type T5 = HasIndexKeys<{foo:1; bar: "hi"; [x: number]: string}>;

        type F1 = HasIndexKeys<{foo: 1}>;
        type F2 = HasIndexKeys<{foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<T1, "equals" , true>>,
            Expect<Test<T2, "equals" , true>>,
            Expect<Test<T3, "equals" , true>>,
            Expect<Test<T4, "equals" , true>>,
            Expect<Test<T5, "equals" , true>>,

            Expect<Test<F1, "equals" , false>>,
            Expect<Test<F2, "equals" , false>>,

        ];
    });

    it("template literal indexes", () => {
        type T1 = HasIndexKeys<{foo: 1; [key: `_${string}`]: string }>;
        type T2 = HasIndexKeys<{[key: `id-${number}`]: string}>;
        type T3 = HasIndexKeys<{[key: `${string}-suffix`]: boolean}>;
        type T4 = HasIndexKeys<{[key: `prefix-${string}-suffix`]: object}>;
        
        // Mixed with other index types
        type T5 = HasIndexKeys<{foo: 1; [key: string]: any; [key: `_${string}`]: number}>;
        
        // Without template literals
        type F1 = HasIndexKeys<{foo: 1; bar: 2}>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,
            Expect<Test<F1, "equals", false>>,
        ];
    });

    it("complex template literal patterns", () => {
        type T1 = HasIndexKeys<{[key: `${string}_${string}`]: string}>;
        type T2 = HasIndexKeys<{[key: `${string}:${string}:${string}`]: any}>;
        type T3 = HasIndexKeys<{[key: `route/${string}`]: Function}>;
        type T4 = HasIndexKeys<{[key: `api-${number}-v${number}`]: object}>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
        ];
    });

    it("mixed index signature combinations", () => {
        type StringAndNumber = HasIndexKeys<{
            [key: string]: any;
            [key: number]: any;
        }>;
        
        type AllTypes = HasIndexKeys<{
            foo: 1;
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
            [key: `_${string}`]: number;
        }>;
        
        type OnlyExplicit = HasIndexKeys<{
            foo: 1;
            bar: "test";
            baz: boolean;
        }>;

        type cases = [
            Expect<Test<StringAndNumber, "equals", true>>,
            Expect<Test<AllTypes, "equals", true>>,
            Expect<Test<OnlyExplicit, "equals", false>>,
        ];
    });

    it("edge cases", () => {
        type Empty = HasIndexKeys<{}>;
        type OnlyString = HasIndexKeys<{[key: string]: any}>;
        type OnlyNumber = HasIndexKeys<{[key: number]: any}>;
        type OnlySymbol = HasIndexKeys<{[key: symbol]: any}>;
        type OnlyTemplate = HasIndexKeys<{[key: `_${string}`]: any}>;

        type cases = [
            Expect<Test<Empty, "equals", false>>,
            Expect<Test<OnlyString, "equals", true>>,
            Expect<Test<OnlyNumber, "equals", true>>,
            Expect<Test<OnlySymbol, "equals", true>>,
            Expect<Test<OnlyTemplate, "equals", true>>,
        ];
    });

    it("intersection and union types", () => {
        type Intersection = HasIndexKeys<{foo: 1} & {[key: string]: any}>;
        type UnionWithIndex = HasIndexKeys<{foo: 1} | {[key: string]: any}>;
        type UnionNoIndex = HasIndexKeys<{foo: 1} | {bar: 2}>;
        
        type cases = [
            Expect<Test<Intersection, "equals", true>>,
            // Union types don't distribute - evaluates as single type with union keys
            Expect<Test<UnionWithIndex, "equals", false>>, 
            // Union where no branches have index signatures
            Expect<Test<UnionNoIndex, "equals", false>>,
        ];
    });

});
