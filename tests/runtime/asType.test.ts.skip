import { asType } from "inferred-types/runtime";
import { Contains, Expect, Test, TypedFunction } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("asType(token)", () => {

    it("wide types", () => {
        const str = asType("string");
        const num = asType("number");
        const undef = asType("undefined");

        type cases = [
            Expect<Test<typeof str, "equals", string>>,
            Expect<Test<typeof num, "equals", number>>,
            Expect<Test<typeof undef, "equals", undefined>>,
        ];
    });

    it("union of wide types", () => {
        const strNum = asType("string | number ");
        const optStr = asType("string | undefined");

        expect(strNum).toEqual("string | number")

        type cases = [
            Expect<Test<typeof strNum, "equals", string | number>>,
            Expect<Test<typeof optStr, "equals", string | undefined>>,
        ];
    });


    it("union of mixed wide and narrow", () => {
        const strNum = asType("String(foo) | number");
        const optStr = asType("String(bar) | undefined");

        type cases = [
            Expect<Test<typeof strNum, "equals", "foo" | number>>,
            Expect<Test<typeof optStr, "equals", "bar" | undefined>>,
        ];
    });

    it("string literals (including template literals)", () => {
        const fooBar = asType("String(foo) | String(bar)");
        const starting = asType("String(foo_{{string}})");
        const multi = asType("String({{number}} x {{number}})")

        type cases = [
            Expect<Test<typeof fooBar, "equals", "foo" | "bar">>,
            Expect<Test<typeof starting, "equals", `foo_${string}`>>,
            Expect<Test<typeof multi, "equals", `${number} x ${number}`>>,
        ];
    });


    it("all literal types", () => {
        const all = asType("Number(1) | Number(2) | Boolean(false)")

        type cases = [
            Expect<Test<typeof all, "equals", 1 | 2 | false>>
        ];
    });


    it("object definition", () => {
        const fooBar = asType({ foo: "string", bar: "number" });

        const fuzzy = asType({
            foo: "string | undefined",
            bar: "Array<boolean> | Boolean(false)"
        });

        const propError = asType({
            foo: "number",
            bar: "Array<number"
        });


        type cases = [
            Expect<Test<typeof fooBar, "equals", { foo: string; bar: number }>>,
            Expect<Test<
                typeof fuzzy, "equals",
                { foo: string | undefined; bar: false | boolean[] }
            >>,
            Expect<Test<typeof propError, "extends", Error>>
        ];
    });

    it("array definition", () => {
        const strArr = asType("Array<string>");
        const fnArr = asType("Array<function>");
        const objArr = asType("Array<object>");
        const fooArr = asType("Array<String(foo)>");
        const unionArr = asType("Array<string | number>");
        const unionArr2 = asType("Array<string | undefined>");
        const unionArr3 = asType("Array<String(foo) | String(bar)>");

        type cases = [
            Expect<Test<typeof strArr, "equals", string[]>>,
            Expect<Test<typeof fnArr, "equals", ((...args: any[]) => any)[]>>,
            Expect<Test<typeof objArr, "equals", object[]>>,
            Expect<Test<typeof fooArr, "equals", "foo"[]>>,
            Expect<Test<typeof unionArr, "equals", (string | number)[]>>,
            Expect<Test<typeof unionArr2, "equals", (string | undefined)[]>>,
            Expect<Test<typeof unionArr3, "equals", ("foo" | "bar")[]>>,
        ]
    });


    it("tuple definition using inline variant", () => {
        const tup = asType("String(foo)", "Array<String(bar)>");

        type cases = [
            Expect<Test<typeof tup, "equals", ["foo", "bar"[]]>>
        ];
    });


    it("Record<K,V>", () => {
        const obj = asType("Record<string, function>");
        const union = asType("Record<string, Object> | Record<string, number>")

        type cases = [
            Expect<Test<
                typeof obj, "equals",
                Record<string, TypedFunction>
            >>,
            Expect<Test<typeof union, "equals",
                Record<string, object> | Record<string, number>
            >>
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
            Expect<Test<typeof union, "equals", Map<string | number,  string[]>>>,
        ];
    });

});
