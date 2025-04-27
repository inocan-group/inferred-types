import { describe, it, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";

import { AsArray } from "inferred-types/types";
import { asArray } from "inferred-types/runtime";

describe("AsArray<T>", () => {
  it("happy path", () => {
    type T1 = AsArray<4>;
    type T2 = AsArray<[4, 5, 6]>;
    type T3 = AsArray<T2>;

    type cases = [
      //
      Expect<Test<T1, "equals",  [4]>>,
      Expect<Test<T2, [4, 5, "equals",  6]>>,
      Expect<Test<T3, [4, 5, "equals",  6]>>,
    ];
    const cases: cases = [true, true, true];
  });


  it("using with a union tuple type", () => {
    type X = (readonly unknown[] | [readonly unknown[]]);
    type T1 = AsArray<X>;

    type cases = [
      Expect<Test<T1, "equals",  unknown[] | [unknown[]]>>
    ];
    const cases: cases = [true];

  });

});

describe("asArray() function", () => {
  it("non-array is returned as an array", () => {
    const i = "a";
    const o = asArray(i);
    type O = typeof o;

    // run-time
    expect(o).toEqual(["a"]);
    // design-time
    type cases = [
      Expect<Test<O, "equals",  ["a"]>>, //
    ];
    const cases: cases = [true];
  });

  it("array is returned as an array", () => {
    const i = ["a"];
    const o = asArray(i);
    type O = typeof o;

    // run-time
    expect(o).toEqual(["a"]);
    // design-time
    type cases = [Expect<Test<O, "equals",  string[]>>];
    const cases: cases = [true];
  });


  it("handling non-array element which presents as undefined", () => {
    type T = string | undefined;
    const i = undefined;
    const i2: T = undefined;
    const o = asArray(i);
    const o2 = asArray(i2 as T);
    type O = typeof o;
    type O2 = typeof o2;

    // run-time
    expect(o).toEqual([]);
    expect(o2).toEqual([]);
    // design-time
    type cases = [
      Expect<Test<O, "equals",  []>>, //
      Expect<Test<O2, "equals",  [] | [string]>>,
    ];
    const cases: cases = [true, true];
  });

  it("handling array element which contains undefined is unaffected", () => {
    type T = string | undefined;
    const i = [undefined, "foobar"];
    const i2: T[] = [undefined, "foobar"];
    const o = asArray(i);
    const o2 = asArray(i2 as T[]);
    type O = typeof o;
    type O2 = typeof o2;

    // run-time
    expect(o).toEqual([undefined, "foobar"]);
    expect(o2).toEqual([undefined, "foobar"]);
    // design-time
    type cases = [
      Expect<Test<O, "equals",  (string | undefined)[]>>, //
      Expect<Test<O2, "equals",  T[]>>
    ];
    const cases: cases = [true, true];
  });
});
