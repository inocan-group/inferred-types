import { Keys } from "../src/types/Keys";
import type { Expect, Equal } from "@type-challenges/utils";

describe("Keys<T>", () => {
  it("Keys<T> is shorthand for keyof T", () => {
    const obj = { foo: 1, bar: 3 };
    type O = keyof typeof obj;
    type keys = Keys<typeof obj>;

    type cases = [Expect<Equal<O, keys>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });
});
