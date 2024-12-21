import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { objectValues } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("objectValues", () => {

  it("happy path", () => {
    const fooBar = objectValues({foo: 1, bar: 42});

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof fooBar, [1,42]>>
    ];
  });

});
