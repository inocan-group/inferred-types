import { describe, it } from "vitest";
import type { Expect, IT_TakeLiteralArray, IT_Token, Test } from "inferred-types/types";

describe("IT_TakeLiteralArray<T>", () => {

    it("happy path", () => {
        type FooBar = IT_TakeLiteralArray<"[ 'foo', 'bar' ]">

        type cases = [
            Expect<Test<FooBar, "extends", IT_Token<"literal-array">>>,

            Expect<Test<FooBar["type"], "equals", ["foo", "bar"]>>
        ];
    });

});
