import {  } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isEmail} from "src/runtime/index"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isEmail(val)", () => {

  it("happy path", () => {
    const t1 = isEmail("bob@builder.com");
    const t2 = isEmail("bob-joe-paul@work.builder.com");

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    const f1 = isEmail("bob@builder");
    const f2 = isEmail("bob@builder.b");

    expect(f1).toBe(false);
    expect(f2).toBe(false);

    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});
