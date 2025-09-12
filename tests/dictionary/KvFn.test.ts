import { describe, it } from "vitest";
import type { AnyFunction, Expect, KvFn, Test } from "inferred-types/types";

describe("KvFn", () => {

    it("happy path", () => {
        type Hi = KvFn<[
            "greet",
            [
                <N extends string, A extends number>(name: N, age: A) => `Hello ${N}, you are ${A}.`,
                "greet the user"
            ]
        ]>;

        type cases = [
            // greet prop is a function
            Expect<Test<Hi["greet"], "extends", AnyFunction>>,
            // greet prop also exposes a `desc` prop
            Expect<Test<Hi["greet"]["desc"], "equals",  "greet the user">>,
        ];
    });

});
