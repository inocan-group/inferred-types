import { describe, expect, it } from "vitest";
import {
    isNull,
    createToken,
    isUndefined,
    isString,
    asUnion,
    isStringLiteral,
    createTokenSyntax,
    ifEmpty
} from "inferred-types/runtime";
import {
    Expect,
    DynamicToken,
    DynamicTokenApi,
    StaticToken,
    StaticTokenApi,
    Test,
    Token
} from "inferred-types/types"


describe("createToken(...)", () => {

    it("partial evaluation", () => {
        const t1 = createToken("null", "static");
        const t2 = createToken("string", "dynamic");
        const t3 = createToken("union", "dynamic");

        type T2 = ReturnType<typeof t2>

        type cases = [
            Expect<Test<typeof t1, "equals", StaticTokenApi<"null">>>,
            Expect<Test<typeof t2, "equals", DynamicTokenApi<"string">>>,
            Expect<Test<typeof t3, "equals", DynamicTokenApi<"union">>>,
        ];
    });

    it("static tokens", () => {
        const Null = createToken("null", "static")("null", isNull);
        const Undefined = createToken("undefined", "static")("undefined", isUndefined);

        expect(typeof Null.typeGuard).toBe("function");
        expect(Null.typeGuard(null)).toBe(true);
        expect(Null.typeGuard(undefined)).toBe(false);

        type cases = [
            Expect<Test<typeof Null, "extends", StaticToken>>,
            Expect<Test<typeof Null, "extends", Token>>,
            Expect<Test<typeof Undefined, "extends", StaticToken>>,
            Expect<Test<typeof Undefined, "extends", Token>>,
        ]
    });

    const Str = createToken("string", "dynamic")(
        // resolver
        ({ sep }) => (...p) => {
            return ifEmpty(
                p,
                {
                    type: "string" as string,
                    typeGuard: isString
                },
                {
                    type: asUnion(p, sep, { prefix: `string${sep}` }),
                    typeGuard: isStringLiteral(...p)
                }
            )
        },
        // tokenizer
        <T extends readonly string[]>(...params: T) => params
    );

    const syn = createTokenSyntax("Test", "((", "))", "::");

    it("create dynamic token", () => {
        expect(Str.name).toBe("string")

        type cases = [
            Expect<Test<typeof Str, "extends", DynamicToken>>,
            Expect<Test<typeof Str, "extends", Token>>,
            Expect<Test<typeof Str["name"], "equals", "string">>
        ];
    });

    it("dynamic token -> resolver", () => {
        const base = Str.resolver(syn)();
        const variant = Str.resolver(syn)("foo", "bar", "baz");
        const baseTg = Str.resolver(syn)().typeGuard;
        const variantTg = Str.resolver(syn)("foo", "bar", "baz").typeGuard;

        expect(base.type).toBe("string");
        expect(variant.type).toBe("string::foo::bar::baz");

        expect(baseTg("bax")).toBe(true);
        expect(variantTg("bax"), String(variantTg)).toBe(false);

        type cases = [
            Expect<Test<typeof base["type"], "equals", string>>,
            Expect<Test<typeof variant["type"], "equals", "foo" | "bar" | "baz">>,
        ];
    });

    it("dynamic token -> tokenizer", () => {
        const tokenizer = Str.tokenizer("foo", "bar", "baz");

        expect(tokenizer).toEqual(["foo", "bar", "baz"])

        type cases = [
            Expect<Test<typeof tokenizer, ["foo", "bar", "equals", "baz"]>>,
        ];
    });

});
