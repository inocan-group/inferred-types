import {
    Expect,
    FindFirstIndex,
    FindIndexesWithMeta,
    FindLastIndex,
    Test
} from "inferred-types/types";
import { describe, it } from "vitest";



describe("FindIndexesWithMeta<TContent,TFind,[TOp]>, FindFirstIndexMeta<..>, FindLastIndexMeta<..>", () => {

    it("string content", () => {
        type FooBarBaz = FindIndexesWithMeta<"foo,bar, baz", ",">;
        type FooBar = FindIndexesWithMeta<"foo, bar", ", ">;

        type Union = FindIndexesWithMeta<"foo bar,baz", "," | " ">;

        type F_FooBarBaz = FindFirstIndex<"foo,bar, baz", ",">
        type L_FooBarBaz = FindLastIndex<"foo,bar, baz", ",">

        type cases = [
            Expect<Test<FooBarBaz, "equals", [
                { start: 3; end: 4; break: "," },
                { start: 7; end: 8; break: "," }
            ]>>,
            Expect<Test<Union, "equals", [
                { start: 3; end: 4; break: " " },
                { start: 7; end: 8; break: "," }
            ]>>,

            Expect<Test<F_FooBarBaz, "equals",  3>>,
            Expect<Test<L_FooBarBaz, "equals",  7>>,

        ];
    });



    it("tuple content", () => {
        type Foo42 = FindIndexesWithMeta<["foo", "bar", "baz", 0, 42], "foo" | 42>;


        type cases = [
            Expect<Test<Foo42, "equals", [
                { index: 0; break: "foo" },
                { index: 4; break: 42 }
            ]>>,
        ];

    });
});
