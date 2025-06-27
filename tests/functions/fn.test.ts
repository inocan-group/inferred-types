import { Expect, AnyFunction, FnWithDescription, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Fn<T> test", () => {

    it("happy path", () => {
        type Basic = FnWithDescription<[
            <N extends string, A extends number>(name: N, age: A) => `Hello ${N}, you are ${A}.`
        ]>;
        type WithDesc = FnWithDescription<[
            <N extends string, A extends number>(name: N, age: A) => `Hello ${N}, you are ${A}.`,
            "greet a person with their age"
        ]>;
        type WithProps = FnWithDescription<[
            <N extends string, A extends number>(name: N, age: A) => `Hello ${N}, you are ${A}.`,
            { foo: 1; bar: 2 }
        ]>;

        type cases = [
            Expect<Test<Basic, "extends", AnyFunction>>,
            Expect<Test<WithDesc, "extends", AnyFunction>>,
            Expect<Test<WithProps, "extends", AnyFunction>>,

            Expect<Test<WithDesc["desc"], "equals", "greet a person with their age">>,
            Expect<Test<WithProps["foo"], "equals", 1>>,
            Expect<Test<WithProps["bar"], "equals", 2>>,
        ];
    });

});
