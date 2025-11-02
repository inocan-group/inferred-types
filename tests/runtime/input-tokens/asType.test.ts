import { describe, it } from 'vitest';
import type {
    AssertContains,
    Expect,
    Test
} from "inferred-types/types"
import {asType} from "inferred-types/runtime";

describe("asType(token)", () => {

    it("object definition", () => {
        const fooBar = asType({ foo: "string", bar: "number" });

        const fuzzy = asType({
            foo: "string | undefined",
            bar: "Array<boolean> | false"
        });

        const propError = asType({
            foo: "number",
            bar: "Array<number"
        });

        type cases = [
            Expect<Test<
                typeof fooBar, "equals",
                { foo: string; bar: number }
            >>,
            Expect<Test<
                typeof fuzzy, "equals",
                { foo: string | undefined; bar: false | boolean[] }
            >>,

            Expect<Test<
                typeof propError, "extends",
                Error
            >>,
            Expect<AssertContains<typeof propError["keys"], "bar">>
        ];
    });

    it("array definition", () => {
        const strArr = asType("Array<string>");
        const fnArr = asType("Array<() => string>");
        const objArr = asType("Array<object>");
        const boolArr = asType("Array<boolean>");
        const fooArr = asType("Array<String(foo)>");
        const unionArr = asType("Array<string | number>");
        const unionArr2 = asType("Array<string | undefined>");
        const unionArr3 = asType("Array<String(foo) | String(bar)>");

        type cases = [
            Expect<Test<typeof strArr, "equals", string[]>>,
            Expect<Test<typeof fnArr, "equals", (() => string)[]>>,
            Expect<Test<typeof objArr, "equals", object[]>>,
            Expect<Test<typeof boolArr, "equals", boolean[]>>,
            Expect<Test<typeof fooArr, "equals", "foo"[]>>,
            Expect<Test<typeof unionArr, "equals", (string | number)[]>>,
            Expect<Test<typeof unionArr2, "equals", (string | undefined)[]>>,
            Expect<Test<typeof unionArr3, "equals", ("foo" | "bar")[]>>,
        ]
    });


    it("array union definition", () => {
        const bool = asType("true | Array<boolean>");
        const bool2 = asType("Array<boolean> | true");

        const mixed = asType("String(foo) | String(bar) | Array<string>")
        const mixed2 = asType("Array<string> | String(foo) | String(bar)")

        type cases = [
            Expect<Test<typeof bool, "equals", true | boolean[]>>,
            Expect<Test<typeof bool2, "equals", true | boolean[]>>,

            Expect<Test<typeof mixed, "equals", "foo" | "bar" | string[]>>,
            Expect<Test<typeof mixed2, "equals", "foo" | "bar" | string[]>>,
        ];
    });



    it("destructured tuple definition", () => {
        const tup = asType("String(foo)", "Array<String(bar)>");
        const tup2 = asType("Number(1)", "Number(2)", "Number(3)");
        const tup3 = asType("Number(1) | Number(2)", "Number(3) | Number(4)");
        const tupObj = asType("string", {
            foo: "number",
            bar: "Number(1) | Number(2)"
        });

        type cases = [
            Expect<Test<typeof tup, "equals", ["foo", "bar"[]]>>,
            Expect<Test<typeof tup2, "equals", [1, 2, 3]>>,
            Expect<Test<typeof tup3, "equals", [1 | 2, 3 | 4]>>,
            Expect<Test<
                typeof tupObj,
                "equals",
                [string, {
                    foo: number;
                    bar: 1 | 2;
                }]
            >>
        ];
    });

    it("invalid tuple definition attempt", () => {
        const inv1 = asType(["String(foo)", "String(bar)"]);
        type E = typeof inv1;

        type cases = [
            Expect<Test<E, "isError", "invalid-token/tuple">>,
        ];
    });


    it("Record<K,V>", () => {
        const obj = asType("Record<string, () => string>");
        const obj2 = asType("Record<string,   number>");
        const union = asType("Record<string, Object> | Record<string, number>")

        type cases = [
            Expect<Test<
                typeof obj, "equals",
                Record<string, (...args: any[]) => any>
            >>,
            Expect<Test<
                typeof obj2, "equals",
                Record<string, number>
                >>,
            Expect<Test<
                typeof union,
                "equals",
                Record<string, object> | Record<string, number>
            >>
        ];
    });


    it("Record<K,V> errors", () => {
        const badVal = asType("Record<string, juju>")

        type cases = [
            /** type tests */
        ];
    });


    it("Set definition", () => {
        const str = asType("Set<string>");
        const num = asType("Set<number>");
        const union = asType("Set<string | number>");

        type cases = [
            Expect<Test<typeof str, "equals", Set<string>>>,
            Expect<Test<typeof num, "equals", Set<number>>>,
            Expect<Test<typeof union, "equals", Set<string | number>>>,
        ];
    });

    it("Map definition", () => {
        const str = asType("Map<string,string>");
        const num = asType("Map<number, object>");
        const union = asType("Map<string | number, Array<string>>");

        type cases = [
            Expect<Test<typeof str, "equals", Map<string, string>>>,
            Expect<Test<typeof num, "equals", Map<number, object>>>,
            Expect<Test<typeof union, "equals", Map<string | number, string[]>>>,
        ];
    });

    it("WeakMap definition", () => {
        const str = asType("WeakMap<Record<string,string>, string>");
        const num = asType("WeakMap<object, number>");
        const union = asType("WeakMap<string | number, Array<string>>");

        type cases = [
            Expect<Test<
                typeof str, "equals",
                WeakMap<Record<string,string>, string>
            >>,
            Expect<Test<typeof num, "equals", WeakMap<object, number>>>,
            Expect<Test<
                typeof union, "isError",
                "malformed-token/weakmap"
            >>,
        ];
    });

})
