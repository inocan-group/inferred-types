import {  Expect } from "@type-challenges/utils";
import { FirstValue, Test } from "inferred-types/types";
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
        Expect<Test<Empty, "equals",  undefined>>,
        Expect<Test<EmptyWithDef, "equals",  4>>,

        Expect<Test<Immediate, "equals",  1>>,
        Expect<Test<Middling, "equals",  1>>,
        Expect<Test<Terminal, "equals",  1>>,

        Expect<Test<Null, "equals",  1>>,
    ];
  });

});
