import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { simpleContainerTokenToTypeToken, simpleScalarTokenToTypeToken } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("token conversion", () => {

  it("simpleScalarTokenToTypeToken()", () => {
    const str = simpleScalarTokenToTypeToken("string");
    const num = simpleScalarTokenToTypeToken("number");
    const bool = simpleScalarTokenToTypeToken("boolean");
    const Null = simpleScalarTokenToTypeToken("null");
    const optStr = simpleScalarTokenToTypeToken("opt(string)");
    const optNum = simpleScalarTokenToTypeToken("opt(number)");
    const optBool = simpleScalarTokenToTypeToken("opt(boolean)");
    // literals
    const strLit = simpleScalarTokenToTypeToken("string(foobar)");
    const numLit = simpleScalarTokenToTypeToken("number(42)");
    // unions
    const strUnion = simpleScalarTokenToTypeToken("string(foo,bar)");
    const numUnion = simpleScalarTokenToTypeToken("number(42, 56)");
    const numUnion2 = simpleScalarTokenToTypeToken("number(42,56)");

    expect(str).toBe("<<string>>");
    expect(num).toBe("<<number>>");
    expect(bool).toBe("<<boolean>>");
    expect(Null).toBe("<<null>>");

    expect(optStr).toBe("<<union::[<<string>>, <<undefined>>]>>");
    expect(optNum).toBe("<<union::[<<number>>, <<undefined>>]>>");
    expect(optBool).toBe("<<union::[<<boolean>>, <<undefined>>]>>");

    expect(strLit).toBe("<<string::foobar>>")
    expect(numLit).toBe("<<number::42>>")

    expect(strUnion).toBe("<<union::[ \"foo\", \"bar\" ]>>")
    expect(numUnion).toBe("<<union::[ 42, 56 ]>>")
    expect(numUnion2).toBe("<<union::[ 42, 56 ]>>")


    type cases = [
      Expect<Equal<typeof str, string>>,
      Expect<Equal<typeof num, number>>,
      Expect<Equal<typeof bool, boolean>>,
      Expect<Equal<typeof Null, null>>,

      Expect<Equal<typeof optStr, string | undefined>>,
      Expect<Equal<typeof optNum, number | undefined>>,
      Expect<Equal<typeof optBool, boolean | undefined>>,

      Expect<Equal<typeof strLit, "foobar">>,
      Expect<Equal<typeof numLit, 42>>,

      Expect<Equal<typeof strUnion, "foo" | "bar">>,
      Expect<Equal<typeof numUnion, 42 | 56>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true,
      true, true,
      true, true,
    ];
  });


  it("simpleContainerTokenToTypeToken()", () => {
    const dict = simpleContainerTokenToTypeToken("Dict");

    type cases = [
      /** type tests */
    ];
    const cases: cases = [];

  });


});
