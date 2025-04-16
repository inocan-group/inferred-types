import type { Expect, Equal } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";
import type {
  Keys,
  NumericKeys,
  EmptyObject,
  ObjectKey,
  Dictionary,
  HasSameValues,
  HasSameKeys,
} from "inferred-types/types";
import { keysOf, narrow } from "inferred-types/runtime";

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
  type FooBar_RO = Keys<Readonly<OBJ>>;
  type FooBar_EXT = Keys<{ foo: 1; bar: 2; [x: string]: unknown }>;
  type EmptyObj = Keys<EmptyObject>;
  type Uno = Keys<{baz: 3}>;
  type StrRec = Keys<Record<string, string>>;
  type UnionRec = Keys<Record<"foo" | "bar", number>>;
  type KeyVal = Keys<Dictionary>;

  type Curly = Keys<EmptyObject>;

  it("object resolution", () => {
    type cases = [
      Expect<Equal<EmptyObj, []>>,
      Expect<Equal<Curly, []>>,
      Expect<HasSameValues<Foobar, ["foo", "bar"]>>,
      Expect<HasSameValues<FooBar_RO, ["foo", "bar"]>>,
      Expect<HasSameValues<FooBar_EXT, ["foo", "bar"]>>,
      Expect<HasSameValues<Uno, ["baz"]>>,

      Expect<Equal<StrRec, string[]>>,
      Expect<Equal<UnionRec, ["foo", "bar"]>>,
      Expect<Equal<KeyVal, ObjectKey[]>>,
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




});

describe("runtime keysOf() utility on object", () => {
  it("with just object passed in, keys are extracted as expected", () => {
    const obj = {
        id: 123,
        color: "blue",
        isFavorite: false
    } as { id: 123; color: string; isFavorite: boolean};


    const k = keysOf(obj);
    const k2 = keysOf({} as object);
    type K = typeof k;

    expect(k, "The object should have 3 keys: ${Json}").toHaveLength(3);
    expect(k).toContain("id");
    expect(k).toContain("color");
    expect(k).toContain("isFavorite");

    expect(k2).toEqual([]);

    type cases = [
      Expect<HasSameValues<K,  ["id", "color", "isFavorite" ]>>,
      Expect<Equal<typeof k2, []>>
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
