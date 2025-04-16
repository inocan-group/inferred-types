import { Equal, Expect } from "@type-challenges/utils";
import { FirstValue } from "inferred-types/types";
import { describe, it } from "vitest";

describe("FirstValue<T,U>", () => {

  it("happy path", () => {
    type Empty = FirstValue<[]>;
    type EmptyWithDef = FirstValue<[],4>;

    type Immediate = FirstValue<[1,2,3]>;
    type Middling = FirstValue<[undefined,1,2,3]>;
    type Terminal = FirstValue<[undefined,undefined,1]>;

    type Null = FirstValue<[undefined, null, 1]>;


    type cases = [
        Expect<Equal<Empty, undefined>>,
        Expect<Equal<EmptyWithDef, 4>>,

        Expect<Equal<Immediate, 1>>,
        Expect<Equal<Middling, 1>>,
        Expect<Equal<Terminal, 1>>,

        Expect<Equal<Null, 1>>,
    ];
  });

});
