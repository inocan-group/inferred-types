import { Equal, Expect } from "@type-challenges/utils";
import { PathJoin } from "src/types/alphabetic/PathJoin";
import { describe, it } from "vitest";

// Note: type tests fail visible inspection but pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("PathJoin<T,U>", () => {
  it("only literals / happy path", () => {
    type T1 = PathJoin<"foo", "bar">;
    type T2 = PathJoin<"foo/", "bar">;
    type T3 = PathJoin<"foo", "/bar">;
    type T4 = PathJoin<"foo/", "/bar">;

    type cases = [
      // neither have divider
      Expect<Equal<T1, "foo/bar">>,
      // one has, one does not
      Expect<Equal<T2, "foo/bar">>,
      Expect<Equal<T3, "foo/bar">>,
      // both have
      Expect<Equal<T4, "foo/bar">>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("wide types mixed in", () => {
    type T1 = PathJoin<"foo", string>;
    type T2 = PathJoin<"foo/", string>;
    type T3 = PathJoin<string, "/bar">;
    type T4 = PathJoin<string, "bar">;

    type cases = [
      Expect<Equal<T1, `foo/${string}`>>,
      Expect<Equal<T2, `foo/${string}`>>,
      Expect<Equal<T3, `${string}/bar`>>,
      Expect<Equal<T4, `${string}bar`>>
    ];
    const cases: cases = [true, true, true, true];
  });
});
