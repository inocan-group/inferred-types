import { describe, it } from "vitest";
import type { Err, ErrType, Expect, Test } from "inferred-types/types";

describe("ErrType<T>", () => {

    it("happy path", () => {
        type Wide = ErrType<Error>;
        type NotError = ErrType<{ id: 1, message: "hi", type: "foo" }>;
        type Foo = ErrType<Err<"foo">>;
        type FooBar = ErrType<Err<"foo/bar">>;

        type cases = [
            Expect<Test<Wide, "equals", undefined>>,
            Expect<Test<NotError, "equals", undefined>>,
            Expect<Test<Foo, "equals", "foo">>,
            Expect<Test<FooBar, "equals", "foo">>,
        ];
    });

});
