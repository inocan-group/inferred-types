import {
    Expect,
    Test,
    ErrorCondition,
    IsDotPath,
    Validate
} from "inferred-types/types";
import { describe, it } from "vitest";


describe("Validate<T>", () => {
    it("happy path", () => {
        type T1 = Validate<IsDotPath<"foo.bar.baz", "foo.bar.baz">>;
        type T2 = Validate<IsDotPath<"foo_bar.baz-me", "foo_bar.baz-me">>;
        type T3 = Validate<IsDotPath<"foobar", "foobar">>;
        type T4 = Validate<IsDotPath<"foot123", "foot123">>;

        type F1 = Validate<IsDotPath<".foo.bar", ".foo.bar">>;
        type F2 = Validate<IsDotPath<"foo.bar.", "foo.bar.">>;
        type F3 = Validate<IsDotPath<".foo.bar.", ".foo.bar.">>;
        type F4 = Validate<IsDotPath<"/foobar", "/foobar">>;
        type F5 = Validate<IsDotPath<"abc*", "/foobar">>;
        type F6 = Validate<IsDotPath<"abc...def", "abc...def">>;

        type E1 = Validate<IsDotPath<"foobar", string>>;


        type cases = [
            Expect<Test<T1, "equals",  "foo.bar.baz">>, //
            Expect<Test<T2, "equals",  "foo_bar.baz-me">>,
            Expect<Test<T3, "equals",  "foobar">>,
            Expect<Test<T4, "equals",  "foot123">>,

            Expect<Test<F1, "equals",  never>>,
            Expect<Test<F2, "equals",  never>>,
            Expect<Test<F3, "equals",  never>>,
            Expect<Test<F4, "equals",  never>>,
            Expect<Test<F5, "equals",  never>>,
            Expect<Test<F6, "equals",  never>>,

            Expect<Test<E1, "extends", ErrorCondition<"wide-return-not-allowed">>>,
        ];
    });

});
