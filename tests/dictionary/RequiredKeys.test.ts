import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import type { RequiredKeys,First, Narrowable, RequiredKeysTuple, HasSameKeys } from "inferred-types";

type Test = { title: string; value: number; color?: string };

describe("RequiredKeys<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type T = RequiredKeys<Test>;

    type cases = [Expect<Equal<T, "title" | "value">>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("basic usage with a value filter", () => {
    type T1 = RequiredKeys<Test, string>;
    type T2 = RequiredKeys<Test, number>;

    type cases = [Expect<Equal<T1, "title">>, Expect<Equal<T2, "value">>];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("typed explicitly", () => {
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
    const fn = <T extends Record<string, Narrowable>, A extends readonly T[]>(arr: A): A => arr;

    const _v = fn(genericArr);
    type V = typeof _v;
    type T1 = RequiredKeys<First<V>>;
    type T2 = RequiredKeys<First<V>, string>;

    type cases = [
      Expect<Equal<T1, "id" | "name" | "title">>, //
      Expect<Equal<T2, "name" | "title">>
    ];
    const cases: cases = [true, true];
  });
});

describe("RequiredKeysTuple<T, V>", () => {
  it("basic usage without filtering on value", () => {
    type T = RequiredKeysTuple<Test>;

    type cases = [
      //
      Expect<Equal<T, ["title", "value"]>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });


  it("typed explicitly", () => {
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
    const fn = <T extends Record<string, Narrowable>, A extends readonly T[]>(arr: A): A => arr;

    const _v = fn(genericArr);
    type V = typeof _v;
    type T1 = RequiredKeysTuple<First<V>>;

    type cases = [
      Expect<HasSameKeys<T1, ["id" , "name" , "title"]>>, //
    ];
    const cases: cases = [true];
  });
});
