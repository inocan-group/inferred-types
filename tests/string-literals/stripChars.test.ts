import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { stripChars } from "src/runtime/index";
import { UPPER_ALPHA_CHARS } from "src/constants/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("stripChars(content,...strip)", () => {

  it("happy path", () => {
    const lower = stripChars("FooBar", ...UPPER_ALPHA_CHARS);

    expect(lower).toBe("ooar");

    type cases = [
      Expect<Equal<typeof lower, "ooar">>,
    ];
    const cases: cases = [
      true
    ];
  });

});
