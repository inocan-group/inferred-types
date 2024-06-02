import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {  NumericChar, RetainUntil, RetainWhile } from "src/types/index";

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

describe("RetainWhile<TContent,TComparator>", () => {

  it("happy path", () => {
    type Num = RetainWhile<"42 is a number", NumericChar>;


    type cases = [
      Expect<Equal<Num, "42">>,
    ];
    const cases: cases = [
      true
    ];
  });

});
