import { describe, expect, it } from "vitest";
import type { Expect, StripTrailing, Test } from "inferred-types/types";

import { stripTrailing } from "inferred-types/runtime";

describe("StripTrailing", () => {

    it("happy path", () => {
        type RemoveBar = StripTrailing<"FooBar", "Bar">;
        type SameAsItEverWas = StripTrailing<"Foo", "Bar">;
        type Num = StripTrailing<4000, "000">;

        type cases = [
            Expect<Test<RemoveBar, "equals", "Foo">>,
            Expect<Test<SameAsItEverWas, "equals", "Foo">>,
            Expect<Test<Num, "equals", 4>>,
        ];

    });

    it("numeric inputs", () => {
        type TheMeaning = StripTrailing<422, 2>;
        type NoChange = StripTrailing<42, 9>;

        type cases = [
            Expect<Test<TheMeaning, "equals", 42>>,
            Expect<Test<NoChange, "equals", 42>>,
        ];

    });

    it("union stripper", () => {
        type Foo = StripTrailing<"foobar", "foo" | "bar">;

        type cases = [
            Expect<Test<Foo, "equals", "foo">>
        ];
    });
});

describe("stripTrailing() runtime", () => {

    it("happy path", () => {
        const foo = stripTrailing("foobar", "bar");
        const noChange = stripTrailing("foobar", "baz");

        expect(foo).toBe("foo");
        expect(noChange).toBe("foobar");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof noChange, "equals", "foobar">>,

        ];
    });

    it("numeric inputs", () => {
        const theAnswer = stripTrailing(422, 2);

        expect(theAnswer).toBe(42);

        type cases = [
            Expect<Test<typeof theAnswer, "equals", 42>>,
        ];

    });

    it("multiple strippers", () => {
        const foo = stripTrailing("foobar", "foo", "bar");
        const foo2 = stripTrailing("foobar", "bar", "baz");

        expect(foo).toBe("foo");
        expect(foo2).toBe("foo");

        type cases = [
            Expect<Test<typeof foo, "equals", "foo">>,
            Expect<Test<typeof foo2, "equals", "foo">>,
        ];
    });

});
