import { MapTo } from "src/types/dictionary";
import { describe, expect, it } from "vitest";

import type { Expect, Equal } from "@type-challenges/utils";
import { mapTo } from "src/utility/dictionary/mapTo";

type I = { title: string; color: string; products: string[] };
const i: I = { title: "Test", color: "green", products: ["foo", "bar", "baz"] };

type O = { title: string; count: number; unnecessary?: number };

describe("MapTo<T> type util", () => {
  it("1:1 conversion", () => {
    const m: MapTo<I, O> = (i) => [
      {
        title: i.title,
        count: i.products.length,
      },
    ];
    type M = typeof m;
    type cases = [Expect<Equal<M, MapTo<I, O>>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
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
});
