import { Equal, Expect } from "@type-challenges/utils";
import { pathJoin } from "src/runtime/literals/pathJoin";
import { PathJoin } from "src/types/alphabetic/PathJoin";
import { describe, expect, it } from "vitest";

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

describe("pathJoin() runtime util", () => {
  it("happy path", () => {
    const t1 = pathJoin("foo", "bar" as string);
    const t2 = pathJoin("foo/", "bar" as string);
    const t3 = pathJoin("foo" as string, "/bar");
    const t4 = pathJoin("foo/" as string, "/bar");
    const t5 = pathJoin("foo/" as string, "bar");

    // runtime tests
    [t1, t2, t3, t4].forEach((test) => expect(test).toBe("foo/bar"));

    // type tests
    type cases = [
      Expect<Equal<typeof t1, `foo/${string}`>>,
      Expect<Equal<typeof t2, `foo/${string}`>>,
      Expect<Equal<typeof t3, `${string}/bar`>>,
      Expect<Equal<typeof t4, `${string}/bar`>>,
      Expect<Equal<typeof t5, `${string}bar`>>
    ];
    const cases: cases = [true, true, true, true, true];
  });

  it("with wide types", () => {
    const t1 = pathJoin("foo", "bar");
    const t2 = pathJoin("foo/", "bar");
    const t3 = pathJoin("foo", "/bar");
    const t4 = pathJoin("foo/", "/bar");
    // runtime tests
    [t1, t2, t3, t4].forEach((test) => expect(test, "runtime failure").toBe("foo/bar"));

    // type tests
    type cases = [
      // neither have divider
      Expect<Equal<typeof t1, "foo/bar">>,
      // one has, one does not
      Expect<Equal<typeof t2, "foo/bar">>,
      Expect<Equal<typeof t3, "foo/bar">>,
      // both have
      Expect<Equal<typeof t4, "foo/bar">>
    ];
    const cases: cases = [true, true, true, true];
  });
});
