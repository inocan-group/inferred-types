import { Equal, Expect } from "@type-challenges/utils";
import { Optional } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Optional<T>", () => {

  it("happy path", () => {
    type FooMaybeBar = `foo${Optional<"bar">}`;
    type Nested = `foo${Optional<`bar${Optional<"baz">}`>}`
    type FooUnion = `foo${Optional<"bar" | "baz">}`;

    type Multi = Optional<["foo","bar"]>;
    type MultiUnion = Optional<["foo" | "bar", "foo"| "bar"]>;


    type cases = [
      Expect<Equal<FooMaybeBar, "foo" | "foobar">>,
      Expect<Equal<Nested, "foo" | "foobar" | "foobarbaz">>,
      Expect<Equal<FooUnion, "foo" | "foobar" | "foobaz">>,

      Expect<Equal<Multi, "" | "bar" | "foo" | "foobar">>,
      Expect<Equal<
        MultiUnion,
        "" | "bar" | "foo" | "foobar" | "barbar" | "barfoo" | "foofoo"
      >>
    ];
    const cases: cases = [
      true, true, true,
      true, true
    ];
  });

});
