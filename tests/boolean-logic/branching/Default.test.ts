import { Equal, Expect } from "@type-challenges/utils";
import { Default } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Default<TVal,TDefault,[TProtect]>", () => {

  it("happy path", () => {
    type NoChange = Default<"foo", "bar">;
    type Undef = Default<undefined, "foo">;
    type Null = Default<null, "foo">;

    type cases = [
      Expect<Equal<NoChange, "foo">>,
      Expect<Equal<Undef, "foo">>,
      Expect<Equal<Null, "foo">>,

    ];
    const cases: cases = [
      true, true, true
    ];
  });

});
