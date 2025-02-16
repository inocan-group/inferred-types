import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import { toUppercase } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("toUpperCase()", () => {

  it("happy path", () => {
    const fooBar = toUppercase("fooBar");
    expect(fooBar).toEqual("FOOBAR");

    type cases = [
      Expect<Equal<typeof fooBar, "FOOBAR">>,
    ];
    const cases: cases = [true];
  });

});
