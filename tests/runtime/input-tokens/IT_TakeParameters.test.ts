import { describe, it } from "vitest";
import type { Expect, IT_TakeParameters, Test } from "inferred-types/types";

describe("IT_TakeParameters<T>", () => {

    it("no generics", () => {
        type T1 = IT_TakeParameters<"(name: string) => string">; // =>

        type Expected = {
            parameters: [{
                name: "name";
                token: "string";
                fromGeneric: false;
                type: string;
            }];
            generics: [];
            rest: "=> string";
        }

        type cases = [
            Expect<Test<T1, "equals", Expected>>,
        ];
    });

    it("with generics", () => {
        type T1 = IT_TakeParameters<"<T extends string>(name: T) => string">;
        type T2 = IT_TakeParameters<"<T extends string, V>(name: T, value: V) => string">;
        type T3 = IT_TakeParameters<"<A extends number, B extends number>(a: A, b: B): number">;

        type T1_Expected = {
                parameters: [{
                    name: "name";
                    token: "string";
                    fromGeneric: "T";
                    type: string;
                }],
                generics: [{ name: "T"; token: "string"; type: string }]
                rest: "=> string"
            }

        type T2_Expected = {
            parameters: [{
                name: "name";
                token: "string";
                fromGeneric: "T";
                type: string;
            }, {
                name: "value";
                token: "unknown";
                fromGeneric: "V";
                type: unknown;
            }];
            generics: [
                {name: "T"; token: "string"; type: string },
                {name: "V"; token: "unknown"; type: unknown }
            ]
            rest: "=> string"
        }

        type T3_Expected = {
            parameters: [{
                name: "a";
                token: "number";
                fromGeneric: "A";
                type: number;
            }, {
                name: "b";
                token: "number";
                fromGeneric: "B";
                type: number;
            }];
            generics: [{
                name: "A";
                token: "number";
                type: number;
            }, {
                name: "B";
                token: "number";
                type: number;
            }];
            rest: ": number";
        }

        type cases = [
            Expect<Test<T1, "equals", T1_Expected>>,
            Expect<Test<T2, "equals", T2_Expected>>,
            Expect<Test<T3, "equals", T3_Expected>>,
        ];
    });

    it("generics inside containers and postfix arrays", () => {
        // Array<T>
        type A = IT_TakeParameters<"<T extends string>(vals: Array<T>) => void">;
        // T[]
        type A2 = IT_TakeParameters<"<T extends number>(vals: T[]) => void">;
        // T[][]
        type A3 = IT_TakeParameters<"<T extends number>(grid: T[][]) => void">;
        // Set<T>
        type S = IT_TakeParameters<"<T extends string>(s: Set<T>) => void">;
        // Promise<T>
        type P = IT_TakeParameters<"<T extends string>(p: Promise<T>) => void">;
        // Map<K,V>
        type M = IT_TakeParameters<"<K extends string, V extends number>(m: Map<K, V>) => void">;
        // WeakMap<K,V>
        type W = IT_TakeParameters<"<K extends object, V extends string>(wm: WeakMap<K, V>) => void">;
        // Record<K,V>
        type R = IT_TakeParameters<"<K extends string, V extends boolean>(r: Record<K, V>) => void">;

        type cases = [
            // Array<T>
            Expect<Test<A["parameters"][0]["type"], "equals", string[]>>,
            // T[] and T[][]
            Expect<Test<A2["parameters"][0]["type"], "equals", number[]>>,
            Expect<Test<A3["parameters"][0]["type"], "equals", number[][]>>,
            // Set<T>
            Expect<Test<S["parameters"][0]["type"], "equals", Set<string>>> ,
            // Promise<T>
            Expect<Test<P["parameters"][0]["type"], "equals", Promise<string>>> ,
            // Map<K,V>
            Expect<Test<M["parameters"][0]["type"], "equals", Map<string, number>>> ,
            // WeakMap<K,V>
            Expect<Test<W["parameters"][0]["type"], "equals", WeakMap<object, string>>> ,
            // Record<K,V>
            Expect<Test<R["parameters"][0]["type"], "equals", Record<string, boolean>>> ,
        ];
    });

});
