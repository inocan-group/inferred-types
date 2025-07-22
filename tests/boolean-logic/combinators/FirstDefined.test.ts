import {  Expect } from "@type-challenges/utils";
import { FirstDefined, Test } from "inferred-types/types";
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
        Expect<Test<Empty, "equals",  undefined>>,
        Expect<Test<EmptyWithDef, "equals",  4>>,

        Expect<Test<Immediate, "equals",  1>>,
        Expect<Test<Middling, "equals",  1>>,
        Expect<Test<Terminal, "equals",  1>>,

        Expect<Test<Null, "equals",  1>>,
    ];
  });

});
