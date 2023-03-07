import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { ensureLeading, ensureTrailing, stripLeading, stripTrailing } from "src/runtime";
import { EnsureLeading, EnsureTrailing, StripLeading, StripTrailing } from "src/types/string-literals";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("EnsureLeading", () => {
  it("EnsureLeading<T,U>", () => {
    type T1 = EnsureLeading<"bar", "foo">;
    type T2 = EnsureLeading<"foobar", "foo">;
    type T3 = EnsureLeading<42, "foobar">;
    type T4 = EnsureLeading<number, "foobar">;

    type cases = [
      Expect<Equal<T1, "foobar">>, //
      Expect<Equal<T2, "foobar">>,
      Expect<Equal<T3, "foobar42">>,
      Expect<Equal<T4, `foobar${number}`>>,
    ];
    const cases: cases = [true, true, true, true];
  });

  it("ensureLeading()", () => {
    const t1 = ensureLeading("bar", "foo");
    const t2 = ensureLeading("foobar", "foo");
    expect(t1).toBe("foobar");
    expect(t2).toBe("foobar");
  });
});

describe("EnsureTrailing", () => {
  it("EnsureTrailing<T,U>", () => {
    type T1 = EnsureTrailing<"foo", "bar">;
    type T2 = EnsureTrailing<"foobar", "bar">;

    type cases = [Expect<Equal<T1, "foobar">>, Expect<Equal<T2, "foobar">>];
    const cases: cases = [true, true];
  });

  it("ensureTrailing()", () => {
    const t1 = ensureTrailing("foo", "bar");
    const t2 = ensureTrailing("foobar", "bar");
    expect(t1).toBe("foobar");
    expect(t2).toBe("foobar");
  });
});

describe("StripLeading", () => {
  it("StripLeading<T,U>", () => {
    type T1 = StripLeading<"foobar", "foo">;
    type T2 = StripLeading<"bar", "foo">;

    type cases = [Expect<Equal<T1, "bar">>, Expect<Equal<T2, "bar">>];
    const cases: cases = [true, true];
  });

  it("stripLeading()", () => {
    const t1 = stripLeading("foobar", "foo");
    const t2 = stripLeading("bar", "foo");
    expect(t1).toBe("bar");
    expect(t2).toBe("bar");
  });
});

describe("StripTrailing", () => {
  it("StripTrailing<T,U>", () => {
    type T1 = StripTrailing<"foobar", "bar">;
    type T2 = StripTrailing<"foo", "bar">;

    type cases = [Expect<Equal<T1, "foo">>, Expect<Equal<T2, "foo">>];
    const cases: cases = [true, true];
  });

  it("stripTrailing()", () => {
    const t1 = stripTrailing("foobar", "bar");
    const t2 = stripTrailing("foo", "bar");
    expect(t1).toBe("foo");
    expect(t2).toBe("foo");
  });
});
