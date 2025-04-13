import { Equal, Expect } from "@type-challenges/utils";
import {  UntilLast } from "inferred-types/types";
import { describe, it } from "vitest";

describe("UntilLast<TText, TFind, [TBreak]>", () => {

  it("happy path", () => {
    type T1 = UntilLast<`Array<Record<string, string>>`, ">">;
    type T2 = UntilLast<`Array<Record<string, string>>  `, ">">;
    type T3 = UntilLast<`Array<Record<string, string>>  abc`, ">">;

    type T4 = UntilLast<`Array<Record<string, string >>  `, ">">;

    type cases = [
        Expect<Equal<T1, "Array<Record<string, string>">>,
        Expect<Equal<T2, "Array<Record<string, string>">>,
        Expect<Equal<T3, "Array<Record<string, string>">>,

        Expect<Equal<T4, "Array<Record<string, string >">>,
    ];
  });


  it("with break character", () => {
    type T1 = UntilLast<
        `Array<Record<string, string>> | Array<string>`,
        ">",
        "|"
    >;

    type cases = [
        Expect<Equal<T1, "Array<Record<string, string>">>,
    ];
  });




});
