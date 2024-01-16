// import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { extractTypeToken, kind } from "src/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("extractTypeToken", () => {

  it("extracting identity types", () => {
    const _kinds = {
      str: kind.string(),
      num: kind.number(),
      true: kind.boolean(true),
      stringLiteral: kind.string("foo", "bar")
    };
    const _str = extractTypeToken(kind.string());
    
    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });

});
