import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {
    isNull,
    createToken,
    isTrue,
    isUndefined,
    isString,
    asUnion,
    eachAsString
} from "inferred-types/runtime";
import { DynamicTokenApi } from "inferred-types/types"


describe("createToken(...)", () => {

  it("atomic types", () => {
    const Null = createToken("null", "none")("null", isNull);
    const Undefined = createToken("undefined", "none")("undefined", isUndefined);
    const True = createToken("true", "none")("true", isTrue);
  });


  it("string and string literals", () => {
    const partial = createToken("string", "any");
    const Str = partial(
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

    const a = Str.tokenizer("foo","bar", 42)

    type cases = [
      Expect<Equal<
          typeof partial,
          DynamicTokenApi<"string", "any">
      >>,
    ];

  });




});
