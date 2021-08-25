import { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { UniqueForProp } from "~/types/lists";

describe("UniqueForProp<T, P>", () => {
  it("pull off uniques for 'id' prop", () => {
    const data = [
      { id: 123, color: "blue" },
      { id: 456, color: "red" },
    ] as const;
    type Data = typeof data;
    type U = UniqueForProp<Data, "id">;

    type cases = [
      // the expected keys are part of the union
      Expect<ExpectExtends<U, 123>>,
      Expect<ExpectExtends<U, 456>>,
      // but so is a lot other junk
      Expect<Equal<U, 123 | 456>>
    ];

    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });
});
