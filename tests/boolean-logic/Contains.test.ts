import { Equal, Expect } from "@type-challenges/utils";
import { Contains, NarrowlyContains } from "src/types/boolean-logic/array";
import { describe, it } from "vitest";

describe("Contains<T,A>", () => {
  it("happy-path", () => {
    type T1 = [number, 32, 64, "foo"];
    type T2 = [false, true];
    type T3 = [42, 64, 128];
    type T4 = ["foo", "bar"];

    type cases = [
      // "foo" extends string so true
      Expect<Equal<Contains<string, T1>, true>>,
      // "bar" does NOT extend "foo"
      Expect<Equal<Contains<"bar", T1>, false>>,
      // T4 has literal string but this will match the wide type string
      Expect<Equal<Contains<string, T4>, true>>,
      // T1 has both wide and narrow versions of "number"
      Expect<Equal<Contains<number, T1>, true>>,
      // T3 has narrow versions of "number"
      Expect<Equal<Contains<number, T3>, true>>,
      // boolean literals evaluate to wide type
      Expect<Equal<Contains<boolean, T2>, true>>
    ];
    const cases: cases = [true, true, true, true, true, true];
  });
});

describe("NarrowlyContains<T,A>", () => {
  it("happy-path", () => {
    type T1 = [number, 32, 64, "foo"];
    type T2 = [false, true];
    type T3 = [42, 64, 128];
    type T4 = ["foo", "bar"];

    type cases = [
      // "foo" is not equal to string
      Expect<Equal<NarrowlyContains<string, T1>, false>>,
      // "foo" does equal "foo"
      Expect<Equal<NarrowlyContains<"foo", T1>, true>>,
      // T4 has literal string but this doesn't match with NarrowlyContains
      Expect<Equal<NarrowlyContains<string, T4>, false>>,
      // T1 has both wide and narrow versions of "number" but match is only on wide type
      Expect<Equal<NarrowlyContains<number, T1>, true>>,
      // T3 has matches on narrow number
      Expect<Equal<NarrowlyContains<42, T3>, true>>,
      // T3 identifies a non-match of narrow numbers
      Expect<Equal<NarrowlyContains<442, T3>, false>>,
      // boolean literals evaluate to wide type
      Expect<Equal<NarrowlyContains<boolean, T2>, false>>
    ];
    const cases: cases = [true, true, true, true, true, true, true];
  });
});
