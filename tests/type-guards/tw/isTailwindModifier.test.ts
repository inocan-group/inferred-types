
import { isTailwindModifier } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, Test, TwModifier } from "inferred-types/types";

describe("isTailwindModifier(val)", () => {

  it("happy path", () => {
    const t1 = isTailwindModifier("focus");
    const t2 = isTailwindModifier("hover");
    const t3 = isTailwindModifier("first");
    const t4 = isTailwindModifier("dark");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    const f1 = isTailwindModifier("focus2");
    const f2 = isTailwindModifier("foobar");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    const test: string = "focus";

    if(isTailwindModifier(test)) {
      type T = typeof test;

      type cases = [
        Expect<Test<T, "equals",  TwModifier>>
      ];
    }

  });

});
