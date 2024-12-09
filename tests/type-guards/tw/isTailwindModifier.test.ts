import { Equal, Expect } from "@type-challenges/utils";
import { TwModifier } from "inferred-types/types";
import { isTailwindModifier } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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

      // @ts-ignore
      type cases = [
        Expect<Equal<T, TwModifier>>
      ];
    }

  });

});
