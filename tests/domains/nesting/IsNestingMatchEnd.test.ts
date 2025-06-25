import { describe, it } from "vitest";
import {
    DefaultNesting,
    Expect,
    IsNestingMatchEnd,
    Test,
} from "inferred-types/types";

describe("IsNestingMatchEnd<TChar,TStack,TNesting>", () => {

    it("positive tests", () => {
        type T1 = IsNestingMatchEnd<
            "}",
            ["{"],
            DefaultNesting
        >

        type T2 = IsNestingMatchEnd<
            ")",
            ["{", "("],
            DefaultNesting
        >

        type T3 = IsNestingMatchEnd<
            ">",
            ["{", "(", "<"],
            DefaultNesting
        >

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("negative tests", () => {
        type F1 = IsNestingMatchEnd<
            "{",
            ["{"],
            DefaultNesting
        >

        type F2 = IsNestingMatchEnd<
            "}",
            ["{", "("],
            DefaultNesting
        >

        type F3 = IsNestingMatchEnd<
            "}",
            ["{", "(", "<"],
            DefaultNesting
        >

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

});
