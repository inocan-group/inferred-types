import { Equal, Expect } from "@type-challenges/utils";
import { TwColorOptionalOpacity } from "inferred-types/types";
import { isTailwindColor } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isTailwindColor(val)", () => {

  it("happy path", () => {
    const lum1 = isTailwindColor("blue-500");
    const lum2 = isTailwindColor("slate-300");
    const lum3 = isTailwindColor("purple-950");

    const op1 = isTailwindColor("blue-500/25");
    const op2 = isTailwindColor("green-100/50");
    const op3 = isTailwindColor("violet-700/100");

    const white = isTailwindColor("white");

    expect(lum1).toBe(true);
    expect(lum2).toBe(true);
    expect(lum3).toBe(true);

    expect(op1).toBe(true);
    expect(op2).toBe(true);
    expect(op3).toBe(true);

    expect(white).toBe(true);

    const f1 = isTailwindColor("blue-5000");
    const f2 = isTailwindColor("white-500");
    const f3 = isTailwindColor("blue-500/150");

    expect(f1).toBe(false);
    expect(f2).toBe(false);
    expect(f3).toBe(false);

    const test: string = "blue-500";

    if(isTailwindColor(test)) {
      type T = typeof test;

      // @ts-ignore
      type cases = [
        Expect<Equal<T, TwColorOptionalOpacity>>
      ];
    }

  });

});
