import { TupleToUnion } from "~/types";
import { Expect, Equal } from "@type-challenges/utils";

describe("TupleToUnion<T> type utility", () => {
  it("an array of literals is converted ot a tuple", () => {
    const arr = [1, 2, 5] as const;
    type Arr = typeof arr;
    type Union = TupleToUnion<Arr>;

    type cases = [
      //
      Expect<Equal<Union, 1 | 2 | 5>>
    ];

    const c: cases = [true];
    expect(c).toBe(c);
  });
});
