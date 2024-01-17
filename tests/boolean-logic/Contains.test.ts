import { Equal, Expect } from "@type-challenges/utils";
import { Contains, NarrowlyContains } from "src/types/index";
import { describe, it } from "vitest";

describe("Contains<T,A>", () => {
  it("happy-path", () => {
    type T1 = [number, 32, 64, "foo"];
    type T2 = [false, true];
    type T3 = [42, 64, 128];
    type T4 = ["foo", "bar"];

    type cases = [
      // "foo" extends string so true
      Expect<Equal<Contains<T1, string>, true>>,
      // "bar" does NOT extend "foo"
      Expect<Equal<Contains<T1, "bar">, false>>,
      // T4 has literal string but this will match the wide type string
      Expect<Equal<Contains<T4, string>, true>>,
      // T1 has both wide and narrow versions of "number"
      Expect<Equal<Contains<T1, number>, true>>,
      // T3 has narrow versions of "number"
      Expect<Equal<Contains<T3, number>, true>>,
      // boolean literals evaluate to wide type
      Expect<Equal<Contains<T2, boolean>, true>>
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
      Expect<Equal<NarrowlyContains<T1, string>, false>>,
      // "foo" does equal "foo"
      Expect<Equal<NarrowlyContains<T1, "foo">, true>>,
      // T4 has literal string but this doesn't match with NarrowlyContains
      Expect<Equal<NarrowlyContains<T4, string>, false>>,
      // T1 has both wide and narrow versions of "number" but match is only on wide type
      Expect<Equal<NarrowlyContains<T1, number>, true>>,
      // T3 has matches on narrow number
      Expect<Equal<NarrowlyContains<T3, 42>, true>>,
      // T3 identifies a non-match of narrow numbers
      Expect<Equal<NarrowlyContains<T3, 442>, false>>,
      // boolean literals evaluate to wide type
      Expect<Equal<NarrowlyContains<T2, boolean>, false>>
    ];
    const cases: cases = [true, true, true, true, true, true, true];
  });
});
