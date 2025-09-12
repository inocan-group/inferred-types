
import { describe, it } from "vitest";
import type { Expect, FindMaxLength, Test } from "inferred-types/types";

describe("MaxLength<T>", () => {

    it("happy path", () => {
        type FooBar = FindMaxLength<["foo", "bar", "foobar", "baz"]>;
        type FooBar2 = FindMaxLength<["foo", "bar", "foobar"]>;
        type FooBar3 = FindMaxLength<["foobar", "bar", "foo", "baz"]>;
        type FooBar4 = FindMaxLength<["foobar"]>;

        type cases = [
            Expect<Test<FooBar, "equals",  "foobar">>,
            Expect<Test<FooBar2, "equals",  "foobar">>,
            Expect<Test<FooBar3, "equals",  "foobar">>,
            Expect<Test<FooBar4, "equals",  "foobar">>,
        ];
    });

});
