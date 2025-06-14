import { describe, it } from "vitest";
import {
    CodePointOf,
    Expect,
    Test,
} from "inferred-types/types";

describe("CodePointOf<T>", () => {

    it("Happy path", () => {
        type A = CodePointOf<"A">;
        type a = CodePointOf<"a">;
        type Dash = CodePointOf<"-">;
        type Space = CodePointOf<" ">;


        type cases = [
            Expect<Test<A, "equals", 65>>,
            Expect<Test<a, "equals", 97>>,
            Expect<Test<Dash, "equals", 45>>,
            Expect<Test<Space, "equals", 32>>,
        ];
    });


    it("Get tuple of code points from longer string", () => {

        type T = CodePointOf<"There I was, in the jungle">;


        type cases = [
            Expect<Test<
                T, "equals",
                [84, 104, 101, 114, 101, 32, 73, 32, 119, 97, 115, 44, 32, 105, 110, 32, 116, 104, 101, 32, 106, 117, 110, 103, 108, 101]
            >>
        ];
    });


});
