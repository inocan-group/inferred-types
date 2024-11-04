import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { UpperAlphaChar, StripSurround } from "@inferred-types/types";
import { stripSurround } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("StripSurround<TContent,TStrip>", () => {

  it("happy path", () => {
    type Hi = StripSurround<"(Hi)", "(" | ")">;
    type Lower = StripSurround<"Hello World", UpperAlphaChar>;

    type cases = [
      Expect<Equal<Hi, "Hi">>,
      Expect<Equal<Lower, "ello World">>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});

describe("stripSurround(content, ...strip)", () => {

  it("happy path", () => {
    const removeParenthesis = stripSurround("(", ")");

    const hi = removeParenthesis("( hi )");
    const noChange = removeParenthesis(" hi ");

    expect(hi).toBe(" hi ");
    expect(noChange).toBe(" hi ");

    type cases = [
      Expect<Equal<typeof hi, " hi ">>,
      Expect<Equal<typeof noChange, " hi ">>,

    ];
    const cases: cases = [ true, true ];
  });

});
