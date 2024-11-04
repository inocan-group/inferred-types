import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {  ToFn } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ToFn<T> utility", () => {

  it("happy path", () => {
    type Str = ToFn<"hi">;
    type Num = ToFn<42>;
    type Proxy = ToFn<() => "hi">;
    type Never = ToFn<never>;

    type cases = [
      Expect<Equal<Str, () => "hi">>,
      Expect<Equal<Num, () => 42>>,
      Expect<Equal<Proxy, () => "hi">>,
      Expect<Equal<Never, never>>
    ];
    const cases: cases = [ true, true, true,  true ];
  });

});
