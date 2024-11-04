/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { LeftRight, UniqueKeys, Left, Right, HasSameValues , UniqueKeysUnion } from "@inferred-types/types";
import { uniqueKeys } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UniqueKeys<L,R>", () => {

  it("happy path for UniqueKeysUnion<L,R>", () => {
    type Obj = UniqueKeysUnion<{foo: 1; bar: 2}, {bar: 5; baz: 42}>;
    type LeftEmpty = UniqueKeysUnion<{}, {bar: 5; baz: 42}>;
    type RightEmpty = UniqueKeysUnion<{bar: 5; baz: 42}, NonNullable<unknown>>;
    type Tup = UniqueKeysUnion<[1,2,3], [3,4,5,6]>;

    type cases = [
      Expect<Equal<Obj, LeftRight<"foo", "baz">>>,
      Expect<Equal<LeftEmpty, LeftRight<never, "bar" | "baz">>>,
      Expect<Equal<RightEmpty, LeftRight<"bar" | "baz", never>>>,
      Expect<Equal<Tup, LeftRight<never, "3">>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });


  it("happy path for UniqueKey<L,R>", () => {
    type Obj = UniqueKeys<{foo: 1; bar: 2}, {bar: 5; baz: 42}>;
    type LeftEmpty = UniqueKeys<{}, {bar: 5; baz: 42}>; // order not assured
    type RightEmpty = UniqueKeys<{bar: 5; baz: 42}, NonNullable<unknown>>;
    type Tup = UniqueKeys<[1,2,3], [3,4,5,6]>;

    type cases = [
      Expect<Equal<Obj, LeftRight<["foo"], ["baz"]>>>,

      Expect<Equal<Left<LeftEmpty>, []>>,
      Expect<HasSameValues<Right<LeftEmpty>, ["bar", "baz"]>>,

      Expect<Equal<Right<RightEmpty>, []>>,
      Expect<HasSameValues<Left<RightEmpty>, ["bar", "baz"]>>,

      Expect<Equal<Tup, LeftRight<[], [3]>>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
  });


});

describe("uniqueKeys(left, right)", () => {

  it("object", () => {
    const obj = uniqueKeys(
      {foo: 1, bar: 2},
      {bar: 5, baz: 42}
    );
    expect(obj).toEqual(["LeftRight", ["foo"], ["baz"]]);
  });

});

