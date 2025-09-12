import { describe, it } from "vitest";
import type { AllCaps, Expect, Test } from "inferred-types/types";

describe("AllCaps<T> type utility", () => {
    it("finds AllCaps where it exists", () => {
        type T1 = AllCaps<"YUP">;
        type T2 = AllCaps<"YUP ">;
        type T3 = AllCaps<"YUP YUP YESSSSSSSSSSSSSS">;

        type cases = [
            Expect<Test<T1, "equals",  "YUP">>,
            Expect<Test<T2, "equals",  "YUP ">>,
            Expect<Test<T3, "equals",  "YUP YUP YESSSSSSSSSSSSSS">>
        ];
    });

    it("correctly identifies the absence of AllCaps", () => {
        type T1 = AllCaps<"Nope">;
        type T2 = AllCaps<"  noo nooo noooooooooooooo">;

        type cases = [
            Expect<Test<T1, "equals",  "NOPE">>,
            Expect<Test<T2, "equals",  "  NOO NOOO NOOOOOOOOOOOOOO">>
        ];
    });

    it("when passed a non literal string, returns string", () => {
        type T1 = AllCaps<string>;

        type cases = [
            Expect<Test<T1, "equals",  string>>
        ];
    });
});
