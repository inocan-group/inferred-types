import { describe, expect, it } from "vitest";
import type { AssertEqual, Expect, StripLeading, Test } from "inferred-types/types";
import { stripLeading } from "inferred-types/runtime";

describe("StripLeading<TStr,TRemove>", () => {

    it("string outcome", () => {
        type World = StripLeading<"HelloWorld", "Hello">;
        type Missing = StripLeading<"World", "Hello">;

        type cases = [
            Expect<Test<World, "equals", "World">>,
            Expect<Test<Missing, "equals", "World">>,
        ];
    });


    it("numeric outcome", () => {
        type T1 = StripLeading<442, "4">;
        type T2 = StripLeading<442, 4>;

        type cases = [
            Expect<AssertEqual<T1, 42>>,
            Expect<AssertEqual<T2, 42>>,
        ];
    });

});

describe("stripLeading(content, remove)", () => {

    it("wide string", () => {
        const str = stripLeading("foobar" as string, "foo");

        expect(str).toEqual("bar");

        type cases = [
            Expect<AssertEqual<typeof str, string>>
        ];
    });


    it("string literals", () => {
        const bar = stripLeading("foobar", "foo");
        const foo = stripLeading("fooFoo", "foo");
        const no_change = stripLeading("foobar", "baz");

        expect(bar).toBe("bar");
        expect(foo).toBe("Foo");
        expect(no_change).toBe("foobar");

        type cases = [
            Expect<Test<typeof bar, "equals", "bar">>,
            Expect<Test<typeof foo, "equals", "Foo">>,
            Expect<Test<typeof no_change, "equals", "foobar">>,

        ];
    });

    it("numeric literals", () => {
        const t1 = stripLeading(442, "4");
        const t2 = stripLeading(442, 4);

        expect(t1).toBe(42);
        expect(t2).toBe(42);

        type cases = [
            Expect<AssertEqual<typeof t1, 42>>,
            Expect<AssertEqual<typeof t2, 42>>,
        ]
    })

    // I removed this capability until I can get all perf issues sorted
    it("with multiple strip sequences", () => {
        const bar = stripLeading("foobar", "foo", "baz");
        const bar2 = stripLeading("foobar", "baz", "foo");

        expect(bar).toBe("bar");
        expect(bar2).toBe("bar");

        type cases = [
            Expect<Test<typeof bar, "equals", "bar">>,
            Expect<Test<typeof bar2, "equals", "bar">>,
        ];
    });

});
