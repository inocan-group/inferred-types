import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { asType } from "src/runtime/index";
import { AsType } from "../../src/inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.


describe("AsType<T>", () => {

  it("happy path", () => {
    type OptStr = AsType<"opt(string)">;

    type cases = [
      Expect<Equal<OptStr, string | undefined>>, //

    ];
    const cases: cases = [ true ];
  });

});



describe("asType(val)", () => {

  it("happy path", () => {
    const strToken = asType("string");
    const numToken = asType("number");
    const optStr = asType("opt(string)");

    type cases = [
      Expect<Equal<typeof strToken, string>>,
      Expect<Equal<typeof numToken, number>>,
      Expect<Equal<typeof optStr, string | undefined>>,
    ];
    const cases: cases = [
      true, true, true,
      true, true, true
    ];
  });

});
