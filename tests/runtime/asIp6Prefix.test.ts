import { Equal, Expect } from "@type-challenges/utils";
import { ip6Prefix, isShape } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("asIp6Prefix()", () => {

  it("happy path", () => {
    const i1 = ip6Prefix("Fe00","2001");

    expect(isShape(i1), `token is: ${i1}`).toBe(true);
    expect(i1).toEqual("<<string::Fe00:2001:<<string>>:<<string>>>>")
    
    type cases = [
      Expect<Equal<typeof i1, `Fe00:2001:${string}:${string}`>>,
    ];
    const cases: cases = [
      true
    ];
  });

});
