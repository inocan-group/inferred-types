import { Equal, Expect } from "@type-challenges/utils";
import { CapitalizeEachUnionMember } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("CapitalizeEachUnionMember<T>", () => {

  it("happy path", () => {
    type FooBar = CapitalizeEachUnionMember<"foo" | "bar">;
    type FooBar42 = CapitalizeEachUnionMember<"foo" | 42 | "bar">;
    type Foo = CapitalizeEachUnionMember<"foo">;

    type cases = [
      Expect<Equal<FooBar, "Foo" | "Bar">>,
      Expect<Equal<FooBar42, "Foo" | "Bar" | 42>>,
      Expect<Equal<Foo, "Foo">>,
    ];
  });

});
