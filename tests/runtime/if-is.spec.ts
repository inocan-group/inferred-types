import { describe, expect, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { ifBoolean, ifNumber, ifString, ifTrue, ifUndefined } from "src/runtime/type-checks";
import { EndsWith, IfStartsWith, StartsWith } from "src/types";
import { ifStartsWith, IfStartsWithFn, startsWith } from "src/runtime/type-checks/startsWith";

describe("runtime if/is", () => {
  it("ifString(v,i,e)", () => {
    const t = ifString("foo", 42, false);
    const f = ifString(-1, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifNumber(v,i,e)", () => {
    const t = ifNumber(42, 42, false);
    const f = ifNumber("foo", "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifBoolean(v,i,e)", () => {
    const t = ifBoolean(false, 42, false);
    const f = ifBoolean(undefined, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifTrue(v,i,e)", () => {
    const t = ifTrue(true as true, 42, false);
    const f = ifTrue(false, "yikes", 42);
    const f2 = ifTrue(true as boolean, "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>>, //
      Expect<Equal<typeof f2, 42>> //
    ];
    const cases: cases = [true, true, true];
  });

  it("ifUndefined(v,i,e)", () => {
    const t = ifUndefined(undefined, 42, false);
    const f = ifUndefined(false, "yikes", 42);
    const f2 = ifUndefined("", "yikes", 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>>, //
      Expect<Equal<typeof f2, 42>> //
    ];
    const cases: cases = [true, true, true];
  });

  it("StartsWith<T,U>", () => {
    type T1 = StartsWith<"foobar", "foo">;
    type T2 = StartsWith<"foobar", "foot">;
    type T3 = StartsWith<"foobar", string>;
    type T4 = StartsWith<string, "foo">;
    type T5 = StartsWith<string, string>;

    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, boolean>>,
      Expect<Equal<T4, boolean>>,
      Expect<Equal<T5, boolean>>
    ];
    const cases: cases = [true, true, true, true, true];
  });

  it("EndsWith<T,U>", () => {
    type T1 = EndsWith<"foobar", "bar">;
    type T2 = EndsWith<"foobar", "bart">;
    type T3 = EndsWith<"foobar", string>;
    type T4 = EndsWith<string, "bar">;
    type T5 = EndsWith<string, string>;

    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, boolean>>,
      Expect<Equal<T4, boolean>>,
      Expect<Equal<T5, boolean>>
    ];
    const cases: cases = [true, true, true, true, true];
  });

  it("startsWith(t)(v)", () => {
    const t1 = startsWith("foo")("foobar");
    const t2 = startsWith("foot")("foobar");
    const p1 = startsWith("foo");

    // runtime
    expect(t1).toBe(true);
    expect(t2).toBe(false);
    expect(p1("foot")).toBe(true);
    expect(p1("bart")).toBe(false);

    // design time
    type cases = [
      Expect<Equal<typeof t1, true>>, //
      Expect<Equal<typeof t2, false>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifStartsWith(u, cb)(v)", () => {
    const fooStart = ifStartsWith(
      "foo",
      (i) => `welcome ${i}` as const,
      (i) => `no sir didn't like it ${i}` as const
    );
    const t = fooStart("foobar");
    type T = typeof t;
    const f = fooStart("nope");
    type F = typeof f;

    type FS = typeof fooStart;
    type RFS = ReturnType<FS>;

    // runtime
    expect(t).toBe("welcome foobar");
    expect(f).toBe("no sir didn't like it nope");

    type cases = [
      Expect<Equal<T, "foobar">>,
      Expect<Equal<F, `no sir didn't like it ${string}`>>,
      Expect<
        Equal<
          //
          RFS,
          `welcome foo${string}` | `no sir didn't like it ${string}`
        >
      >
    ];
    const cases: cases = [true, true, true];
  });
});
