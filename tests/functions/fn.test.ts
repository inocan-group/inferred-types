import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { AnyFunction, DoesExtend, FnWithDescription } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
            ExpectTrue<DoesExtend<Basic, AnyFunction>>,
            ExpectTrue<DoesExtend<WithDesc, AnyFunction>>,
            ExpectTrue<DoesExtend<WithProps, AnyFunction>>,

            Expect<Equal<WithDesc["desc"], "greet a person with their age">>,
            Expect<Equal<WithProps["foo"], 1>>,
            Expect<Equal<WithProps["bar"], 2>>,
        ];
        const cases: cases = [
            true, true, true,
            true, true, true
        ];
    });

});
