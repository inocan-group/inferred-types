import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { defineTuple,  shift } from "inferred-types";
import {  Shift } from "inferred-types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Shift<T>", () => {

  it("shift a tuple", () => {
    type Bar = Shift<["foo", "bar"]>;


    type cases = [
      Expect<Equal<Bar, ["bar"]>>,
    ]
    const cases: cases = [true];
  });


  it("Shift empty Tuple", () => {
    type Nada = Shift<[]>;

    type cases = [
      Expect<Equal<Nada, undefined>>
    ];
    const cases: cases = [
      true
    ];

  });


  it("shift a string", () => {
    type Bar = Shift<"#bar">;

    type cases = [
      Expect<Equal<Bar, "bar">>,
    ]
    const cases: cases = [true];
  })


  it("shift an empty string", () => {
    type Empty = Shift<"">;

    type cases = [
      Expect<Equal<Empty, undefined>>
    ];
    const cases: cases = [ true ];

  });


});

describe("shift()", () => {

  it("happy path", () => {
    const arr_ro = [1,2,3] as const;
    let arr = defineTuple(1,2,3);

    const val = shift(arr_ro);
    const val2 = shift(arr);
    const empty = shift(defineTuple());
    let str: string[] = [];
    const wideArray = shift(str);

    expect(val).toBe(1);
    expect(val2).toBe(1);
    expect(empty).toBe(undefined);
    expect(wideArray).toBe(undefined);

    type cases = [
      Expect<Equal<typeof val, 1>>,
      Expect<Equal<typeof val2, 1>>,
      Expect<Equal<typeof empty, undefined>>,
      Expect<Equal<typeof wideArray, undefined | string>>,
    ];
    const cases: cases = [ true, true, true, true ];
  });


  it("The list value is never mutated regardless of whether property is readonly", () => {
    const arr_ro = [1,2,3] as const;
    let arr = defineTuple(1,2,3);

    shift(arr_ro);
    shift(arr);

    expect(arr_ro, "readonly variable unaffected").toEqual([1,2,3]);
    expect(arr, "mutable tuple is changed").toEqual([1,2,3]);

  });


});





