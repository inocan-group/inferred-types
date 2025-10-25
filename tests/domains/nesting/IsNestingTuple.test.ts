import { describe, it } from "vitest";
import type { Expect, IsNestingTuple, Test } from "inferred-types/types";

describe("IsNestingTuple<T>", () => {

    it("undefined for exit", () => {
        type T1 = IsNestingTuple<[
            ["a","b"],
            undefined
        ]>

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });


    it("exit is a simple array", () => {
        type T1 = IsNestingTuple<[
            ["a","b"],
            ["c", "d"]
        ]>

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });


    it("child rule change", () => {
        type T1 = IsNestingTuple<[
            ["a","b"],
            { exit: undefined, children: {} }
        ]>

        type cases = [
            Expect<Test<T1, "equals", true>>,
        ];
    });



    it("negative tests", () => {
        type EStart = IsNestingTuple<[
            ["a",""],
            ["c","d"]
        ]>;
        type EEnd = IsNestingTuple<[
            ["a","b"],
            ["c","dd"]
        ]>;

        type cases = [
            Expect<Test<EStart, "isError", "invalid-nesting">>,
            Expect<Test<EEnd, "isError", "invalid-nesting">>,
        ];
    });

});
