/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type { 
  Keys,
  NumericKeys,
  DoesExtend,
  EmptyObject,
} from "src/types/index";
import { defineObj, keysOf, narrow } from "src/runtime/index";

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
    
    const cases: cases = [ true, true, true, true, true ];
  });
});


describe("Keys<T> ", () => {
  type OBJ = { foo: 1; bar: 2 };
  type Foobar = Keys<OBJ>;
  type FooBar_RO =Keys<Readonly<OBJ>>;
  type FooBar_EXT = Keys<{ foo: 1; bar: 2; [x: string]: unknown }>;
  type EmptyObj = Keys<EmptyObject>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  type Curly = Keys<{}>;

  it("object resolution", () => {
    type cases = [
      Expect<Equal<EmptyObj,  readonly []>>,
      Expect<Equal<Curly,  readonly []>>,
      Expect<DoesExtend<Foobar,  readonly ["foo", "bar"]>>,
      Expect<DoesExtend<FooBar_RO,  readonly ["foo", "bar"]>>,
      Expect<DoesExtend<FooBar_EXT,  readonly ["foo", "bar"]>>,
    ];
    
    const cases: cases = [ true, true, true, true, true ]; 
  });

  
  it("array resolution", () => {
    
    type cases = [
      Expect<Equal<Keys<[]>,  readonly []>>,
      Expect<Equal<Keys<string[]>,  readonly []>>,
      Expect<Equal<Keys<[1,2,3]>,  readonly [0,1,2]>>,
      Expect<Equal<Keys<readonly [1,2,3]>,  readonly [0,1,2]>>,
    ];
    const cases: cases = [true, true, true, true];
  });
  
});

describe("runtime keysOf() utility on object", () => {
  it("with just object passed in, keys are extracted as expected", () => {
    const obj = defineObj({ id: "123" })({ color: "red", isFavorite: false });
    const k = keysOf(obj); 
    type K = typeof k;

    expect(k).toHaveLength(3);
    expect(k).toContain("id"); 
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    type cases = [
      Expect<DoesExtend<K, readonly ["id", "color", "isFavorite" ]>> //
    ];
    const cases: cases = [true];
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
