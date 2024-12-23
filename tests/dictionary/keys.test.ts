import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type {
  Keys,
  NumericKeys,
  EmptyObject,
  ObjectKey,
  VueRef,
  Dictionary,
  HasSameValues,
  HasSameKeys,
} from "inferred-types/types";
import { defineObj, keysOf, narrow } from "inferred-types/runtime";
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
  type KeyVal = Keys<Dictionary>;

  type Curly = Keys<EmptyObject>;

  it("object resolution", () => {
    type cases = [
      Expect<Equal<EmptyObj, ObjectKey[]>>,
      Expect<Equal<Curly, ObjectKey[]>>,
      Expect<HasSameValues<Foobar, ["foo", "bar"]>>,
      Expect<HasSameValues<FooBar_RO, ["foo", "bar"]>>,
      Expect<HasSameValues<FooBar_EXT, ["foo", "bar"]>>,
      Expect<HasSameValues<Uno, ["baz"]>>,

      Expect<Equal<StrRec, ObjectKey[]>>,
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
      Expect<HasSameKeys<Keys<[1,2,3]>, [0,1,2]>>,
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
      Expect<HasSameValues<Obj, ["value"]>>,
      Expect<HasSameValues<Obj2, ["value"]>>,
      Expect<HasSameValues<Arr, ["value"]>>,
      Expect<HasSameValues<Arr2, ["value"]>>,
      Expect<HasSameValues<Str, ["value"]>>,
      Expect<HasSameValues<Str2, ["value"]>>,
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
      Expect<HasSameValues<K,  ["id", "color", "isFavorite" ]>>,
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
      Expect<Equal<typeof keys, readonly [0,1,2] >>,
    ];
    const cases: cases = [ true ];
  });



});
