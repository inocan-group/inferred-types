import { describe, it, expect } from "vitest";
import { asArray } from "src/runtime";
import { Equal, Expect } from "@type-challenges/utils";

describe("asArray() function", () => {
  it("non-array is returned as an array", () => {
    const i = "a";
    const o = asArray(i);
    type O = typeof o;

    // run-time
    expect(o).toEqual(["a"]);
    // design-time
    type cases = [Expect<Equal<O, string[]>>];
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

  it("non-array literal is returned as an array", () => {
    const i = "a" as const;
    const o = asArray(i, false);
    const o2 = asArray(i, true);

    type O = typeof o;
    type O2 = typeof o2;

    // run-time
    expect(o).toEqual(["a"]);
    // design-time
    type cases = [
      Expect<Equal<O, "a"[]>>, //
      Expect<Equal<O2, string[]>>
    ];
    const cases: cases = [true, true];
  });

  it("handling non-array element which presents as undefined", () => {
    type T = string | undefined;
    const i = undefined;
    const i2: T = undefined;
    const o = asArray(i);
    const o2 = asArray(i2 as T);
    const o3 = asArray(i2 as T, false);
    type O = typeof o;
    type O2 = typeof o2;
    type O3 = typeof o3;

    // run-time
    expect(o).toEqual([]);
    expect(o2).toEqual([]);
    // design-time
    type cases = [
      Expect<Equal<O, unknown[]>>, //
      // TODO: would be nice to extract the unknown[] part of the union
      Expect<Equal<O2, unknown[] | string[]>>,
      Expect<Equal<O3, unknown[] | string[]>>
    ];
    const cases: cases = [true, true, true];
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
