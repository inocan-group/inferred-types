import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { fromDefineObject } from "inferred-types/runtime"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("fromDefineObject", () => {

  it("type tests", () => {
    const foo = fromDefineObject({ foo: "number(1,2,3)" });

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof foo, { foo: 1 | 2 | 3} >>,
    ];
  });

  it.skip("runtime tests");

});
