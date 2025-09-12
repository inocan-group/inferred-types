import { describe, expect, it } from "vitest";
import type { Expect, StripAfter, Test, UpperAlphaChar } from "inferred-types/types";

import { stripAfter } from "inferred-types/runtime";

describe("StripAfter<TStr,TBreak>", () => {

    it("happy path", () => {
        type Hello = StripAfter<"hello world", " ">;
        type Foo = StripAfter<"foo, bar, baz", ", ">;
        type WideBreak = StripAfter<"hmmm", string>;
        type WideContent = StripAfter<string, ",">;
        type BothWide = StripAfter<string, string>;

        type cases = [
            Expect<Test<Hello, "equals", "hello">>,
            Expect<Test<Foo, "equals", "foo">>,
            Expect<Test<WideBreak, "equals", string>>,
            Expect<Test<WideContent, "equals", string>>,
            Expect<Test<BothWide, "equals", string>>,
        ];
    });

    it("using a union type to break", () => {
        type Text = "foo,bar baz";
        type T1 = StripAfter<Text, "," | " ">;
        type T2 = StripAfter<"a FooBar", UpperAlphaChar>;

        type cases = [
            Expect<Test<T1, "equals", "foo">>,
            Expect<Test<T2, "equals", "a ">>,
        ];
    });

});

describe("stripAfter(contend,find) runtime utility", () => {

    it("happy path", () => {
        const hello = stripAfter("hello world", " ");
        const foo = stripAfter("foo, bar, baz", ", ");
        const bracket = stripAfter("foo[bar]", "[");
        const twice = stripAfter("foo[[bar]]", "[");
        const multi = stripAfter("foo[{bar}]", "[{");

        expect(hello).toBe("hello");
        expect(foo).toBe("foo");
        expect(bracket).toBe("foo");
        expect(twice).toBe("foo");
        expect(multi).toBe("foo");

        type cases = [
            Expect<Test<typeof hello, "equals", "hello">>, //
            Expect<Test<typeof foo, "equals", "foo">>, //
        ];

    });

});
