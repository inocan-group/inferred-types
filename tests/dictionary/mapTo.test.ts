import {
  DecomposeMapConfig,
  FinalizedMapConfig,
  MapCardinality,
  MapFn,
  MapTo,
  ToConfiguredMap,
  ToFinalizedConfig,
  MapConfig,
  ConfigureMap,
  ConfiguredMap,
} from "src/types/dictionary";
import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import {
  DEFAULT_MANY_TO_ONE_MAPPING,
  DEFAULT_ONE_TO_MANY_MAPPING,
  mapTo,
} from "src/utility/dictionary/mapTo";
import { TypeDefault } from "src/types";

type I = { title: string; color: string; products: string[] };
const i: I = { title: "Test", color: "green", products: ["foo", "bar", "baz"] };
const i2: I = { title: "i2", color: "green", products: ["foo", "bar", "baz"] };

type O = { title: string; count: number; unnecessary?: number };

describe("MapTo<I,O> and MapToFn<I,O>", () => {
  it("MapTo with 0:M, 0:M cardinality", () => {
    type Fn = MapTo<I, O>;
    type Fn2 = MapTo<I, O, "req", MapCardinality.OneToMany, "opt">;
    type WFn = MapFn<I, O>;
    type WFn2 = MapFn<I, O, "req", MapCardinality.OneToMany, "opt">;

    /** userland mapping function */
    type T = (source: I) => O[];
    /** exposed via mapTo() util */
    type WT = <S extends I | I[]>(source: S) => S extends I[] ? O[] : O[] | null;

    type cases = [
      Expect<Equal<Fn, Fn2>>, // implicit default = explicit values
      Expect<Equal<WFn, WFn2>>, // implicit default = explicit values
      Expect<Equal<Fn, T>>,
      Expect<Equal<WFn, WT>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("MapTo<X> with I -> O[] variable config", () => {
    type Fn0 = MapTo<I, O, "req", MapCardinality.OneToMany, "opt">;
    type Fn1 = MapTo<I, O, "req", MapCardinality.OneToMany, "req">;
    type Fn2 = MapTo<I, O, "opt", MapCardinality.OneToMany, "opt">;
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

    type T0 = <S extends I | I[]>(source: S) => S extends I[] ? O[] : O[] | null;
    type T1 = <S extends I | I[]>(source: S) => S extends I[] ? [O, ...O[]] : O[];
    type T2 = <S extends I | I[] | undefined>(source?: S) => S extends I[] ? O[] : O[] | null;
    type T3 = <S extends I | I[] | undefined>(source?: S) => S extends I[] ? [O, ...O[]] : O[];

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

  it("ToConfiguredMap<U,D> type utility", () => {
    type U1 = MapConfig<undefined, "I -> O", undefined>;
    type D1 = typeof DEFAULT_ONE_TO_MANY_MAPPING;
    type DecompU1 = DecomposeMapConfig<U1>;
    type DecompD1 = DecomposeMapConfig<D1>;
    type C1 = TypeDefault<U1, D1>;
    type CM1 = ConfigureMap<C1>;
    type CM1b = ConfiguredMap<C1>;

    type U2 = MapConfig<undefined, undefined, undefined>;
    type D2 = typeof DEFAULT_MANY_TO_ONE_MAPPING;
    type DecompU2 = DecomposeMapConfig<U2>;
    type DecompD2 = DecomposeMapConfig<D2>;
    type C2 = ToFinalizedConfig<U2, D2>;
    type CM2 = ToConfiguredMap<U2, D2>;

    type U3 = MapConfig<undefined, undefined, undefined>;
    type D3 = typeof DEFAULT_MANY_TO_ONE_MAPPING;
    type DecompU3 = DecomposeMapConfig<U3>;
    type DecompD3 = DecomposeMapConfig<D3>;
    type C3 = ToFinalizedConfig<U3, D3>;
    type CM3 = ToConfiguredMap<U3, D3>;

    type cases = [
      // userland config
      Expect<Equal<DecompU1, [undefined, "I -> O", undefined]>>,
      // one-to-many default config allows O to be opt to provide "filter" func
      Expect<Equal<DecompD1, ["req", "I -> O[]", "opt"]>>,
      // merged type
      Expect<Equal<C1, FinalizedMapConfig<"req", "I -> O", "opt">>>
    ];
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
});

describe("mapTo() utility function", () => {
  it("Partial application of mapTo utility", () => {
    const m1 = mapTo.manyToOne();
    type M1 = typeof m1;

    expect(m1.input).toBe("req");
    expect(m1.output).toBe("req");
    expect(m1.cardinality).toBe(MapCardinality.ManyToOne);

    const m2 = mapTo.manyToOne({ output: "opt" });
    const o1 = mapTo.oneToOne();
    const o2 = mapTo.oneToOne({ output: "opt" });
    const c1 = mapTo.config({ input: "opt" });

    type cases = [
      Expect<Equal<M1, FinalizedMapConfig<"req", "I[] -> O", "req">>> //
    ];
  });

  it("M:1 conversion", () => {
    const m = mapTo
      .config({
        cardinality: "I[] -> O",
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

  it("1:1 conversion", () => {
    const m = mapTo
      .config({ output: "req", cardinality: MapCardinality.OneToOne })
      .map<I, O>((i) => ({ title: i.title, count: i.products.length }));
    const o = m(i);

    expect(o?.title).toBe(i.title);
    expect(o?.count).toBe(3);
  });

  it("1:1 with 1:M conversion setting", () => {
    const m = mapTo
      .config({ output: "req", cardinality: MapCardinality.OneToMany })
      .map<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    const o = m(i);

    expect(o.length).toBe(1);
    expect(o[0]?.title).toBe(i.title);
    expect(o[0]?.count).toBe(3);
  });

  it("1:M conversion ", () => {
    const m = mapTo
      .config({ output: "req", cardinality: MapCardinality.OneToMany })
      .map<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    const o = m([i, i2]);

    expect(o.length).toBe(2);
    o.map((item) => expect("title" in item).toBeTruthy());
  });

  it("M:1 conversion", () => {
    const m = mapTo
      .config({ output: "req", cardinality: MapCardinality.ManyToOne })
      .map<I, O>((i) => {
        return {
          title: "summary",
          count: i.reduce((acc, i) => (acc = acc + i.products.length), 0),
        };
      });
    const o = m([i, i2]);

    expect(o.title).toBe("summary");
    expect(o.count).toBe(6);
  });

  it("1:1 conversion using oneToOne() configurator", () => {
    const _t: FinalizedMapConfig<"req", "I -> O", "req"> = mapTo.oneToOne();
    const m = mapTo.oneToOne().map<I, O>((i) => ({ title: i.title, count: i.products.length }));
    const m2 = mapTo.config(_t).map<I, O>((i) => ({ title: i.title, count: i.products.length }));
    const o = m(i);

    expect(o.title).toBe(i.title);
    expect(o.count).toBe(i.products.length);
  });

  it("M:1 conversion using manyToOne() configurator", () => {
    const m = mapTo //
      .manyToOne()
      .map<I, O>((i) => {
        return {
          title: "summary",
          count: i.reduce((acc, cur) => (acc = acc + cur.products.length), 0),
        };
      });
    const o = m([i, i2]);

    expect(o.title).toBe("summary");
    expect(o.count).toBe(6);
  });
});
