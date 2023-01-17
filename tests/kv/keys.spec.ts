import { describe, it, expect } from "vitest";

import { Keys } from "src/types/Keys";
import type { Expect, Equal } from "@type-challenges/utils";
import { defineType, keys } from "src/runtime";
import { TupleToUnion } from "src/types/type-conversion/TupleToUnion";
import { ExpectExtends, UnknownObject } from "src/types";
import { ref } from "vue";
import { isRef } from "src/runtime/type-guards/isRef";

describe("Keys<T>", () => {
  it("happy path", () => {
    type None = Keys<{}>;
    type Foobar = Keys<{ foo: 1; bar: 2 }>;
    type RoFoobar = Keys<Readonly<{ foo: 1; bar: 2 }>>;

    type cases = [
      //
      Expect<Equal<None, readonly []>>,
      Expect<Equal<Foobar, readonly ["foo", "bar"]>>,
      Expect<Equal<RoFoobar, readonly ["foo", "bar"]>>,
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

  
  it("keys of a VueJS Ref<T>", () => {
    const obj = ref({foo: 1, bar: 2});
    const k = keys(obj);
    
    expect(isRef(obj)).toBe(true);
    // props at runtime not visible on type
    expect(k.includes("__v_isRef" as any)).toBe(true);
    type cases = [
      Expect<ExpectExtends<readonly [symbol, "value"], typeof k>>
    ];
    const cases: cases = [ true ];

  });
  

  it("empty object results in [] type", () => {
    const t1 = keys({});
    const t2 = keys({} as Record<string, any>);
    const t3 = keys({} as UnknownObject);
    const t4 = keys({} as Record<string, string>);

    expect(t1).toEqual([]);
    expect(t2).toEqual([]);

    type cases = [
      Expect<Equal<typeof t1, readonly []>>,
      Expect<Equal<typeof t2, readonly []>>,
      Expect<Equal<typeof t3, readonly []>>,
      Expect<Equal<typeof t4, readonly []>>,
    ];
    const cases: cases = [true, true, true, true];

  });
});
