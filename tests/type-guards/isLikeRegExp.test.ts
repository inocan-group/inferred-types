import { describe, expect, it } from "vitest";
import { isLikeRegExp } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isLikeRegExp()", () => {

  it("happy path", () => {
    const t1 = isLikeRegExp(/foobar/);
    const t2 = isLikeRegExp("foobar");

    const f1 = isLikeRegExp("(foo)((bar)");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);

  });

});
