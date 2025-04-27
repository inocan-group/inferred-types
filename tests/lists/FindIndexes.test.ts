import {
    Expect,
    FindFirstIndex,
    FindIndexes,
    FindLastIndex,
    Test
} from "inferred-types/types";
import { describe, it } from "vitest";



describe("FindIndexes<TContent,TFind,[TOp]>, FindFirstIndex<...>, FindLastIndex<..>", () => {

    it("string content", () => {
        type FooBarBaz = FindIndexes<"foo,bar, baz", ",">;
        type Union = FindIndexes<"foo bar,baz", "," | " ">;
        type Many = FindIndexes<"red,blue, green, purple, black", ",">;

        type F_FooBarBaz = FindFirstIndex<"foo,bar, baz", ",">
        type L_FooBarBaz = FindLastIndex<"foo,bar, baz", ",">

        type F_Many = FindFirstIndex<"red,blue, green, purple, black", ",">
        type L_Many = FindLastIndex<"red,blue, green, purple, black", ",">

        // @ts-ignore
        type cases = [
            Expect<Test<FooBarBaz, "equals", [3,  7]>>,
            Expect<Test<Union, "equals", [3,  7]>>,
            Expect<Test<Many, "equals", [3, 8, 15,  23]>>,

            Expect<Test<F_FooBarBaz, "equals",  3>>,
            Expect<Test<L_FooBarBaz, "equals",  7>>,

            Expect<Test<F_Many, "equals",  3>>,
            Expect<Test<L_Many, "equals",  23>>,
        ];
    });



    it("tuple content", () => {
        type Foo42 = FindIndexes<["foo", "bar", "baz", 0, 42], "foo" | 42>;


        // @ts-ignore
        type cases = [
            Expect<Test<Foo42, "equals", [0, 4]>>,
        ];

    });
});
