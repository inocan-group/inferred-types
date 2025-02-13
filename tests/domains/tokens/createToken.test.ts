import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  isNull,
  createToken,
  isTrue,
  isUndefined,
  isString,
  asUnion,
  eachAsString,
  isStringLiteral
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
    const t1 = createToken("null", "none");
    const t2 = createToken("string", "0|2");
    const t3 = createToken("union", "1..2");

    type T2 = ReturnType<typeof t2>

    type cases = [
      Expect<Equal<typeof t1, StaticTokenApi<"null">>>,
      Expect<Equal<typeof t2, DynamicTokenApi<"string", "0|2">>>,
      Expect<Equal<typeof t3, DynamicTokenApi<"union", "1..2">>>,
    ];
  });



  it("atomic types", () => {
    const Null = createToken("null", "none")("null", isNull);
    const Undefined = createToken("undefined", "none")("undefined", isUndefined);

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


  it("string and string literals", () => {
    const Str = createToken("string", "1..2")(
      // resolver
      ({ sep }) =>
        (p) => {
          const type = p.length === 0
            ? "string" as string
            : asUnion(p as readonly [string, ...string[]], sep, { prefix: `string${sep}` });

          const typeGuard = p.length === 0
            ? isString
            : isStringLiteral(...p);

          return {
            type,
            typeGuard
          };
        },
      // tokenizer
      <T extends readonly string[]>(...params: T) => params
    );

    const a = Str.tokenizer("foo", "bar", 42)


    type cases = [

      ExpectTrue<typeof Str extends DynamicToken ? true : false>,
      ExpectTrue<typeof Str extends Token ? true : false>,
    ];

  });

});
