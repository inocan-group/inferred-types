import { Expect, Optional, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Optional<T>", () => {

    it("happy path", () => {
        type FooMaybeBar = `foo${Optional<"bar">}`;
        type Nested = `foo${Optional<`bar${Optional<"baz">}`>}`
        type FooUnion = `foo${Optional<"bar" | "baz">}`;

        type Multi = Optional<["foo", "bar"]>;
        type MultiUnion = Optional<["foo" | "bar", "foo" | "bar"]>;


        type cases = [
            Expect<Test<FooMaybeBar, "equals",  "foo" | "foobar">>,
            Expect<Test<Nested, "equals",  "foo" | "foobar" | "foobarbaz">>,
            Expect<Test<FooUnion, "equals",  "foo" | "foobar" | "foobaz">>,

            Expect<Test<Multi, "equals",  "" | "bar" | "foo" | "foobar">>,
            Expect<Test<
                MultiUnion,
                "equals",
                "" | "bar" | "foo" | "foobar" | "barbar" | "barfoo" | "foofoo"
            >>
        ];

    });

});
