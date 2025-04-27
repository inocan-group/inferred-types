import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { ensureSurround } from "inferred-types/runtime";

// runtime: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ensureSurround()", () => {
  const square = ensureSurround("[[", "]]");
  const curly = ensureSurround("{{", "}}");
  const round = ensureSurround("((", "))");



  it("second call resolution", () => {
    const s_foo = square("foo");
    const c_foo = curly("foo");
    const r_foo = round("foo");

    const ls_foo = square("[[foo");
    const lc_foo = curly("{{foo");
    const lr_foo = round("((foo");

    const ts_foo = square("foo]]");
    const tc_foo = curly("foo}}");
    const tr_foo = round("foo))");

    expect(s_foo).toEqual("[[foo]]");
    expect(c_foo).toEqual("{{foo}}");
    expect(r_foo).toEqual("((foo))");

    expect(ls_foo).toEqual("[[foo]]");
    expect(lc_foo).toEqual("{{foo}}");
    expect(lr_foo).toEqual("((foo))");

    expect(ts_foo).toEqual("[[foo]]");
    expect(tc_foo).toEqual("{{foo}}");
    expect(tr_foo).toEqual("((foo))");

    type cases = [
      Expect<Test<typeof s_foo, "equals",  "[[foo]]">>,
      Expect<Test<typeof c_foo, "equals",  "{{foo}}">>,
      Expect<Test<typeof r_foo, "equals",  "((foo))">>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });
});
