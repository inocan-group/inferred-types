import { describe, expect, it } from "vitest";
import { asType } from "inferred-types/runtime";
import type {
    Expect,
    FromInputToken__String,
    FromInputToken__Tuple,
    Contains,
    Test,
    Err
} from "inferred-types/types";


describe("FromInputToken<Token>", () => {
    it("atomic", () => {
        type Str = FromInputToken__String<"string">;
        type Null = FromInputToken__String<"null">;
        type Nada = FromInputToken__String<"undefined">;

        type cases = [
            Expect<Test<Str, "equals", string>>,
            Expect<Test<Null, "equals", null>>,
            Expect<Test<Nada, "equals", undefined>>,
        ];
    });

    it("literals", () => {
        type Str = FromInputToken__String<"String(foo)">;
        type Whitespace = FromInputToken__String<"  String(foo) \n">;
        type Num = FromInputToken__String<"Number(42)">;

        type cases = [
            Expect<Test<Str, "equals", "foo">>,
            Expect<Test<Whitespace, "equals", "foo">>,
            Expect<Test<Num, "equals", 42>>,
        ];
    });

    it("records", () => {
        type T1 = FromInputToken__String<"Record<string, string>">;
        type T2 = FromInputToken__String<"Record<string, number>">;
        type T3 = FromInputToken__String<"Record<string, string | number>">;

        type cases = [
            Expect<Test<T1, "equals", Record<string,  string>>>,
            Expect<Test<T2, "equals", Record<string,  number>>>,
            Expect<Test<T3, "equals", Record<string,  string | number>>>,
        ]
    });


    it("unions", () => {
        type U = FromInputToken__String<"number | String(bar)">;
        type U2 = FromInputToken__String<"String(bar) | number">;
        type U3 = FromInputToken__String<"String(bar) | Number(42)  ">;
        type U4 = FromInputToken__String<"  String(bar) | boolean">;

        type cases = [
            Expect<Test<U, "equals", number | "bar">>,
            Expect<Test<U2, "equals", "bar" | number>>,
            Expect<Test<U3, "equals", "bar" | 42>>,
            Expect<Test<U4, "equals", "bar" | boolean>>,
        ];
    });

    it("tuple", () => {
        type T = FromInputToken__Tuple<["number", "string", "true | Object"]>

        type cases = [
            Expect<Test<T, "equals", [number, string, true | object]>>
        ];
    });

});

describe("asType(token)", () => {

    it("atomic types", () => {
        const str = asType("string");
        const num = asType("number");
        const undef = asType("undefined");
        const yes = asType("true");
        const bool = asType("boolean");

        type cases = [
            Expect<Test<typeof str, "equals", string>>,
            Expect<Test<typeof num, "equals", number>>,
            Expect<Test<typeof undef, "equals", undefined>>,
            Expect<Test<typeof yes, "equals", true>>,
            Expect<Test<typeof bool, "equals", boolean>>,
        ];
    });

    it("atomic types with whitespace", () => {
        const str = asType("string    ");
        const num = asType("    number");
        const undef = asType(" undefined  ");

        type cases = [
            Expect<Test<typeof str, "equals", string>>,
            Expect<Test<typeof num, "equals", number>>,
            Expect<Test<typeof undef, "equals", undefined>>,
        ];
    });

    it("literal types", () => {
        const foo = asType("String(foo)");
        const num = asType("Number(42)");
        const yes = asType("Boolean(true)");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof num, "equals", 42>>,
            Expect<Test<typeof yes, "equals", true>>,
        ];
    });

    it("literal types with whitespace", () => {
        const foo = asType("  String(foo)");
        const num = asType("Number(42)   ");
        const yes = asType("   Boolean(true)   \n\t");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof num, "equals", 42>>,
            Expect<Test<typeof yes, "equals", true>>,
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
        const strNum1 = asType("String(foo) | number");
        const strNum2 = asType("number | String(foo)");
        const optStr = asType("String(bar) | undefined");

        type cases = [
            Expect<Test<typeof strNum1, "equals", "foo" | number>>,
            Expect<Test<typeof strNum2, "equals", "foo" | number>>,
            Expect<Test<typeof optStr, "equals", "bar" | undefined>>,
        ];
    });

    it("string literals (including template literals)", () => {
        const fooBar = asType("String(foo) | String(bar)");
        const foo42 = asType("String(foo) | Number(42)");
        const starting = asType("String(foo_{{string}})");
        const multi = asType("String({{number}} x {{number}})")

        type cases = [
            Expect<Test<typeof fooBar, "equals", "foo" | "bar">>,
            Expect<Test<typeof foo42, "equals", "foo" | 42>>,
            Expect<Test<typeof starting, "equals", `foo_${string}`>>,
            Expect<Test<typeof multi, "equals", `${number} x ${number}`>>,
        ];
    });


    it("different literal types", () => {
        const all = asType("Number(1) | Number(2) | Boolean(false)")

        type cases = [
            Expect<Test<typeof all, "equals", 1 | 2 | false>>
        ];
    });

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
            Expect<Contains<typeof propError["keys"], "bar">>
        ];
    });

    it("array definition", () => {
        const strArr = asType("Array<string>");
        const fnArr = asType("Array<function>");
        const objArr = asType("Array<object>");
        const boolArr = asType("Array<boolean>");
        const fooArr = asType("Array<String(foo)>");
        const unionArr = asType("Array<string | number>");
        const unionArr2 = asType("Array<string | undefined>");
        const unionArr3 = asType("Array<String(foo) | String(bar)>");

        type cases = [
            Expect<Test<typeof strArr, "equals", string[]>>,
            Expect<Test<typeof fnArr, "equals", ((...args: any[]) => any)[]>>,
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



    it("tuple definition", () => {
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
            Expect<Test<E["type"], "equals", "invalid-token">>,
            Expect<Test<E["subType"], "equals", "tuple">>,
        ];
    });


    it("Record<K,V>", () => {
        const obj = asType("Record<string, function>");
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
                typeof union, "extends",
                Err<"invalid-token/weakmap">
            >>,
        ];
    });

})
