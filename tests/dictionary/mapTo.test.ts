import {
  FinalizedMapConfig,
  MapCardinality,
  MapFn,
  MapTo,
  AsFinalizedConfig,
  MapConfig,
  ConfiguredMap,
  Mapper,
  MapInputFrom,
  MapCardinalityFrom,
} from "src/types/dictionary";
import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import {
  DEFAULT_MANY_TO_ONE_MAPPING,
  DEFAULT_ONE_TO_MANY_MAPPING,
  mapTo,
} from "src/runtime/dictionary/mapTo";

type I = { title: string; color: string; products: string[] };
const i: I = { title: "Test", color: "green", products: ["foo", "bar", "baz"] };
const i2: I = { title: "i2", color: "green", products: ["foo", "bar", "baz"] };

type O = { title: string; count: number; unnecessary?: number };

describe("MapTo<I,O> and MapToFn<I,O>", () => {
  it("MapTo with 0:M, 0:M cardinality", () => {
    type C = FinalizedMapConfig<"req", "I -> O[]", "opt">;
    type Fn = MapTo<I, O, C>;
    type WFn = MapFn<I, O, C>;

    /** userland mapping function */
    type T = (source: I) => O[];
    /** exposed via mapTo() util */
    type WT = <S extends I | I[]>(source: S) => S extends I[] ? O[] : O[] | null;

    type cases = [Expect<Equal<Fn, T>>, Expect<Equal<WFn, WT>>];
    const cases: cases = [true, true];
  });

  it("MapTo<X> with I -> O[] variable config", () => {
    type C0 = FinalizedMapConfig<"req", "I -> O[]", "opt">;
    type C1 = FinalizedMapConfig<"req", "I -> O[]", "req">;
    type C2 = FinalizedMapConfig<"opt", "I -> O[]", "opt">;
    type C3 = FinalizedMapConfig<"opt", "I -> O[]", "req">;

    type Fn0 = MapTo<I, O, C0>;
    type Fn1 = MapTo<I, O, C1>;
    type Fn2 = MapTo<I, O, C2>;
    type Fn3 = MapTo<I, O, C3>;

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
    type C0 = FinalizedMapConfig<"req", "I[] -> O", "opt">;
    type C1 = FinalizedMapConfig<"req", "I[] -> O", "req">;
    type C2 = FinalizedMapConfig<"opt", "I[] -> O", "opt">;
    type C3 = FinalizedMapConfig<"opt", "I[] -> O", "req">;

    type Fn0 = MapTo<I, O, C0>;
    type Fn1 = MapTo<I, O, C1>;
    type Fn2 = MapTo<I, O, C2>;
    type Fn3 = MapTo<I, O, C3>;

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
    type C0 = FinalizedMapConfig<"req", "I -> O[]", "opt">;
    type C1 = FinalizedMapConfig<"req", "I -> O[]", "req">;
    type C2 = FinalizedMapConfig<"opt", "I -> O[]", "opt">;
    type C3 = FinalizedMapConfig<"opt", "I -> O[]", "req">;

    type Fn0 = MapFn<I, O, C0>;
    type Fn1 = MapFn<I, O, C1>;
    type Fn2 = MapFn<I, O, C2>;
    type Fn3 = MapFn<I, O, C3>;

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
    type C0 = FinalizedMapConfig<"req", "I[] -> O", "opt">;
    type C1 = FinalizedMapConfig<"req", "I[] -> O", "req">;
    type C2 = FinalizedMapConfig<"opt", "I[] -> O", "opt">;
    type C3 = FinalizedMapConfig<"opt", "I[] -> O", "req">;

    type Fn0 = MapFn<I, O, C0>;
    type Fn1 = MapFn<I, O, C1>;
    type Fn2 = MapFn<I, O, C2>;
    type Fn3 = MapFn<I, O, C3>;

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
    // userland overrides cardinality
    type U1 = MapConfig<undefined, "I -> O", undefined>;
    type D1 = typeof DEFAULT_ONE_TO_MANY_MAPPING;
    type CD1 = AsFinalizedConfig<U1, D1>;
    type CM1 = ConfiguredMap<CD1>;
    type M1 = CM1["map"];
    type M1P = Parameters<M1>;
    type M1R = ReturnType<M1>;

    // userland provides nothing; leaves default value
    type U2 = MapConfig<undefined, undefined, undefined>;
    type D2 = typeof DEFAULT_MANY_TO_ONE_MAPPING;
    type C2 = AsFinalizedConfig<U2, D2>;
    type CM2 = ConfiguredMap<C2>;
    type M2 = CM2["map"];
    type M2P = Parameters<M2>;
    type M2R = ReturnType<M2>;

    type U3 = MapConfig<undefined, undefined, "opt">;
    type D3 = typeof DEFAULT_MANY_TO_ONE_MAPPING;
    type C3 = AsFinalizedConfig<U3, D3>;
    type CM3 = ConfiguredMap<C3>;
    type M3 = CM3["map"];
    type M3P = Parameters<M3>;
    type M3R = ReturnType<M3>;

    type cases = [
      // merged configuration
      Expect<Equal<CD1, FinalizedMapConfig<"req", "I -> O", "opt">>>,
      // map() function's parameters (unknown is I)
      Expect<Equal<[map: (source: unknown) => unknown], M1P>>,
      // map() function's return value
      Expect<Equal<Mapper<unknown, unknown, FinalizedMapConfig<"req", "I -> O", "opt">>, M1R>>,

      // merged configuration is same as default for M:1
      Expect<Equal<C2, FinalizedMapConfig<"req", "I[] -> O", "req">>>,
      // map() function's parameters (unknown is I)
      Expect<Equal<[map: (source: unknown[]) => unknown], M2P>>,
      // map() function's return value
      Expect<Equal<Mapper<unknown, unknown, FinalizedMapConfig<"req", "I[] -> O", "req">>, M2R>>,

      // merged configuration should be M:1 default with an "opt" for output
      Expect<Equal<C3, FinalizedMapConfig<"req", "I[] -> O", "opt">>>,
      // map() function's parameters (unknown is I)
      Expect<Equal<[map: (source: unknown[]) => unknown | null], M3P>>,
      // map() function's return value
      Expect<Equal<Mapper<unknown, unknown, FinalizedMapConfig<"req", "I[] -> O", "opt">>, M3R>>
    ];

    const cases: cases = [true, true, true, true, true, true, true, true, true];
  });

  it("config() matches cardinality configs", () => {
    const a1 = mapTo.oneToMany();
    const b1 = mapTo.config({
      input: "req",
      output: "opt",
      cardinality: "I -> O[]",
    });

    expect(a1.input).toBe(b1.input);
    expect(a1.output).toBe(b1.output);
    expect(a1.cardinality).toBe(b1.cardinality);

    const a2 = mapTo.oneToOne();
    const b2 = mapTo.config({
      input: "req",
      output: "req",
      cardinality: "I -> O",
    });

    expect(a2.input).toBe(b2.input);
    expect(a2.output).toBe(b2.output);
    expect(a2.cardinality).toBe(b2.cardinality);

    type cases = [
      Expect<Equal<typeof a1, typeof a2>>, //
      Expect<Equal<typeof b1, typeof b2>>
    ];
    const cases: cases = [true, true];
  });
});

describe("mapTo() utility function", () => {
  it("Partial application of mapTo utility", () => {
    const m1 = mapTo.manyToOne();

    expect(m1.input).toBe("req");
    expect(m1.output).toBe("req");
    expect(m1.cardinality).toBe(MapCardinality.ManyToOne);

    const m2 = mapTo.manyToOne({ output: "opt" });

    expect(m2.input).toBe("req");
    expect(m2.output).toBe("opt");
    expect(m2.cardinality).toBe(MapCardinality.ManyToOne);

    const o1 = mapTo.oneToOne();

    expect(o1.input).toBe("req");
    expect(o1.output).toBe("req");
    expect(o1.cardinality).toBe(MapCardinality.OneToOne);

    const o2 = mapTo.oneToOne({ output: "opt" });

    expect(o2.input).toBe("req");
    expect(o2.output).toBe("opt");
    expect(o2.cardinality).toBe(MapCardinality.OneToOne);

    const c1 = mapTo.config({ input: "opt" });

    expect(c1.input).toBe("opt");
    expect(c1.output).toBe("opt");
    expect(c1.cardinality).toBe(MapCardinality.OneToMany);
  });

  it("Mapper<I,O,C>", () => {
    const m0 = mapTo.oneToOne();
    const m1 = m0.map<I, I>((i) => i);
    type M1 = MapInputFrom<typeof m1>;
    type MC = MapCardinalityFrom<typeof m1>;

    expect(m1.input).toBe("req");
    expect(m1.output).toBe("req");
    expect(m1.cardinality).toBe("I -> O");
    expect(m1(i)).toEqual(i);

    type cases = [
      Expect<Equal<typeof m1["inputType"], I>>, //
      Expect<Equal<typeof m1["outputType"], I>>, //
      Expect<Equal<M1, I>>, //
      Expect<Equal<MC, "I -> O">> //
    ];
    const cases: cases = [true, true, true, true];
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
    const m = mapTo.oneToOne().map<I, O>((i) => ({
      title: i.title,
      count: i.products.length,
    }));
    const o = m(i);

    expect(o?.title).toBe(i.title);
    expect(o?.count).toBe(3);
  });

  it("1:1 with 1:M conversion setting", () => {
    const mc = mapTo.config({
      output: "req",
      cardinality: "I -> O[]",
    });
    const m = mc.map<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    const o = m(i);

    expect(o.length).toBe(1);
    expect(o[0]?.title).toBe(i.title);
    expect(o[0]?.count).toBe(3);
  });

  it("1:M conversion ", () => {
    const m = mapTo
      .config({ output: "req", cardinality: "I -> O[]" })
      .map<I, O>((i) => [{ title: i.title, count: i.products.length }]);
    const o = m([i, i2]);
    type RT = ReturnType<typeof m>;

    expect(o.length).toBe(2);
    o.map((item) => expect("title" in item).toBeTruthy());

    type cases = [Expect<Equal<RT, O[] | [O, ...O[]]>>];
    const cases: cases = [true];
  });

  it("1:M conversion with filtering", () => {
    const m = mapTo<I, O>((i) =>
      i.title === "i2" ? [{ title: i.title, count: i.products.length }] : []
    );
    const o = m([i, i2]);

    expect(o.length).toBe(1);
    o.map((item) => expect(item.title).toBe("i2"));
  });

  it("1:M conversion with filtering and debugging", () => {
    const m = mapTo
      .config({ debug: true })
      .map<I, O>((i) => (i.title === "i2" ? [{ title: i.title, count: i.products.length }] : []));
    const o = m([i, i2]);

    expect(o.length).toBe(1);
    o.map((item) => expect(item.title).toBe("i2"));
  });

  it("M:1 conversion", () => {
    const m = mapTo.config({ output: "req", cardinality: "I[] -> O" }).map<I, O>((i) => {
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
    const m = mapTo.oneToOne().map<I, O>((i) => ({ title: i.title, count: i.products.length }));
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
