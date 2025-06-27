import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { defineTuple, shift } from "inferred-types/runtime";
import { Shift, Test } from "inferred-types/types";

describe("Shift<T>", () => {

  it("shift a tuple", () => {
    type Bar = Shift<["foo", "bar"]>;


    type cases = [
      Expect<Test<Bar, "equals",  ["bar"]>>,
    ]
  });


  it("Shift empty Tuple", () => {
    type Nada = Shift<[]>;

    type cases = [
      Expect<Test<Nada, "equals",  undefined>>
    ];
  });


  it("shift a string", () => {
    type Bar = Shift<"#bar">;

    type cases = [
      Expect<Test<Bar, "equals",  "bar">>,
    ]
  })


  it("shift an empty string", () => {
    type Empty = Shift<"">;

    type cases = [
      Expect<Test<Empty, "equals",  undefined>>
    ];
  });


});

describe("shift()", () => {

  it("happy path", () => {
    const arr_ro = [1, 2, 3] as const;
    let arr = defineTuple(1, 2, 3);

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
      Expect<Test<typeof val, "equals",  1>>,
      Expect<Test<typeof val2, "equals",  1>>,
      Expect<Test<typeof empty, "equals",  undefined>>,
      Expect<Test<typeof wideArray, "equals",  undefined | string>>,
    ];
  });


  it("The list value is never mutated regardless of whether property is readonly", () => {
    const arr_ro = [1, 2, 3] as const;
    let arr = defineTuple(1, 2, 3);

    shift(arr_ro);
    shift(arr);

    expect(arr_ro, "readonly variable unaffected").toEqual([1, 2, 3]);
    expect(arr, "mutable tuple is changed").toEqual([1, 2, 3]);

  });


});





