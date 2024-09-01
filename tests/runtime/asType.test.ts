import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { asType } from "src/runtime/index";
import { AsType, Dictionary } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.


describe("AsType<T>", () => {

  it("happy path", () => {
    type OptStr = AsType<"Opt<string>">;
    type OptNum = AsType<"Opt<number>">;
    type Bool = AsType<"boolean">;
    type NumArr = AsType<"Array<number>">;
    type Dict = AsType<"Dict">;
    type StrDict = AsType<"Dict<string, string>">;
    type NumDict = AsType<"Dict<string, number>">;

    type Foo = AsType<"Dict<{foo: string}>">;
    type FooBar = AsType<"Dict<{foo: number, bar: string}>">;

    type M = AsType<"Map">;
    type M2 = AsType<"Map<number, Array>">;

    type cases = [
      Expect<Equal<OptStr, string | undefined>>, //
      Expect<Equal<OptNum, number | undefined>>,
      Expect<Equal<Bool, boolean>>,
      Expect<Equal<NumArr, number[]>>,
      Expect<Equal<Dict, Dictionary>>,
      Expect<Equal<StrDict, Record<string, string>>>,
      Expect<Equal<NumDict, Record<string, number>>>,


      Expect<Equal<Foo, {foo: string; [key: string|symbol]: unknown}>>,
      Expect<Equal<FooBar, {foo: number; bar: string; [key: string|symbol]: unknown}>>,

      Expect<Equal<M, Map<any,any>>>,
      Expect<Equal<M2, Map<number,any[]>>>,

    ];
    const cases: cases = [
      true, true,true, true,true, true,true,
      true, true,
      true, true,
    ];
  });

});

describe("asType(val)", () => {

  it("happy path", () => {
    const strToken = asType("string");
    const numToken = asType("number");
    const optStr = asType("Opt<string>");
    const foo = asType("Dict<{foo: string}>");

    expect(strToken).toBe("string");
    expect(numToken).toBe("number");
    expect(optStr).toBe("Opt<string>");
    expect(foo).toBe("Dict<{foo: string}>");

    type cases = [
      Expect<Equal<typeof strToken, string>>,
      Expect<Equal<typeof numToken, number>>,
      Expect<Equal<typeof optStr, string | undefined>>,
      Expect<Equal<typeof foo, {foo: string; [key: string|symbol]: unknown}>>
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
