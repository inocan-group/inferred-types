import { MapFn, MapTo } from "src/types/dictionary";
import { describe, expect, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { mapTo } from "src/utility/dictionary/mapTo";

type I = { title: string; color: string; products: string[] };
const i: I = { title: "Test", color: "green", products: ["foo", "bar", "baz"] };
const i2: I = { title: "i2", color: "green", products: ["foo", "bar", "baz"] };

type O = { title: string; count: number; unnecessary?: number };

describe("MapTo<I,O> and MapToFn<I,O>", () => {
  it("MapTo with 0:M, 0:M cardinality", () => {
    type Fn = MapTo<I, O>;
    type Fn2 = MapTo<I, O, "req", "I -> O[]", "opt">;
    type WFn = MapFn<I, O>;
    type WFn2 = MapFn<I, O, "req", "I -> O[]", "opt">;

    /** userland mapping function */
    type T = (source: I) => O[];
    /** exposed via mapTo() util */
    type WT = <S extends I | I[]>(source: S) => S extends I[] ? O[] : O | null;

    type cases = [
      Expect<Equal<Fn, Fn2>>, // implicit default = explicit values
      Expect<Equal<WFn, WFn2>>, // implicit default = explicit values
      Expect<Equal<Fn, T>>,
      Expect<Equal<WFn, WT>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("MapTo<X> with I -> O[] variable config", () => {
    type Fn0 = MapTo<I, O, "req", "I -> O[]", "opt">;
    type Fn1 = MapTo<I, O, "req", "I -> O[]", "req">;
    type Fn2 = MapTo<I, O, "opt", "I -> O[]", "opt">;
    type Fn3 = MapTo<I, O, "opt", "I -> O[]", "req">;

    type T0 = (source: I) => O[];
    type T1 = (source: I) => [O, ...O[]];
    type T2 = (source?: I) => O[];
    type T3 = (source?: I) => [O, ...O[]];

    type cases = [
      Expect<Equal<Fn0, T0>>, //
      Expect<Equal<Fn1, T1>>, //
      Expect<Equal<Fn2, T2>>, //
      Expect<Equal<Fn3, T3>> //
    ];
    const cases: cases = [true, true, true, true];
  });

  it("MapTo<X> with I[] -> O variable config", () => {
    type Fn0 = MapTo<I, O, "req", "I[] -> O", "opt">;
    type Fn1 = MapTo<I, O, "req", "I[] -> O", "req">;
    type Fn2 = MapTo<I, O, "opt", "I[] -> O", "opt">;
    type Fn3 = MapTo<I, O, "opt", "I[] -> O", "req">;

    type T0 = (source: I[]) => O | null;
    type T1 = (source: I[]) => O;
    type T2 = (source?: I[]) => O | null;
    type T3 = (source?: I[]) => O;

    type cases = [
      Expect<Equal<Fn0, T0>>, //
      Expect<Equal<Fn1, T1>>, //
      Expect<Equal<Fn2, T2>>, //
      Expect<Equal<Fn3, T3>> //
    ];
    const cases: cases = [true, true, true, true];
  });

  it("MapFn<X> with I -> O[] variable config", () => {
    type Fn0 = MapFn<I, O, "req", "I -> O[]", "opt">;
    type Fn1 = MapFn<I, O, "req", "I -> O[]", "req">;
    type Fn2 = MapFn<I, O, "opt", "I -> O[]", "opt">;
    type Fn3 = MapFn<I, O, "opt", "I -> O[]", "req">;

    type T0 = <S extends I | I[]>(source: S) => S extends I[] ? O[] : O | null;
    type T1 = <S extends I | I[]>(source: S) => S extends I[] ? [O, ...O[]] : O;
    type T2 = <S extends I | I[] | undefined>(source?: S) => S extends I[] ? O[] : O | null;
    type T3 = <S extends I | I[] | undefined>(source?: S) => S extends I[] ? [O, ...O[]] : O;

    type cases = [
      Expect<Equal<Fn0, T0>>, //
      Expect<Equal<Fn1, T1>>, //
      Expect<Equal<Fn2, T2>>, //
      Expect<Equal<Fn3, T3>> //
    ];
    const cases: cases = [true, true, true, true];
  });

  it("MapFn<X> with I[] -> O variable config", () => {
    type Fn0 = MapFn<I, O, "req", "I[] -> O", "opt">;
    type Fn1 = MapFn<I, O, "req", "I[] -> O", "req">;
    type Fn2 = MapFn<I, O, "opt", "I[] -> O", "opt">;
    type Fn3 = MapFn<I, O, "opt", "I[] -> O", "req">;

    type T0 = <S extends I[] | I[][]>(source: S) => S extends I[][] ? O[] : O | null;
    type T1 = <S extends I[] | I[][]>(source: S) => S extends I[][] ? [O, ...O[]] : O;
    type T2 = <S extends I[] | I[][] | undefined>(source?: S) => S extends I[][] ? O[] : O | null;
    type T3 = <S extends I[] | I[][] | undefined>(source?: S) => S extends I[][] ? [O, ...O[]] : O;

    type cases = [
      Expect<Equal<Fn0, T0>>, //
      Expect<Equal<Fn1, T1>>, //
      Expect<Equal<Fn2, T2>>, //
      Expect<Equal<Fn3, T3>> //
    ];
    const cases: cases = [true, true, true, true];
  });

  it("walk through of mapTo types", () => {
    const t1 = mapTo<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    type T1 = typeof t1;

    const a1 = mapTo
      .config({ input: "req" })
      .map<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    type A1 = typeof a1;

    type cases = [
      Expect<Equal<T1, MapFn<I, O>>>, //
      Expect<Equal<T1, A1>>
    ];
    const cases: cases = [true, true];
  });

  it.only("M:1 conversion", () => {
    const m = mapTo
      .config({
        direction: "I[] -> O",
        output: "req",
      })
      .map<I, O>((i) => ({
        title: "count of products",
        count: i.reduce((acc, i) => (acc = acc + i.products.length), 0),
      }));

    const summary = m([i, i2]);
    expect(summary.title).toBe("count of products");
    expect(summary.count).toBe(6);
  });

  it("1:1 conversion with non-required", () => {
    const m: MapTo<I, O> = (i) => [
      {
        title: i.title,
        count: i.products.length,
        unnecessary: 42,
      },
    ];
    type M = typeof m;
    type cases = [Expect<Equal<M, MapTo<I, O>>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("1:M conversion", () => {
    const m: MapTo<I, O> = (i) => [
      {
        title: i.title,
        count: i.products.length,
        unnecessary: 1,
      },
      {
        title: i.title,
        count: i.products.length + 1,
        unnecessary: 2,
      },
    ];
    type M = typeof m;
    type cases = [Expect<Equal<M, MapTo<I, O>>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("filter input as 1:0 cardinality", () => {
    const m: MapTo<I, O> = (_i) => [];
    type M = typeof m;
    type cases = [Expect<Equal<M, MapTo<I, O>>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});

describe("mapTo() utility function", () => {
  it("test 1:1 mapping", () => {
    const m = mapTo<I, O>((i) => [
      {
        title: i.title,
        count: i.products.length,
      },
    ]);
    type M = typeof m;
    type R = ReturnType<M>;

    // runtime
    expect(m(i)).toEqual([{ title: i.title, count: i.products.length }]);
    // types
    type cases = [Expect<Equal<R, O[]>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("test 1:1 mapping with extraneous prop", () => {
    const m = mapTo<I, O>((i) => [
      {
        title: i.title,
        count: i.products.length,
        extraneous: 42,
      },
    ]);
    type M = typeof m;
    type R = ReturnType<M>;

    // runtime
    // TODO: extraneous props are cut out of the type but still allows us to return `O` values with extraneous props!
    // expect(m(i)).toEqual([{ title: i.title, count: i.products.length }]);
    // types
    type cases = [Expect<Equal<R, O[]>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("test input filtering", () => {
    const m = mapTo<I, O>((x) => {
      return x.title === "i2"
        ? null
        : [
            {
              title: i.title,
              count: i.products.length,
            },
          ];
    });
    const results = m([i, i2]);

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Test");
  });
});
