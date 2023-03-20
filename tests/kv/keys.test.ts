/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type { 
  Keys,
  TupleToUnion, 
  NumericKeys,
  DoesExtend,
} from "src/types";
import { defineType, keysOf, isRef, narrow } from "src/runtime";
import { ref } from "vue";

describe("NumericKeys<T>", () => {

  it("happy path", () => {
    type StringArr = ["foo", "bar", "baz"];
    type StrArr_RO = readonly ["foo", "bar", "baz"];
    type Numeric = NumericKeys<[1,2,3]>;
    type Str = NumericKeys<StringArr>;
    type Str_RO = NumericKeys<StrArr_RO>;
    type Empty = NumericKeys<[]>;
    type Empty_RO = NumericKeys<readonly []>;

    type cases = [
      Expect<Equal<Numeric, [0,1,2]>>,
      Expect<Equal<Str, [0,1,2]>>,
      Expect<Equal<Str_RO,  readonly [0,1,2]>>,
      Expect<Equal<Empty,  number[]>>,
      Expect<Equal<Empty_RO,  readonly number[]>>,
    ];
    
    const cases: cases = [ true, true, true, true, true ];
  });
});


describe("Keys<T>", () => {
  it("happy path", () => {
    type Empty = object;
    type Obj = { foo: 1; bar: 2 };
    type Obj_RO = Readonly<Obj>;

    type None = Keys<Empty>;
    type None2 = Keys<Empty, true>;
    type Foobar = Keys<Obj>;
    type RoFoobar = Keys<Obj_RO>;

    type Convertible1 = TupleToUnion<Foobar>;
    type Convertible2 = TupleToUnion<RoFoobar>;

    type cases = [
      // any object with no keys resolves simply to an empty array
      Expect<Equal<None,  (string | symbol)[]>>,
      Expect<Equal<None2,  string[]>>,
      // once keys are involved we are not guaranteed ordering of keys
      DoesExtend<Foobar, readonly ["foo", "bar"]>,
      DoesExtend<RoFoobar, readonly ["foo", "bar"]>,

      Expect<Equal<Convertible1, "foo" | "bar">>,
      Expect<Equal<Convertible2, "foo" | "bar">>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true ]; 
  });

  
  it("Key<T> where T is an array/tuple", () => {
    type StringArr = ["foo", "bar", "baz"];
    type StrArr_RO = readonly ["foo", "bar", "baz"];
    type NumericArr = [1,2,3];
    type Numeric = Keys<NumericArr>;
    type Str = Keys<StringArr>;
    type Str2 = NumericKeys<StringArr>;
    type Str_RO = Keys<StrArr_RO>;
    type Empty = Keys<[]>;

    type Convertible1 = TupleToUnion<Str>;
    type Convertible2 = TupleToUnion<Str_RO>;
    type Convertible3 = TupleToUnion<[]>;

    type cases = [
      //
      Expect<Equal<Numeric,  [0,1,2] >>,
      Expect<Equal<Str,  [0,1,2]>>,
      Expect<Equal<Str2,  [0,1,2]>>,
      Expect<Equal<Str_RO,  readonly [0,1,2]>>,
      Expect<Equal<Empty,  number[]>>,

      Expect<Equal<Convertible1, 0 | 1 | 2>>,
      Expect<Equal<Convertible2, 0 | 1 | 2>>,
      Expect<Equal<Convertible3, never>>,
    ];
    
    const cases: cases = [ 
      true, true, true, true, true, 
      true, true, true  
    ];
  });
  
});

describe("keys() utility on object", () => {
  it("with just object passed in, keys are extracted as expected", () => {
    const obj = defineType({ id: "123" })({ color: "red", isFavorite: false });
    const k = keysOf(obj); 
    type K = typeof k;

    expect(k).toHaveLength(3);
    expect(k).toContain("id"); 
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    type cases = [
      Expect<Equal<
        K, 
        [0,1,2]
      >> //
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  
  it("Runtime check of keys for an array", () => {
    const arr = narrow([1,2,3]);
    const keys = keysOf(arr);
    expect(keys).toEqual([0,1,2]);
    
    type cases = [
      Expect<Equal<typeof keys, readonly [0,1,2]>>,
    ];
    const cases: cases = [ true ];
  });
  
  
  it("keys of a VueJS Ref<T>", () => {
    const obj = ref({foo: 1, bar: 2});
    const k = keysOf(obj);
    
    expect("value" in obj).toBe(true);
    expect("__v_isRef" in obj).toBe(true);
    expect(isRef(obj)).toBe(true);
    
    // props at runtime not visible on type
    expect(
      (k as readonly any[]).includes("__v_isRef"),
      `VueJS ref looks like: ${k}`
    ).toBe(false);

    expect(k).toEqual(["value"]);

    type cases = [
      Expect<Equal<["value"],typeof k>>,//
    ];

    const cases: cases = [ true ];
  });

  it("empty object results in [] type", () => {
    const empty = keysOf({});
    const empty2 = keysOf({}, true);
    const anyObject = keysOf({} as Record<string, any>);
    const recStrStr = keysOf({} as Record<string, string>);


    expect(empty).toEqual([]);
    expect(anyObject).toEqual([]);

    type cases = [
      Expect<Equal<typeof empty, readonly (string|symbol)[]>>,
      Expect<Equal<typeof empty2, readonly string[]>>,
      Expect<Equal<typeof anyObject, readonly string[]>>,
      Expect<Equal<typeof recStrStr, readonly string[]>>,
    ];
    const cases: cases = [true, true, true, true];

  });
});
