import { describe, it } from "vitest";
import {
    Expect,
    SplitOnWhitespace,
    Test,
} from "inferred-types/types";

describe("SplitOnWhitespace<T>", () => {

    it("happy path", () => {
        type T1 = SplitOnWhitespace<"foo bar   baz">;
        type T2 = SplitOnWhitespace<"      \nfoo bar\tbaz">;

        type cases = [
            Expect<Test<T1, "equals", ["foo","bar","baz"]>>,
            Expect<Test<T2, "equals", ["foo","bar","baz"]>>,
        ];
    });

});
