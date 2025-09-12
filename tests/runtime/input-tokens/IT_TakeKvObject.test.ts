import { describe, it } from "vitest";
import type { Expect, IT_TakeKvObjects, IT_Token, Test } from "inferred-types/types";

describe("IT_TakeKvObject<T>", () => {

    describe("record", () => {

        it("Record definition with wide key", () => {
            type Str = IT_TakeKvObjects<"Record<string, string>">;
            type Num = IT_TakeKvObjects<"Record<string, number>">;
            type Union = IT_TakeKvObjects<"Record<string, 'foo' | 'bar' >">;
            type OFn = IT_TakeKvObjects<"Record<string, () => string>">;

            type cases = [
                Expect<Test<Str, "extends", IT_Token<"kv">>>,
                Expect<Test<Num, "extends", IT_Token<"kv">>>,
                Expect<Test<Union, "extends", IT_Token<"kv">>>,
                Expect<Test<OFn, "extends", IT_Token<"kv">>>,

                Expect<Test<Str["type"], "equals", Record<string,string>>>,
                Expect<Test<Num["type"], "equals", Record<string,number>>>,
                Expect<Test<Union["type"], "equals", Record<string, "foo" | "bar">>>,
                Expect<Test<OFn["type"], "equals", Record<string, () => string>>>,
            ];
        });

        it("Record definition with literal keys", () => {
            type FooBar = IT_TakeKvObjects<"Record<'foo' | 'bar', string>">;

            type cases = [
                Expect<Test<FooBar, "extends", IT_Token<'kv'>>>,
                Expect<Test<FooBar["type"], "equals", Record<"foo" | "bar",string>>>,
            ];
        });

        it("Record with symbol keys (not supported)", () => {
            type Sym = IT_TakeKvObjects<"Record<symbol, string>">;

            type cases = [
                Expect<Test<Sym, "isError", "malformed-token">>,
            ];
        });

        it("Record invalid key -> error", () => {
            type E1 = IT_TakeKvObjects<"Record<number, string>">;

            type cases = [
                Expect<Test<E1, "isError", "malformed-token">>,
            ];
        });

    });

    describe("Object Literal", () => {

        it("simple dict with scalar values", () => {
            type T1 = IT_TakeKvObjects<"{ foo: 1, bar: 2 }">;

            type cases = [
                /** type tests */
            ];
        });
    })

    describe("Map", () => {

        it("happy path", () => {
            type T1 = IT_TakeKvObjects<"Map<string,string>">;
            type T2 = IT_TakeKvObjects<"Map<string,number>">;
            type T3 = IT_TakeKvObjects<"Map<string, 1 | 2 | 3>">;

            type cases = [
                Expect<Test<T1, "extends", IT_Token<"kv">>>,
                Expect<Test<T2, "extends", IT_Token<"kv">>>,
                Expect<Test<T3, "extends", IT_Token<"kv">>>,

                Expect<Test<T1["type"], "equals", Map<string,string>>>,
                Expect<Test<T2["type"], "equals", Map<string,number>>>,
                Expect<Test<T3["type"], "equals", Map<string,1 | 2 | 3>>>,
            ];
        });

        it("additional key/value types", () => {
            type NBool = IT_TakeKvObjects<"Map<number, boolean>">;
            type ObjStr = IT_TakeKvObjects<"Map<object, string>">;
            type NestedVal = IT_TakeKvObjects<"Map<string, Map<string, number>>">;
            type NestedKey = IT_TakeKvObjects<"Map<Map<string, number>, string>">;

            type cases = [
                Expect<Test<NBool, "extends", IT_Token<'kv'>>>,
                Expect<Test<ObjStr, "extends", IT_Token<'kv'>>>,
                Expect<Test<NestedVal, "extends", IT_Token<'kv'>>>,
                Expect<Test<NestedKey, "extends", IT_Token<'kv'>>>,

                Expect<Test<NBool["type"], "equals", Map<number, boolean>>>,
                Expect<Test<ObjStr["type"], "equals", Map<object, string>>>,
                Expect<Test<NestedVal["type"], "equals", Map<string, Map<string, number>>>>,
                Expect<Test<NestedKey["type"], "equals", Map<Map<string, number>, string>>>,
            ];
        });

        it("metadata fields", () => {
            type NB = IT_TakeKvObjects<"Map<number, boolean>">;
            type cases = [
                Expect<Test<NB["container"], "equals", "Map">>,
                Expect<Test<NB["keyToken"], "equals", "number">>,
                Expect<Test<NB["valueToken"], "equals", "boolean">>,
            ];
        });

    });

    describe("WeakMap", () => {
        it("happy path", () => {
            type T1 = IT_TakeKvObjects<"WeakMap<object,string>">;
            type T2 = IT_TakeKvObjects<"WeakMap<object,number>">;
            type T3 = IT_TakeKvObjects<"WeakMap<object, 1 | 2 | 3>">;

            type cases = [
                Expect<Test<T1, "extends", IT_Token<"kv">>>,
                Expect<Test<T2, "extends", IT_Token<"kv">>>,
                Expect<Test<T3, "extends", IT_Token<"kv">>>,

                Expect<Test<T1["type"], "equals", WeakMap<object,string>>>,
                Expect<Test<T2["type"], "equals", WeakMap<object,number>>>,
                Expect<Test<T3["type"], "equals", WeakMap<object,1 | 2 | 3>>>,
            ];
        });

        it("invalid key -> error", () => {
            type E1 = IT_TakeKvObjects<"WeakMap<string, number>">;

            type cases = [
                Expect<Test<E1, "isError", "malformed-token">>,
            ];
        });

        it("object-like key types", () => {
            type KM = IT_TakeKvObjects<"WeakMap<Map<string, number>, string>">;
            type cases = [
                Expect<Test<KM, "extends", IT_Token<'kv'>>>,
                Expect<Test<KM["type"], "equals", WeakMap<Map<string, number>, string>>>,
            ];
        });
    });

});
