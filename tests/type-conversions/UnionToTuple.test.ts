import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UnionToTuple,  HasSameKeys } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("UnionToTuple<U>", () => {

  it("happy path", () => {
    type Foobar = UnionToTuple<"foo" | "bar">;
    type OneTwoThree = UnionToTuple<1 | 2 | 3>;
    type Mixed =  UnionToTuple<1 | 2 | "foo" | "bar">;

    type cases = [
      Expect<HasSameKeys<Foobar, ["foo", "bar"]>>,
      Expect<HasSameKeys<OneTwoThree, [1,2,3]>>,
      Expect<HasSameKeys<Mixed, [1,2,"foo","bar"]>>,
    ];
    const cases: cases = [ true, true, true ];
  });



  it("will convert a Union array into a tuple correctly", () => {
    type UnionArr = (1|2|3)[];
    type Tup = UnionToTuple<UnionArr>;

    // @ts-ignore
    type cases = [
      Expect<Equal<Tup, [1,2,3]>>
    ];

  });


});
