import { describe, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { IntersectingKeys } from "src/types/dictionary";

describe("IntersectingKeys<T,U>", () => {
  it("with overlap", () => {
    type T = { foo: string; bar: number; baz: any };
    type U = { foo: string; bar: number };
    type V = IntersectingKeys<T, U>;

    type cases = [Expect<Equal<V, "foo" | "bar">>];
    const cases: cases = [true];
  });

  it("no overlap", () => {
    type T = { foo1: string; bar1: number; baz1: any };
    type U = { foo: string; bar: number };
    type V = IntersectingKeys<T, U>;
    type VU = Exclude<U, V>;

    type cases = [
      // intersection is "never"
      Expect<Equal<VU, U>>,
      // Excluding "never" results in no change
      Expect<Equal<VU, U>>
    ];
    const cases: cases = [true, true];
  });

  it("using string[] instead of object", () => {
    type T = { foo: string; bar: number; baz: any };
    type U = readonly ["foo", "bart"];
    type V = IntersectingKeys<T, U>;

    type cases = [
      //
      Expect<Equal<V, "foo">>
    ];
    const cases: cases = [true];
  });
});
