import { Expect,StartsWith, Test, UpperAlphaChar } from "inferred-types/types";
import { describe, it } from "vitest";



describe("StartsWith<TValue,TTest>", () => {

    it("happy path", () => {
        type Foo = StartsWith<"foobar", "foo">;
        type NoFoo = StartsWith<"barfoo", "foo">;

        type MultiFoo = StartsWith<"foobar", ["foo", "bar"]>;
        type NotMultiFoo = StartsWith<"foobar", ["bar", "baz"]>;

        type Num = StartsWith<420, 42>;
        type NotNum = StartsWith<520, 42>;

        type Upper = StartsWith<"Bar", UpperAlphaChar>;
        type NotUpper = StartsWith<"bar", UpperAlphaChar>;

        type WideComparator = StartsWith<"Foo", string>;
        type WideContent = StartsWith<string, "foo">;

        type cases = [
            Expect<Test<Foo, "equals", true>>,
            Expect<Test<NoFoo, "equals", false>>,

            Expect<Test<MultiFoo, "equals", true>>,
            Expect<Test<NotMultiFoo, "equals", false>>,

            Expect<Test<Num, "equals", true>>,
            Expect<Test<NotNum, "equals", false>>,

            Expect<Test<Upper, "equals", true>>,
            Expect<Test<NotUpper, "equals", false>>,

            Expect<Test<WideComparator, "equals", boolean>>,
            Expect<Test<WideContent, "equals", boolean>>,
        ];
    });

});


