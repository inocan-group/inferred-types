import { Equal, Expect } from "@type-challenges/utils";
import { UnionMutate } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionMutate<T>", () => {

  it("CamelCase", () => {
    type T = UnionMutate<"Foo" | "Bar" | "FooBar", "CamelCase">;

    // @ts-ignore
    type cases = [
      Expect<Equal<T, "foo" | "bar" | "fooBar">>,
    ];
  });

  it("PascalCase", () => {
    type T = UnionMutate<"foo" | "bar" | "fooBar", "PascalCase">;

    // @ts-ignore
    type cases = [
      Expect<Equal<T, "Foo" | "Bar" | "FooBar">>,
    ];
  });

});
