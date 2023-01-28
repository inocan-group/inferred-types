import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type { Keys , ExpectExtends, UnknownObject, TupleToUnion } from "src/types";
import { defineType, keys } from "src/runtime";
import { ref } from "vue";
import { isRef } from "src/runtime/type-guards/isRef";
import { NumericKeys } from "src/types/lists/NumericKeys";

describe("NumericKeys<T>", () => {

  it("happy path", () => {
    type StringArr = ["foo", "bar", "baz"];
    type StrArr_RO = readonly ["foo", "bar", "baz"];
    type NumericArr = [1,2,3];
    type Numeric = NumericKeys<NumericArr>;
    type Str = NumericKeys<StringArr>;
    type Str_RO = NumericKeys<StrArr_RO>;
    type Empty = NumericKeys<[]>;

    type cases = [
      //
      Expect<Equal<Numeric, readonly ["0", "1", "2"]>>,
      Expect<Equal<Str, readonly ["0", "1", "2"]>>,
      Expect<Equal<Str_RO, readonly ["0", "1", "2"]>>,
      Expect<Equal<Empty, readonly []>>,
    ];
    
    const cases: cases = [ true, true, true, true ];
  });
});


describe("Keys<T>", () => {
  it("happy path", () => {
    type Empty = {};
    type Obj = { foo: 1; bar: 2 };
    type Obj_RO = Readonly<Obj>;

    type None = Keys<Empty>;
    type Foobar = Keys<Obj>;
    type RoFoobar = Keys<Obj_RO>;

    type Convertible1 = TupleToUnion<Foobar>;
    type Convertible2 = TupleToUnion<RoFoobar>;

    type cases = [
      // any object with no keys resolves simply to an empty array
      Expect<Equal<None, readonly []>>,
      // once keys are involved we are not guaranteed ordering of keys
      Expect<ExpectExtends<
        (readonly ["foo", "bar"] | readonly ["bar", "foo"]), 
        Foobar
      >>,
      Expect<ExpectExtends<
        (readonly ["foo", "bar"] | readonly ["bar", "foo"]), 
        RoFoobar
      >>,

      Expect<Equal<Convertible1, "foo" | "bar">>,
      Expect<Equal<Convertible2, "foo" | "bar">>,
    ];
    
    const cases: cases = [ true, true, true, true, true ]; 
  });

  
  it("using numeric keys", () => {
    type StringArr = ["foo", "bar", "baz"];
    type StrArr_RO = readonly ["foo", "bar", "baz"];
    type NumericArr = [1,2,3];
    type Numeric = Keys<NumericArr>;
    type Str = Keys<StringArr>;
    type Str_RO = Keys<StrArr_RO>;
    type Empty = Keys<[]>;

    type Convertible1 = TupleToUnion<Str>;
    type Convertible2 = TupleToUnion<Str_RO>;
    type Convertible3 = TupleToUnion<[]>;
    type Convertible4 = TupleToUnion<readonly []>;

    type cases = [
      //
      Expect<Equal<Numeric, readonly ["0", "1", "2"] >>,
      Expect<Equal<Str, readonly ["0", "1", "2"]>>,
      Expect<Equal<Str_RO, readonly ["0", "1", "2"]>>,
      Expect<Equal<Empty, readonly []>>,

      Expect<Equal<Convertible1, "0" | "1" | "2">>,
      Expect<Equal<Convertible2, "0" | "1" | "2">>,
      Expect<Equal<Convertible3, string>>,
      Expect<Equal<Convertible4, string>>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true, true, true  ];
  });
  
});

describe("keys() utility on object", () => {
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
    
    expect("value" in obj).toBe(true);
    expect("__v_isRef" in obj).toBe(true);
    expect(isRef(obj)).toBe(true);
    
    // props at runtime not visible on type
    expect(
      (k as readonly any[]).includes("__v_isRef"),
      `VueJS ref looks like: ${k}`
    ).toBe(true);

    type cases = [
      Expect<ExpectExtends<
        (readonly [symbol, "value"]) |
        (readonly ["value", symbol]), 
        typeof k
      >>
    ];
    const cases: cases = [ true ];

  });
  

  it("empty object results in [] type", () => {
    const empty = {};
    const anyObject = {} as Record<string, any>;
    const t1 = keys(empty);
    const t2 = keys(anyObject);
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
