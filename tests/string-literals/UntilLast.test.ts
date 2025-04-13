import { Equal, Expect } from "@type-challenges/utils";
import { Err, UntilLast } from "inferred-types/types";
import { describe, it } from "vitest";

describe("UntilLast<TText, TFind, [TBreak]>", () => {

  it("happy path", () => {
    type T1 = UntilLast<"Array<Record<string, string>>", ">">;
    type T2 = UntilLast<"Array<Record<string, string>>  ", ">">;
    type T3 = UntilLast<"Array<Record<string, string>>  abc", ">">;

    type T4 = UntilLast<`Array<Record<string, string >>  `, ">">;

    type T5 = UntilLast<"Foo, Bar, Baz, Bax", ",">;

    type cases = [
        Expect<Equal<T1, "Array<Record<string, string>">>,
        Expect<Equal<T2, "Array<Record<string, string>">>,
        Expect<Equal<T3, "Array<Record<string, string>">>,

        Expect<Equal<T4, "Array<Record<string, string >">>,
    ];
  });


  it("with break character", () => {
    type T1 = UntilLast<
        "Array<Record<string, string>> | Array<string>",
        ">",
        "|"
    >;
    type T2 = UntilLast<"Array<string>", ">", "|" >

    type cases = [
        Expect<Equal<T1, "Array<Record<string, string>">>,
        Expect<Equal<T2, "Array<string">>,
    ];
  });

  it("no match with TFind character (no break char)", () => {
    type T1 = UntilLast<"FooBar", ">">;
    type E1 = UntilLast<"FooBar", ">", never, Err<"oops">>;

    type cases = [
      Expect<Equal<T1, "FooBar">>,
      Expect<Equal<E1, Err<"oops">>>,
    ];
  });

  it("no match with TFind character (with break char)", () => {
    type T1 = UntilLast<"FooBar | Baz", ">", "|">;
    type E1 = UntilLast<"FooBar | Baz", ">", "|", Err<"oops">>;

    type cases = [
      Expect<Equal<T1, "FooBar ">>,
      Expect<Equal<E1, Err<"oops">>>,
    ];
  });

});
