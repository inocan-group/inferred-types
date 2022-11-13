import { describe, expect, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { dictArr, keys, literal } from "src/runtime";

type O = {
  id: number;
  name: string;
  title: string;
  cost?: number;
  color?: string;
};

const genericArr: O[] = [
  { id: 1, name: "foo", title: "one", cost: 15 },
  { id: 2, name: "bar", title: "one" },
  { id: 3, name: "baz", title: "two", cost: 45, color: "green" },
];

const literalArr = [
  literal({ id: 1, name: "foo", title: "one", cost: 15 }),
  literal({ id: 2, name: "bar", title: "one" }),
  literal({ id: 3, name: "baz", title: "two", cost: 45, color: "green" }),
];

const wideArr = [
  { id: 1, name: "foo", title: "one", cost: 15 },
  { id: 2, name: "bar", title: "one" },
  { id: 3, name: "baz", title: "two", cost: 45, color: "green" },
];

describe("dictArr() utility API", () => {
  it("returns an API when passed the array", () => {
    const r = dictArr(...genericArr);
    type R = typeof r;
    // runtime checks
    expect(typeof r.toLookup).contains("function");
    expect(typeof r.unique).contains("function");
    expect(typeof r.count).contains("function");
    expect(typeof r.sum).contains("function");
    expect(typeof r.length).contains("number");

    // type checks
    type ToLookupParam = Parameters<R["toLookup"]>[0];
    type UniqueParam = Parameters<R["unique"]>[0];
    type CountParam = Parameters<R["count"]>[0];
    type SumParam = Parameters<R["sum"]>[0];

    // type ToLookupReturn = ReturnType<R["toLookup"]>;

    type cases = [
      Expect<Equal<ToLookupParam, "name" | "title">>,
      Expect<Equal<UniqueParam, "id" | "name" | "title" | "cost" | "color">>,
      Expect<Equal<CountParam, "cost" | "color">>,
      Expect<Equal<SumParam, "id" | "cost">>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("toLookup() creates type-strong lookup", () => {
    const g = dictArr(...genericArr);
    const l = dictArr(...literalArr);
    const pl = dictArr(...wideArr);
    const byNameG = g.toLookup("name");
    const byNameL = l.toLookup("name");
    const byNamePL = pl.toLookup("name");
    const kg = keys(byNameG);
    const kl = keys(byNameL);
    const kpl = keys(byNamePL);
    expect(kg).contains("foo");
    expect(kg).contains("bar");
    expect(kg).contains("baz");

    expect(kl).contains("foo");
    expect(kl).contains("bar");
    expect(kl).contains("baz");

    expect(kpl).contains("foo");
    expect(kpl).contains("bar");
    expect(kpl).contains("baz");

    const fooG = genericArr.find((i) => i.name === "foo");
    expect(byNameG.foo).toEqual(fooG);

    const fooL = literalArr.find((i) => i.name === "foo");
    expect(byNameL.foo).toEqual(fooL);
  });

  it("summarization works", () => {
    const r = dictArr(...genericArr);
    expect(r.sum("cost")).toBe(60);
  });

  it("counting of non-required props works", () => {
    const r = dictArr(...genericArr);
    expect(r.count("color")).toBe(1);
    expect(r.count("cost")).toBe(2);
  });

  it("uniqueness", () => {
    const r = dictArr(...genericArr);
    const color = r.unique("color");
    const title = r.unique("title");

    expect(color.isUnique).toBeTruthy();
    expect(color.includedUndefined).toBeTruthy();
    expect(color.values).toEqual([undefined, "green"]);
    expect(title.isUnique).toBeFalsy();
    expect(title.values).toEqual(["one", "two"]);
  });
});
