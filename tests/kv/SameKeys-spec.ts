import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";
import { SameKeys } from "~/types";

describe("SameKeys<T> utility", () => {

  it("keys must be same type but value can be anything", () => {
    const origin = { id: "abc", favorite: false };
    type O = typeof origin;
    type SK = SameKeys<O>;

    type cases = [
      Expect<Equal<SK, { id: any; favorite: any }>>
    ];
    const c: cases = [true];
    expect(c).toBe(c);

  });

  it("explicit assignment does enforce exhaustion of all keys", () => {
    const origin = { id: "abc", favorite: false };
    const partial = { id: "abc" };
    type O = typeof origin;
    type P = typeof partial;

    type cases = [
      // not surprisingly appling utility to both
      // does not reach equality
      ExpectFalse<Equal<SameKeys<O>, SameKeys<P>>>,
      // but more importantly P can not be assigned to SameKeys<O>
      // this ensures that you'd get a type error with: 
      // `const p: SameKeys<O> = { id: "abc" }`
      ExpectFalse<Equal<SameKeys<O>, P>>,
    ];
    const c: cases = [false, false];
    expect(c).toBe(c);
  });

});
