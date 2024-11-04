import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { LastChar } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("LastChar<T>", () => {

  it("with string input", () => {
    type Foobar = LastChar<"Foobar">;
    type EmptyStr = LastChar<"">;
    type WideStr = LastChar<string>;

    type cases = [
      Expect<Equal<Foobar, "r">>,
      Expect<Equal<EmptyStr, never>>,
      Expect<Equal<WideStr, string>>
    ];
    const cases: cases = [ true, true, true ];
  });


  it("with array input", () => {
    type FooBarBaz = LastChar<[ "foo", "bar", "baz"]>;

    type cases = [
      Expect<Equal<FooBarBaz, ["o","r","z"]>>
    ];
    const cases: cases = [ true ];

  });


});
