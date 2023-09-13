import { describe, it, expect } from "vitest";
import {  asArray } from "../../src/runtime";
import { Equal, Expect } from "@type-challenges/utils";
import { AsArray } from "../../src/types/base";

describe("AsArray<T>", () => {
  it("happy path", () => {
    type T1 = AsArray<4>;
    type T2 = AsArray<[4, 5, 6]>;

    type cases = [
      //
      Expect<Equal<T1, [4]>>,
      Expect<Equal<T2, [4, 5, 6]>>,
    ];
    const cases: cases = [true, true];
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
      Expect<Equal<O,  ["a"] >>, //
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
    type cases = [Expect<Equal<O, string[]>>];
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
      Expect<Equal<O, []>>, //
      Expect<Equal<O2, [] | [string]>>,
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
      Expect<Equal<O, (string | undefined)[]>>, //
      Expect<Equal<O2, T[]>>
    ];
    const cases: cases = [true, true];
  });
});
