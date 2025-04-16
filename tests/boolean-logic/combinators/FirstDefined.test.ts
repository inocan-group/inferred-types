import { Equal, Expect } from "@type-challenges/utils";
import { FirstDefined } from "inferred-types/types";
import { describe, it } from "vitest";

describe("FirstDefined<T,U>", () => {

  it("happy path", () => {
    type Empty = FirstDefined<[]>;
    type EmptyWithDef = FirstDefined<[],4>;

    type Immediate = FirstDefined<[1,2,3]>;
    type Middling = FirstDefined<[undefined,1,2,3]>;
    type Terminal = FirstDefined<[undefined,undefined,1]>;

    type Null = FirstDefined<[undefined, null, 1]>;


    type cases = [
        Expect<Equal<Empty, undefined>>,
        Expect<Equal<EmptyWithDef, 4>>,

        Expect<Equal<Immediate, 1>>,
        Expect<Equal<Middling, 1>>,
        Expect<Equal<Terminal, 1>>,

        Expect<Equal<Null, null>>,
    ];
  });

});
