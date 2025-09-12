import { describe, it } from "vitest";
import type { Expect, IT_TakeFunction, IT_TakeIntersection, IT_TakeOutcome, IT_Token, Test } from "inferred-types/types";

describe("IT_TakeIntersection<T,P>", () => {

    it("function intersected with key/value object", () => {
        type FnToken = IT_TakeFunction<"function greet(name: string): string">;
        type T1 = IT_TakeIntersection<FnToken, "& { foo: 1; bar: 2 } & { baz: number }">

        type cases = [
            Expect<Test<T1, "extends", IT_Token<"intersection">>>,
            Expect<Test<T1, "extends", IT_TakeOutcome<"intersection">>>,

            Expect<Test<
                T1["type"], "equals",
                (<T extends readonly [string]>(...args: T) => string) & {
                    name: "greet";
                    foo: 1;
                    bar: 2;
                    baz: number;
                }
            >>
        ];
    });

});

