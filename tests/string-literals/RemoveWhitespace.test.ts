import { describe, it } from "vitest";
import type { Expect, RemoveWhitespace, Test } from "inferred-types/types";

describe("RemoveWhitespace<T>", () => {

  it("happy path", () => {

    type FooBar = RemoveWhitespace<"Foo   \n\tBar  ">;
    type FooBar2 = RemoveWhitespace<"FooBar">;
    type FooBar3 = RemoveWhitespace<"Fo o         B  \na     r">;

    type cases = [
        Expect<Test<FooBar, "equals",  "FooBar">>,
        Expect<Test<FooBar2, "equals",  "FooBar">>,
        Expect<Test<FooBar3, "equals",  "FooBar">>,
    ];
  });

});
