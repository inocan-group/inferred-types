import { Equal, Expect } from "@type-challenges/utils";
import { AsNonNull, ErrorCondition, Extends } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsNonNull<T>", () => {

  it("Happy Path", () => {
    type WasNever = AsNonNull<"foobar">;
    type Union = AsNonNull<"foobar" | null>;
    type PropKey = AsNonNull<PropertyKey | null>;
    type JustNull = AsNonNull<null>;

    type cases = [
      Expect<Equal<WasNever, "foobar">>,
      Expect<Equal<Union, "foobar">>,
      Expect<Equal<PropKey, PropertyKey>>,
      Expect<Extends<JustNull, ErrorCondition<"invalid-cast">>>,
    ];

    const cases: cases = [
      true, true, true, true
    ];
  });

});
