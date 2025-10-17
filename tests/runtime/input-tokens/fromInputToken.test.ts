import { describe, expect, it } from "vitest";
import { asType, fromInputToken } from "inferred-types/runtime";
import type {
    Expect,
    FromInputToken__String,
    FromInputToken__Tuple,
    Contains,
    Test,
    AssertError,
    AssertContains,
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

describe("asInputToken()", () => {
     it("atomic types", () => {
        const str = fromInputToken("string");
        const num = fromInputToken("number");
        const undef = fromInputToken("undefined");
        const yes = fromInputToken("true");
        const bool = fromInputToken("boolean");

        type cases = [
            Expect<Test<typeof str, "equals", string>>,
            Expect<Test<typeof num, "equals", number>>,
            Expect<Test<typeof undef, "equals", undefined>>,
            Expect<Test<typeof yes, "equals", true>>,
            Expect<Test<typeof bool, "equals", boolean>>,
        ];
    });

    it("atomic types with whitespace", () => {
        const str = fromInputToken("string    ");
        const num = fromInputToken("    number");
        const undef = fromInputToken(" undefined  ");

        type cases = [
            Expect<Test<typeof str, "equals", string>>,
            Expect<Test<typeof num, "equals", number>>,
            Expect<Test<typeof undef, "equals", undefined>>,
        ];
    });

    it("literal types", () => {
        const foo = fromInputToken("String(foo)");
        const num = fromInputToken("Number(42)");
        const yes = fromInputToken("true");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof num, "equals", 42>>,
            Expect<Test<typeof yes, "equals", true>>,
        ];
    });

    it("literal types with whitespace", () => {
        const foo = fromInputToken("  String(foo)");
        const num = fromInputToken("Number(42)   ");
        const yes = fromInputToken("   true   \n\t");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof num, "equals", 42>>,
            Expect<Test<typeof yes, "equals", true>>,
        ];
    });

    it("union of wide types", () => {
        const strNum = fromInputToken("string | number ");
        const optStr = fromInputToken("string | undefined");

        expect(strNum).toEqual("string | number")

        type cases = [
            Expect<Test<typeof strNum, "equals", string | number>>,
            Expect<Test<typeof optStr, "equals", string | undefined>>,
        ];
    });


    it("union of mixed wide and narrow", () => {
        const strNum1 = fromInputToken("String(foo) | number");
        const strNum2 = fromInputToken("number | String(foo)");
        const optStr = fromInputToken("String(bar) | undefined");

        type cases = [
            Expect<Test<typeof strNum1, "equals", "foo" | number>>,
            Expect<Test<typeof strNum2, "equals", "foo" | number>>,
            Expect<Test<typeof optStr, "equals", "bar" | undefined>>,
        ];
    });

    it("string literals (including template literals)", () => {
        const fooBar = fromInputToken("String(foo) | String(bar)");
        const foo42 = fromInputToken("String(foo) | Number(42)");
        const starting = fromInputToken("String(foo_{{string}})");
        const multi = fromInputToken("String({{number}} x {{number}})")

        type cases = [
            Expect<Test<typeof fooBar, "equals", "foo" | "bar">>,
            Expect<Test<typeof foo42, "equals", "foo" | 42>>,
            Expect<Test<typeof starting, "equals", `foo_${string}`>>,
            Expect<Test<typeof multi, "equals", `${number} x ${number}`>>,
        ];
    });


    it("different literal types", () => {
        const all = fromInputToken("Number(1) | Number(2) | false")

        type cases = [
            Expect<Test<typeof all, "equals", 1 | 2 | false>>
        ];
    });

        it("object definition", () => {
        const fooBar = fromInputToken({ foo: "string", bar: "number" });

        const fuzzy = fromInputToken({
            foo: "string | undefined",
            bar: "Array<boolean> | false"
        });

        // TODO: the error is assigned to the property instead of being the whole type
        const propError = fromInputToken({
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

            Expect<AssertError<typeof propError>>
        ];
    });

})
