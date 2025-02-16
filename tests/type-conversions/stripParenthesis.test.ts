import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { stripParenthesis } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("stripParenthesis(val)", () => {

  it("happy path", () => {
    const t1 = stripParenthesis("foo bar");
    const t2 = stripParenthesis("(foo bar)");
    const t3 = stripParenthesis("  (foo bar) ");

    expect(t1).toEqual("foo bar");
    expect(t2).toEqual("foo bar");
    expect(t3).toEqual("foo bar");


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof t1, "foo bar">>,
      Expect<Equal<typeof t2, "foo bar">>,
      Expect<Equal<typeof t3, "foo bar">>,
    ];
  });

});
