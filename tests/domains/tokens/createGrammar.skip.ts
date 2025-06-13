import { Equal, Expect } from "@type-challenges/utils";
import {
  asUnion,
  createGrammar,
  createToken,
  createTokenSyntax,
  eachAsString,
  isNull,
  isString,
  isTrue,
  isUndefined
} from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe.skip("createGrammar()", () => {

  // static token
  const Null = createToken("null", "static")("null", isNull);
  const Undefined = createToken("undefined", "static")("undefined", isUndefined);
  const True = createToken("true", "static")("true", isTrue);
  // dynamic token
  const Str = createToken("string", "dynamic")(
    // type renderer
    ({ sep }) =>
      (...p) => {
        const type = p.length === 0
          ? "string" as string
          : asUnion(p, sep, { prefix: `string${sep}` });
        const typeGuard = p.length === 0
          ? isString
          : (val: unknown): val is typeof type => {
            return isString(val) && p.includes(val);
          }
        return {
          type,
          typeGuard
        } as any;
      },
    // tokenizer
    (...literals) => eachAsString(...literals)
  );

  // syntax
  const Syntax = createTokenSyntax("Test",
    "{{",
    "}}",
    "::"
  );

  const g = createGrammar(Syntax, Null, Undefined, True, Str);

  it("token names are set correctly", () => {
    const names = g.tokenNames;

    expect(names).toEqual(["null", "undefined", "true", "string"])

    type cases = [
      Expect<Test<typeof names, ["null", "undefined", "true", "equals",  "string"]>>,
    ];
  });

  it("tokenShape is correct", () => {
    const shaper = g.tokenShape;
    const all = g.tokenShape();
    const nada = g.tokenShape(Null);
    const str = g.tokenShape(Str);

    type cases = [
      Expect<Test<typeof nada, "equals",  `{{null}}`>>,
    ];

  });
});
