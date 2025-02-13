import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
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
  DynamicToken,
  DynamicTokenApi,
  StaticToken,
  StaticTokenApi,
  Token
} from "inferred-types/types"


describe("createToken(...)", () => {

  it("partial evaluation", () => {
    const t1 = createToken("null", "static");
    const t2 = createToken("string", "dynamic");
    const t3 = createToken("union", "dynamic");

    type T2 = ReturnType<typeof t2>

    type cases = [
      Expect<Equal<typeof t1, StaticTokenApi<"null">>>,
      Expect<Equal<typeof t2, DynamicTokenApi<"string">>>,
      Expect<Equal<typeof t3, DynamicTokenApi<"union">>>,
    ];
  });

  it("static tokens", () => {
    const Null = createToken("null", "static")("null", isNull);
    const Undefined = createToken("undefined", "static")("undefined", isUndefined);

    expect(typeof Null.typeGuard).toBe("function");
    expect(Null.typeGuard(null)).toBe(true);
    expect(Null.typeGuard(undefined)).toBe(false);

    type cases = [
      ExpectTrue<typeof Null extends StaticToken ? true : false>,
      ExpectTrue<typeof Null extends Token ? true : false>,
      ExpectTrue<typeof Undefined extends StaticToken ? true : false>,
      ExpectTrue<typeof Undefined extends Token ? true : false>,
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
      ExpectTrue<typeof Str extends DynamicToken ? true : false>,
      ExpectTrue<typeof Str extends Token ? true : false>,
      Expect<Equal<typeof Str["name"], "string">>
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
      Expect<Equal<typeof base["type"], string>>,
      Expect<Equal<typeof variant["type"], "foo" | "bar" | "baz">>,
    ];
  });

  it("dynamic token -> tokenizer", () => {
    const tokenizer = Str.tokenizer("foo", "bar", "baz");

    expect(tokenizer).toEqual(["foo", "bar", "baz"])

    type cases = [
      Expect<Equal<typeof tokenizer, ["foo", "bar", "baz"]>>,
    ];
  });

});
