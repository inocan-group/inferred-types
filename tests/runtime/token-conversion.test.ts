import { describe, expect, it } from "vitest";
import { simpleScalarTokenToTypeToken } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("token conversion", () => {

  it("simpleScalarTokenToTypeToken()", () => {
    const str = simpleScalarTokenToTypeToken("string");
    const num = simpleScalarTokenToTypeToken("number");
    const bool = simpleScalarTokenToTypeToken("boolean");
    const Null = simpleScalarTokenToTypeToken("null");

    // literals
    const strLit = simpleScalarTokenToTypeToken("string(foobar)");
    const numLit = simpleScalarTokenToTypeToken("number(42)");
    // unions
    const strUnion = simpleScalarTokenToTypeToken("string(foo,bar)");
    const numUnion = simpleScalarTokenToTypeToken("number(42, 56)");
    const numUnion2 = simpleScalarTokenToTypeToken("number(42,56)");

    // optional
    const strOpt = simpleScalarTokenToTypeToken("Opt<string>");
    const numOpt = simpleScalarTokenToTypeToken("Opt<number>");

    expect(str).toBe("<<string>>");
    expect(num).toBe("<<number>>");
    expect(bool).toBe("<<boolean>>");
    expect(Null).toBe("<<null>>");

    expect(strLit).toBe("<<string::foobar>>")
    expect(numLit).toBe("<<number::42>>")

    expect(strUnion).toBe("<<union::[ \"foo\", \"bar\" ]>>")
    expect(numUnion).toBe("<<union::[ 42, 56 ]>>")
    expect(numUnion2).toBe("<<union::[ 42, 56 ]>>")

    expect(strOpt).toBe("<<union::[ <<string>>, <<undefined>> ]>>")

    // @ts-ignore
    type cases = [
      Expect<Test<typeof str, "equals",  string>>,
      Expect<Test<typeof num, "equals",  number>>,
      Expect<Test<typeof bool, "equals",  boolean>>,
      Expect<Test<typeof Null, "equals",  null>>,

      Expect<Test<typeof strLit, "equals",  "foobar">>,
      Expect<Test<typeof numLit, "equals",  42>>,

      Expect<Test<typeof strUnion, "equals",  "foo" | "bar">>,
      Expect<Test<typeof numUnion, "equals",  42 | 56>>,


      Expect<Test<typeof strOpt, "equals",  string | undefined>>,
      Expect<Test<typeof numOpt, "equals",  number | undefined>>,

    ];

  });





});
