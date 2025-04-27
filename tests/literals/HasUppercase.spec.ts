import { describe, it, expect } from "vitest";
import type { Expect, HasUppercase, Test } from "inferred-types/types";

describe("HasUppercase<T> type utility", () => {
    it("finds capitals where they exist", () => {
        type T1 = HasUppercase<"Yup">;
        type T2 = HasUppercase<"yUp">;
        type T3 = HasUppercase<"YUP">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>
        ];
        const c: cases = [true, true, true];
        expect(c).toBe(c);
    });

    it("correctly identifies the absence of capitals", () => {
        type T1 = HasUppercase<"nope">;
        type T2 = HasUppercase<"  noo nooo noooooooooooooo">;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>
        ];
    });

    it("when passed a non literal string, returns 'unknown'", () => {
        type T1 = HasUppercase<string>;

        type cases = [
            Expect<Test<T1, "equals", "unknown">>
        ];

    });
});
