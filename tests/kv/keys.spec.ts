import { describe, it, expect } from "vitest";

import { Keys } from "src/types/Keys";
import type { Expect, Equal } from "@type-challenges/utils";
import { defineType, keys } from "src/runtime";
import { TupleToUnion } from "src/types/type-conversion/TupleToUnion";
import { UnknownObject } from "src/types";

describe("Keys<T>", () => {
  it("happy path", () => {
    type None = Keys<{}>;
    type Foobar = Keys<{ foo: 1; bar: 2 }>;
    type RoFoobar = Keys<Readonly<{ foo: 1; bar: 2 }>>;

    type cases = [
      //
      Expect<Equal<None, []>>,
      Expect<Equal<Foobar, readonly ["foo", "bar"] & string[]>>,
      Expect<Equal<RoFoobar, readonly ["foo", "bar"] & string[]>>,
    ];
    
    const cases: cases = [ true, true, true ]; 
  });
});

describe("keys() utility", () => {
  it("with just object passed in, keys are extracted as expected", () => {
    const obj = defineType({ id: "123" })({ color: "red", isFavorite: false });
    const k = keys(obj); 

    expect(k).toHaveLength(3);
    expect(k).toContain("id"); 
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    type cases = [
      Expect<Equal<TupleToUnion<typeof k>, TupleToUnion<["id", "color",  "isFavorite"]>>> //
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("empty object results in [] type", () => {
    const t1 = keys({});
    const t2 = keys({} as Record<string, any>);
    const t3 = keys({} as UnknownObject);
    const t4 = keys({} as Record<string, string>);

    expect(t1).toEqual([]);
    expect(t2).toEqual([]);

    type cases = [
      Expect<Equal<typeof t1, []>>,
      Expect<Equal<typeof t2, []>>,
      Expect<Equal<typeof t3, []>>,
      Expect<Equal<typeof t4, []>>,
    ];
    const cases: cases = [true, true, true, true];

  });
});
