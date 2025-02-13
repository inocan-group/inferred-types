import { } from "@type-challenges/utils";
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
import { describe, it } from "vitest";

describe("createGrammar()", () => {

  // static token
  const Null = createToken("null", "none")("null", isNull);
  const Undefined = createToken("undefined", "none")("undefined", isUndefined);
  const True = createToken("true", "none")("true", isTrue);
  // dynamic token
  const Str = createToken("string", "any")(
    // type renderer
    (p, sep) => {
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


  it("happy path", () => {
    const g = createGrammar(Syntax, Null, Undefined, True, Str)


    type cases = [
      /** type tests */
    ];
  });
});
