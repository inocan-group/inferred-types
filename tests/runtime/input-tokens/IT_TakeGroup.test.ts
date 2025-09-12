import { describe, it } from "vitest";
import {
    Contains,
    Expect,
    GetInputToken,
    IT_TakeGroup,
    Test,
} from "inferred-types/types";

describe("IT_TakeGroup<T>", () => {

    it("happy path", () => {
        type Num = IT_TakeGroup<"(123)">;
        type Str = IT_TakeGroup<"('foo')">;
        type Union = IT_TakeGroup<"('foo' | 'bar')">;

        type cases = [
            Expect<Test<Num["type"], "equals", 123>>,
            Expect<Test<Str["type"], "equals", "foo">>,
            Expect<Test<Union["type"], "equals", "foo" | "bar">>,
            Expect<Test<Num["type"], "equals", 123>>,
        ];
    });


    it("incomplete group results in error", () => {
        type E = IT_TakeGroup<`(123`>;

        type cases = [
            Expect<Test<E, "isError", "malformed-token/group">>,

            Expect<Contains<E["message"], `terminating ')' character`>>
        ];
    });

    it("fn in group with leftover content to parse", () => {
        type FnWithProps = IT_TakeGroup<"((name: string) => string) & { foo: 1; bar: 2 }">;

        type cases = [
            Expect<Test<FnWithProps["type"], "equals", <T extends readonly [string]>(...args: T) => string>>,
            Expect<Test<FnWithProps["rest"], "equals", "& { foo: 1; bar: 2 }">>,
        ];
    });


});
