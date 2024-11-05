import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsSingleChar } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsSingleChar<T>", () => {

  it("happy path", () => {
    type C = IsSingleChar<"C">;
    type NC = IsSingleChar<"No">;
    type Str = IsSingleChar<string>;
    type NotStr = IsSingleChar<42>;

    type cases = [
      Expect<Equal<C, true>>,
      Expect<Equal<NC, false>>,
      Expect<Equal<Str, boolean>>,
      Expect<Equal<NotStr, false>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });

});
