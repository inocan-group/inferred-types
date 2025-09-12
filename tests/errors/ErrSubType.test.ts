import { describe, it } from "vitest";
import {
    Err,
    ErrType,
    Expect,
    Test,
} from "inferred-types/types";
import { ErrSubType } from "inferred-types/types";

describe("ErrSUbType<T>", () => {

    it("happy path", () => {
        type Wide = ErrSubType<Error>;
        type NotError = ErrSubType<{ id: 1, message: "hi", type: "foo", subType: "bar" }>;
        type Foo = ErrSubType<Err<"foo">>;
        type FooBar = ErrSubType<Err<"foo/bar">>;


        type cases = [
            Expect<Test<Wide, "equals", undefined>>,
            Expect<Test<NotError, "equals", undefined>>,
            Expect<Test<Foo, "equals", undefined>>,
            Expect<Test<FooBar, "equals", "bar">>,
        ];
    });

});
