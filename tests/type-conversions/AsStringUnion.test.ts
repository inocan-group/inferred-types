import { Equal, Expect } from "@type-challenges/utils";
import { AsStringUnion } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsStringUnion<T>", () => {

  it("happy path", () => {
    type LitNum = AsStringUnion<42 | 56>;
    type WideNum = AsStringUnion<"foo" | number>;
    type NoChange = AsStringUnion<"foo" | "bar">;
    type Ignored = AsStringUnion<"foo" | "bar" | [1,2,3]>;
    type Allowed = AsStringUnion<"foo" | "bar" | [1,2,3], "proxy">;

    type Num = AsStringUnion<42>;
    type True = AsStringUnion<true>;

    type cases = [
      Expect<Equal<LitNum, "42" | "56">>,
      Expect<Equal<WideNum, "foo" | `${number}`>>,
      Expect<Equal<NoChange, "foo" | "bar">>,
      Expect<Equal<Ignored, "foo" | "bar">>,
      Expect<Equal<Allowed, "foo" | "bar" | [1,2,3]>>,

      Expect<Equal<Num, "42">>,
      Expect<Equal<True, "true">>,
    ];
    const cases: cases = [
      true, true, true, true, true,
      true, true
    ];
  });

});
