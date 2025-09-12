import { describe, it } from "vitest";
import type { Chars, Expect, FirstOfEach, LastOfEach, Test } from "inferred-types/types";

describe("FirstOfEach<TList>", () => {

    it("with an Tuple of array elements", () => {
        type Arr = FirstOfEach<[["foo", 1], ["bar", 2]]>;
        type Foo = FirstOfEach<[Chars<"Foo">, Chars<"Bar">]>;

        type cases = [
            Expect<Test<Arr, "equals",  "foo" | "bar">>,
            Expect<Test<Foo, "equals",  "F" | "B">>,
        ];
    });

});

describe("LastOfEach<TList>", () => {

    it("with a Tuple of array elements", () => {
        type Arr = LastOfEach<[["foo", 1], ["bar", 2]]>;
        type Foo = LastOfEach<[Chars<"Foo">, Chars<"Bar">]>;

        type cases = [
            Expect<Test<Arr, "equals", [1,  2]>>,
            Expect<Test<Foo, "equals", ["o",  "r"]>>,
        ];
    });

});
