import { Equal, Expect } from "@type-challenges/utils";
import {  AfterLast } from "inferred-types/types";
import { describe, it } from "vitest";

describe("AfterLast<TText, TFind, [TBreak]>", () => {

  it("happy path", () => {
    type T1 = AfterLast<`Array<Record<string, string>>`, ">">;
    type T2 = AfterLast<`Array<Record<string, string>>  `, ">">;
    type T3 = AfterLast<`Array<Record<string, string>>  abc`, ">">;


    type cases = [
        Expect<Equal<T1, "">>,
        Expect<Equal<T2, "  ">>,
        Expect<Equal<T3, "  abc">>,
    ];
  });


  it("with break character", () => {
    type T1 = AfterLast<
        `Array<Record<string, string>> | Array<string>`,
        ">",
        "|"
    >;

    type cases = [
        Expect<Equal<T1, " | Array<string>">>,
    ];
  });

});
