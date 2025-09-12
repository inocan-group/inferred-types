
import { describe, it } from "vitest";
import type { Expect, Opt, Test } from "inferred-types/types";

describe("Optional<T>", () => {

    it("happy path", () => {
        type FooMaybeBar = `foo${Opt<"bar">}`;
        type Nested = `foo${Opt<`bar${Opt<"baz">}`>}`
        type FooUnion = `foo${Opt<"bar" | "baz">}`;

        type Multi = Opt<["foo", "bar"]>;
        type MultiUnion = Opt<["foo" | "bar", "foo" | "bar"]>;

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
