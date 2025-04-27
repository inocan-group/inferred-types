import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UnionToTuple, HasSameKeys, UnionArrayToTuple } from "inferred-types/types";



describe("UnionToTuple<U>", () => {

  it("happy path", () => {
    type Foobar = UnionToTuple<"foo" | "bar">;
    type OneTwoThree = UnionToTuple<1 | 2 | 3>;
    type Mixed = UnionToTuple<1 | 2 | "foo" | "bar">;

    type cases = [
      Expect<HasSameKeys<Foobar, ["foo", "bar"]>>,
      Expect<HasSameKeys<OneTwoThree, [1, 2, 3]>>,
      Expect<HasSameKeys<Mixed, [1, 2, "foo", "bar"]>>,
    ];
    const cases: cases = [true, true, true];
  });


  it("unions with boolean", () => {
    type StrBool = UnionToTuple<"foo" | "bar" | boolean>;
    type Wide = UnionToTuple<string | boolean>;

    type cases = [
      Expect<Test<StrBool, ["foo", "bar", "equals",  boolean]>>,
      Expect<Test<Wide, [string, "equals",  boolean]>>
    ];
  });


  it("will convert a Union array into a tuple correctly", () => {
    type UnionArr = (1 | 2 | 3)[];
    type Tup = UnionArrayToTuple<UnionArr>;

    type cases = [
      Expect<Test<Tup, [1, 2, "equals",  3]>>
    ];
  });
});
