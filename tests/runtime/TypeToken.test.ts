import { Expect, Equal } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { TypeToken, Extends } from "inferred-types/types"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("TypeToken<T>", () => {

  it("happy path", () => {
    type Str = TypeToken<"string">;
    type StrSet = TypeToken<"string-set">;

    // @ts-ignore
    type cases = [
      Expect<Equal<Str, "<<string>>" | `<<string::${string}>>`>>,
      Expect<Extends<"<<string-set::militaryTime>>", StrSet>>,
    ];
  });

});
