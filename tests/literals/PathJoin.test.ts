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
    type T5 = PathJoin<"/foo/", "/bar">;
    type T6 = PathJoin<"foo/", "/bar/">;

    type cases = [
      // neither have divider
      Expect<Equal<T1, "foo/bar">>,
      // one has, one does not
      Expect<Equal<T2, "foo/bar">>,
      Expect<Equal<T3, "foo/bar">>,
      // both have
      Expect<Equal<T4, "foo/bar">>,
      // leading slash
      Expect<Equal<T5, "/foo/bar">>,
      // trailing slash
      Expect<Equal<T6, "foo/bar/">>
    ];
    const cases: cases = [true, true, true, true, true, true];
  });

  it("PathJoin<T,U> with U as array", () => {
    type T1 = PathJoin<"foo", ["bar", "baz"]>;
    type T2 = PathJoin<"/foo/", ["/bar/", "/baz/"]>;
    type T3 = PathJoin<"/foo/", ["bar", "/baz"]>;

    type cases = [
      //
      Expect<Equal<T1, "foo/bar/baz">>,
      Expect<Equal<T2, "/foo/bar/baz/">>,
      Expect<Equal<T3, "/foo/bar/baz">>
    ];
    const cases: cases = [true, true, true];
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
  it("no leading or trailing slashes", () => {
    const t1 = pathJoin("foo", "bar");
    const t2 = pathJoin("foo/", "bar");
    const t3 = pathJoin("foo", "/bar");
    const t4 = pathJoin("foo/", "/bar");
    // multi
    const t5 = pathJoin("foo/", "bar", "/baz");
    const t6 = pathJoin("foo/", "bar/", "/baz");

    [t1, t2, t3, t4].forEach((test) =>
      expect(test, "no leading or trailing slash").toBe("foo/bar")
    );
    [t5, t6].forEach((test) =>
      expect(test, "no leading or trailing slash (with multi U)").toBe("foo/bar/baz")
    );
  });

  it("leading and trailing slashes", () => {
    const t1 = pathJoin("/foo", "bar");
    const t2 = pathJoin("foo/", "bar/");
    const t3 = pathJoin("/foo", "bar", "/baz");
    const t4 = pathJoin("foo/", "/bar/", "/baz/");
    // runtime tests
    expect(t1).toBe("/foo/bar");
    expect(t2).toBe("foo/bar/");
    expect(t3).toBe("/foo/bar/baz");
    expect(t4).toBe("foo/bar/baz/");
  });

  it.only("singular value", () => {
    const t1 = pathJoin("foo");
    const t2 = pathJoin("foo/");

    // runtime
    expect(t1).toBe("foo");
    expect(t2).toBe("foo/");

    // design time
    type cases = [
      //
      Expect<Equal<typeof t1, "foo">>,
      Expect<Equal<typeof t2, "foo/">>
    ];
    const cases: cases = [true, true];
  });
});
