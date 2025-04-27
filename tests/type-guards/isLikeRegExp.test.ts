import { describe, expect, it } from "vitest";
import { isLikeRegExp } from "inferred-types/runtime";



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
