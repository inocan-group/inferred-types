import { describe, it } from "vitest";
import {
    Expect,
    IsNestingTuple,
    Test,
} from "inferred-types/types";

describe("IsNestingTuple<T>", () => {

    it("positive tests", () => {
        type T1 = IsNestingTuple<[
            ["a","b"],
            undefined
        ]>
        type T2 = IsNestingTuple<[
            ["a","b"],
            ["c", "d"]
        ]>

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
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
