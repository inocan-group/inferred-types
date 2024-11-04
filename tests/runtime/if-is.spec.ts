import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import {

  or,
  isTrue,
  StartingWithTypeGuard,
  startsWith, box
} from "inferred-types";
import { EndsWith, DoesExtend, LowerAlphaChar, Or, StartsWith  } from "@inferred-types/types";
import {
  ifArray,
  ifArrayPartial,
  ifBoolean,
  ifNumber,
  ifSameType,
  ifString,
  ifTrue,
  ifUndefined
} from "@inferred-types/runtime";


describe("runtime if/is", () => {
  it("ifString(v,i,e)", () => {
    const t = ifString("foo", () => 42, () => false);
    const f = ifString(-1, () => "yikes", () => 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifNumber(v,i,e)", () => {
    const t = ifNumber(42, (n) => n, () => false);
    const f = ifNumber("foo", () => "yikes", () => 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifBoolean(v,i,e)", () => {
    const t = ifBoolean(false, () => 42, () => false);
    const f = ifBoolean(undefined, () => "yikes", () => 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>> //
    ];
    const cases: cases = [true, true];
  });

  it("ifTrue(v,i,e)", () => {
    const t = ifTrue(true, () => 42, () => false);
    const f = ifTrue(false, () => "yikes", () => 42);
    const f2 = ifTrue(true as boolean, () => "yikes", () => 42);

    type cases = [
      Expect<Equal<typeof t, 42>>, //
      Expect<Equal<typeof f, 42>>, //
      Expect<Equal<typeof f2, "yikes" | 42>> //
    ];
    const cases: cases = [true, true, true];
  });

  it("ifTrue(v,i,e) with boxed functions", () => {
    const f1 = box(<T extends string>(input: T) => `Hello ${input}` as const);
    const f2 = box(<T extends string>(input: T) => `Get out ${input}!` as const);
    const t = <T extends string, B extends boolean>(i: T, nice: B) => {
      return isTrue(nice) ? f1.value(i) : f2.value(i);
    };
    const t2 = <T extends string, B extends boolean>(i: T, nice: B) =>
      ifTrue(nice, () => f1.value(i), () => f2.value(i));

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
    const t2 = <T extends string, B extends boolean>(i: T, nice: B) => ifTrue(nice, () => f1(i), () => f2(i));

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

  it("Or<T[]> type util", () => {
    type T1 = Or<[true, true, false]>;
    type T2 = Or<[false, false, false]>;
    type T3 = Or<[boolean, boolean, true]>;
    type T4 = Or<[boolean, boolean, boolean]>;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, false>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, boolean>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("or() runtime utility", () => {
    const t1 = or(true, true, false);
    const t2 = or(false, false, false);
    const t3 = or(false as boolean, false, true);
    const t4 = or(false as boolean, false as boolean, true as boolean);

    type cases = [
      Expect<Equal<typeof t1, true>>,
      Expect<Equal<typeof t2, false>>,
      Expect<Equal<typeof t3, true>>,
      Expect<Equal<typeof t4, boolean>>
    ];
    const cases: cases = [true, true, true, true];

    expect(t1).toBe(true);
    expect(t2).toBe(false);
    expect(t3).toBe(true);
    expect(t4).toBe(true);
  });

  it("Extends<T,EXTENDS> with single clause", () => {
    type cases = [
      //
      Expect<Equal<DoesExtend<1, number>, true>>,
      Expect<Equal<DoesExtend<2, string>, false>>,
      Expect<Equal<DoesExtend<2, 2 | 3>, true>>
    ];
    const cases: cases = [true, true, true];
  });

  it("IfExtends<T,EXTENDS,IF,ELSE", () => {
    type cases = [/** type tests */];
    const cases: cases = [];
  });

  it("ifArray(val,if,else) utility", () => {
    const fn0 = ifArray(
      "foobar" as string,
      (i) => `I'm an array, my length is ${i.length}` as const,
      (i) => `I'm not an array, I am ${i}` as const
    );
    const fn1 = ifArray(
      "foobar",
      (i) => `I'm an array, my length is ${i.length}` as const,
      (i) => `I'm not an array, I am ${i}` as const
    );
    const fn2 = ifArray(
      ["foo", "bar"] as const,
      (i) => `I'm an array, my length is ${i.length}` as const,
      (i) => `I'm not an array, I am ${i}` as const
    );

    const fn3 = ifArray(
      ["foo", "bar"],
      (i) => `I'm an array, my length is ${i.length}` as const,
      (i) => `I'm not an array, I am ${i}` as const
    );

    type cases = [
      Expect<Equal<typeof fn0, `I'm not an array, I am ${string}`>>,
      Expect<Equal<typeof fn1, `I'm not an array, I am foobar`>>,
      Expect<Equal<typeof fn2, `I'm an array, my length is 2`>>,
      Expect<Equal<typeof fn3, `I'm an array, my length is ${number}`>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("ifArrayPartial()()", () => {
    const arrTest = ifArrayPartial<string | string[]>()(
      (i) => `I'm an array, my length is ${i.length}`,
      (i) => `I'm not an array, I am ${i}`
    );

    const t1 = arrTest("Bob");
    const t2 = arrTest(["foo", "bar"]);

    type cases = [
      Expect<Equal<typeof t1, `I'm not an array, I am ${string}`>>,
      Expect<Equal<typeof t2, `I'm an array, my length is ${number}`>>
    ];
    const cases: cases = [true, true];
  });

  it("ifUndefined(v,i,e)", () => {
    const t = ifUndefined(undefined, () => 42, () => false);
    const f = ifUndefined(false, () => "yikes", () => 42);
    const f2 = ifUndefined("", () => "yikes", () =>  42);

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

    type T6 = StartsWith<"alpha", LowerAlphaChar>;
    type T7 = StartsWith<"Alpha", LowerAlphaChar>;

    type T8 = StartsWith<42, "4">;
    type T9 = StartsWith<42, string>;
    type T10 = StartsWith<42, "5">;

    type cases = [
      Expect<Equal<T1, true>>, //
      Expect<Equal<T2, false>>,
      // if either the "start with" or "val" props are wide then we can't resolve at design time
      Expect<Equal<T3, boolean>>,
      Expect<Equal<T4, boolean>>,
      Expect<Equal<T5, boolean>>,
      // LowerAlpha is a string literal
      Expect<Equal<T6, true>>,
      Expect<Equal<T7, false>>,

      Expect<Equal<T8, true>>,
      Expect<Equal<T9, boolean>>,
      Expect<Equal<T10, false>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true, true, true, true];
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
    const foo = startsWith("foo");
    const foot = startsWith("foot");

    // runtime
    expect(foo("foobar")).toBe(true);
    expect(foot("foobar")).toBe(false);

    // design time
    type cases = [
      Expect<Equal<typeof foo, StartingWithTypeGuard<"foo">>>, //
      Expect<Equal<typeof foot, StartingWithTypeGuard<"foot">>> //
    ];
    const cases: cases = [true, true];
  });


  it("ifSameType", () => {
    const t1 = ifSameType(
      "foo",
      "" as string,
      (i) => `Hello ${i}`,
      (i) => `Goodbye ${i}`
    );
    const t2 = ifSameType(
      42,
      "" as string,
      (i) => `Hello ${i}`,
      (i) => `Goodbye ${i}`
    );
    const t3 = ifSameType(
      "foo" as string,
      "" as string,
      (i) => `Hello ${i}`,
      (i) => `Goodbye ${i}`
    );
    const t4 = ifSameType(
      42 as number,
      "" as string,
      (i) => `Hello ${i}`,
      (i) => `Goodbye ${i}`
    );

    const nested = ifSameType(
      false,
      "" as string,
      (i) => `Hello ${i}`,
      (i) =>
        ifSameType(
          i,
          0 as number,
          (n) => n,
          (i) =>
            ifSameType(
              i,
              true as boolean,
              (b) => `I'm a boolean value of ${b}`,
              () => ""
            )
        )
    );

    type cases = [
      // matches (narrow)
      Expect<Equal<typeof t1, "Hello foo">>,
      // does not match (narrow)
      Expect<Equal<typeof t2, `Goodbye 42`>>,
      // matches (wide)
      Expect<Equal<typeof t3, `Hello ${string}`>>,
      // does not match (wide)
      Expect<Equal<typeof t4, `Goodbye ${number}`>>,
      // nested
      Expect<Equal<typeof nested, `I'm a boolean value of false`>>
    ];
    const cases: cases = [true, true, true, true, true];
  });
});
