import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {  NumericChar, RetainUntil } from "src/types/index";
import { retainUntil, retainUntilInclusive } from "src/runtime/index";
import { NUMERIC_CHAR } from "src/constants/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("RetainUntil<TContent,TComparator>", () => {

  it("happy path", () => {
    type UntilNum = RetainUntil<"Hello World456der", NumericChar>;

    type cases = [
      Expect<Equal<UntilNum, "Hello World">>,
    ];
    const cases: cases = [
      true
    ];
  });
});


describe("retainUntil(content, ...find) runtime", () => {

  it("happy path", () => {
    const hello = retainUntil("Hello World456der", ...NUMERIC_CHAR);
    expect(hello).toEqual("Hello World");
    const nada = retainUntil("456Hello", ...NUMERIC_CHAR);
    expect(nada).toEqual("");
    const whoCares = retainUntil("Hello World", ...NUMERIC_CHAR)
    expect(whoCares).toEqual("Hello World");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof hello, "Hello World">>,
      Expect<Equal<typeof nada, "">>,
      Expect<Equal<typeof whoCares, "Hello World">>,
    ];
  });
});


describe("retainUntilInclusive(content, ...find)", () => {

  it("happy path", () => {
    const hello = retainUntilInclusive("Hello World456der", ...NUMERIC_CHAR);
    expect(hello).toEqual("Hello World4");
    const nada = retainUntilInclusive("456Hello", ...NUMERIC_CHAR);
    expect(nada).toEqual("4");
    const whoCares = retainUntilInclusive("Hello World", ...NUMERIC_CHAR)
    expect(whoCares).toEqual("Hello World");

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof hello, "Hello World4">>,
      Expect<Equal<typeof nada, "4">>,
      Expect<Equal<typeof whoCares, "Hello World">>,
    ];
  });

});


