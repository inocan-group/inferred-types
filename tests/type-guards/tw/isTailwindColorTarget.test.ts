import { Equal, Expect } from "@type-challenges/utils";
import { TwColorTarget } from "inferred-types/types";
import { isTailwindColorTarget } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isTailwindColorTarget(val)", () => {

  it("happy path", () => {
    const t1 = isTailwindColorTarget("bg");
    const t2 = isTailwindColorTarget("text");
    const t3 = isTailwindColorTarget("border");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);

    const f1 = isTailwindColorTarget("foo");
    const f2 = isTailwindColorTarget("flex");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    const test: string = "bg";

    if(isTailwindColorTarget(test)) {
      type T = typeof test;

      // @ts-ignore
      type cases = [
        Expect<Equal<T, TwColorTarget>>
      ];
    }

  });

});
