import { describe, expect, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import {
  ifBoolean,
  ifNumber,
  ifString,
  ifTrue,
  ifUndefined,
  isTrue,
} from "src/runtime/type-checks";
import { EndsWith, StartsWith } from "src/types";
import { ifStartsWith, startsWith } from "src/runtime/type-checks/startsWith";
import { box } from "src/runtime/literals";

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

  it("ifTrue(v,i,e) with boxed functions", () => {
    const f1 = box(<T extends string>(input: T) => `Hello ${input}` as const);
    const f2 = box(<T extends string>(input: T) => `Get out ${input}!` as const);
    const t = <T extends string, B extends boolean>(i: T, nice: B) => {
      return isTrue(nice) ? f1.unbox()(i) : f2.unbox()(i);
    };
    const t2 = <T extends string, B extends boolean>(i: T, nice: B) =>
      ifTrue(nice, f1.unbox()(i), f2.unbox()(i));

    // both approaches produce correct result
    const r1 = t("Joe", true);
    const r2 = t2("Joe", true);
    expect(r1).toBe("Hello Joe");
    expect(r2).toBe("Hello Joe");

    // only the "ifTrue" approach resolves fully at design time
    type R1 = typeof r1;
    type R2 = typeof r2;

    type cases = [
      // still get union type with `isTrue` conditional
      Expect<Equal<R1, "Hello Joe" | "Get out Joe!">>,
      // but encapsulating both outcomes in `ifTrue` resolves the union
      Expect<Equal<R2, "Hello Joe">>
    ];
    const cases: cases = [true, true];
  });

  it("ifTrue(v,i,e) with string literal functions", () => {
    const f1 = <T extends string>(input: T) => `Hello ${input}` as const;
    const f2 = <T extends string>(input: T) => `Get out ${input}!` as const;
    const t = <T extends string, B extends boolean>(i: T, nice: B) => {
      return isTrue(nice) ? f1(i) : f2(i);
    };
    const t2 = <T extends string, B extends boolean>(i: T, nice: B) => ifTrue(nice, f1(i), f2(i));

    // both approaches produce correct result
    const r1 = t("Joe", true);
    const r2 = t2("Joe", true);
    expect(r1).toBe("Hello Joe");
    expect(r2).toBe("Hello Joe");

    // only the "ifTrue" approach resolves fully at design time
    type R1 = typeof r1;
    type R2 = typeof r2;

    type cases = [
      // still get union type with `isTrue` conditional
      Expect<Equal<R1, "Hello Joe" | "Get out Joe!">>,
      // but encapsulating both outcomes in `ifTrue` resolves the union
      Expect<Equal<R2, "Hello Joe">>
    ];
    const cases: cases = [true, true];
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

  it("ifStartsWith(start, isTrue, isFalse)(v)", () => {
    const noSir = <T extends string>(i: T) => `no sir didn't like it ${i}` as const;
    const startWithFoo = ifStartsWith(
      // condition
      "foo",
      // inline
      (i) => `welcome ${i}` as const,
      // external
      noSir
    );
    const t = startWithFoo("foobar");
    type T = typeof t;
    const f = startWithFoo("nope");
    type F = typeof f;

    type FS = typeof startWithFoo;
    type RFS = ReturnType<FS>;

    // runtime
    expect(t).toBe("welcome foobar");
    expect(f).toBe("no sir didn't like it nope");

    // TODO: get the design time to be more literal

    type cases = [
      Expect<Equal<T, `welcome ${string}`>>,
      Expect<Equal<F, `no sir didn't like it ${string}`>>,
      Expect<
        Equal<
          //
          RFS,
          `welcome ${string}` | `no sir didn't like it ${string}`
        >
      >
    ];
    const cases: cases = [true, true, true];
  });
});
