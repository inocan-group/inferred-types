/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type { 
  Keys,
  NumericKeys,
  DoesExtend,
  EmptyObject,
  ObjectKey,
  VueRef,
  KV,
} from "src/types/index";
import { defineObj, keysOf, narrow } from "src/runtime/index";
import { Ref } from "vue";

describe("NumericKeys<T>", () => {

  it("happy path", () => {
    type StringArr = ["foo", "bar", "baz"];
    type StrArr_RO = readonly ["foo", "bar", "baz"];
    type NumArr = [1,2,3];

    type Numeric = NumericKeys<NumArr>;
    type Str = NumericKeys<StringArr>;
    type Str_RO = NumericKeys<StrArr_RO>;
    type Empty = NumericKeys<[]>;
    type Empty_RO = NumericKeys<readonly []>;

    type cases = [
      Expect<Equal<Numeric, [0,1,2]>>,
      Expect<Equal<Str, [0,1,2]>>,
      Expect<Equal<Str_RO,  readonly [0,1,2]>>,
      Expect<Equal<Empty,  number[]>>,
      Expect<Equal<Empty_RO,  number[]>>,
    ];
    
    const cases: cases = [ 
      true, true, true, true, true 
    ];
  });
});


describe("Keys<T> with object targets", () => {
  type OBJ = { foo: 1; bar: 2 };

  type Foobar = Keys<OBJ>;
  type FooBar_RO =Keys<Readonly<OBJ>>;
  type FooBar_EXT = Keys<{ foo: 1; bar: 2; [x: string]: unknown }>;
  type EmptyObj = Keys<EmptyObject>;
  type Uno = Keys<{baz: 3}>;
  type StrRec = Keys<Record<string, string>>;
  type KeyVal = Keys<KV>;

  // eslint-disable-next-line @typescript-eslint/ban-types
  type Curly = Keys<{}>;
  
  it("object resolution", () => {
    type cases = [
      Expect<Equal<EmptyObj, ObjectKey[]>>,
      Expect<Equal<Curly, ObjectKey[]>>,
      Expect<SameKeys<Foobar, ["foo", "bar"]>>,
      Expect<SameKeys<FooBar_RO, ["foo", "bar"]>>,
      Expect<SameKeys<FooBar_EXT, ["foo", "bar"]>>,
      Expect<Equal<Uno, ["baz"]>>,

      Expect<Equal<StrRec, string[]>>,
      Expect<Equal<KeyVal, ObjectKey[]>>,
    ];
    
    const cases: cases = [ 
      true, true, true, true, true, true,
      true, true
    ]; 
  });

  
  it("array resolution", () => {
    type cases = [
      Expect<Equal<Keys<[]>, number[]>>,
      Expect<Equal<Keys<string[]>,  number[]>>,
      Expect<Equal<Keys<[1,2,3]>,  [0,1,2]>>,
      Expect<Equal<Keys< [1,2,3]>,   [0,1,2]>>,
    ];
    const cases: cases = [true, true, true, true];
  });

  
  // we need the "real" Ref<T> and the "fake" VueRef<T>
  // to perform exactly the same
  it("VueRef<T> and Ref<T> key resolution", () => {
    type Obj = Keys<Ref<{foo: 1; bar: 2}>>;
    type Obj2 = Keys<VueRef<{foo: 1; bar: 2}>>;
    type Arr = Keys<Ref<[1,2,3]>>;
    type Arr2 = Keys<VueRef<[1,2,3]>>;
    type Str = Keys<Ref<"hi">>;
    type Str2 = Keys<VueRef<"hi">>;

    type cases = [
      Expect<Equal<Obj, ["value"]>>, 
      Expect<Equal<Obj2, ["value"]>>, 
      Expect<Equal<Arr, ["value"]>>, 
      Expect<Equal<Arr2, ["value"]>>, 
      Expect<Equal<Str, ["value"]>>, 
      Expect<Equal<Str2, ["value"]>>, 
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });
  
  
});

describe("runtime keysOf() utility on object", () => {
  it("with just object passed in, keys are extracted as expected", () => {
    const obj = defineObj({ id: "123" })({ color: "red", isFavorite: false });
    const k = keysOf(obj); 
    const k2 = keysOf({} as object);
    type K = typeof k;

    expect(k).toHaveLength(3);
    expect(k).toContain("id"); 
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    expect(k2).toEqual([]);

    type cases = [
      Expect<DoesExtend<K, readonly ["id", "color", "isFavorite" ]>>,
      Expect<Equal<typeof k2, ObjectKey[]>>
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  
  it("Runtime keysOf() for an array", () => {
    const arr = narrow([1,2,3]);
    const keys = keysOf(arr);
    expect(keys).toEqual([0,1,2]);
    
    type cases = [
      Expect<Equal<typeof keys, readonly [0,1,2]>>,
    ];
    const cases: cases = [ true ];
  });
  


});
