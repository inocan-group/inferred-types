import { describe, expect, it } from "vitest";
import type { Expect, FalsyValue, Test } from "inferred-types/types";
import { isFalsy } from "inferred-types/runtime";

describe("isFalsy(val)", () => {

    it("happy path", () => {
        const t1 = isFalsy(false);
        const t2 = isFalsy(0);
        const t3 = isFalsy(-0);
        const t4 = isFalsy("");
        const t5 = isFalsy(null);
        const t6 = isFalsy(undefined);
        const t7 = isFalsy(Number.NaN);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);
        expect(t7).toBe(true);
    });

    it("truthy values return false", () => {
        // a non-empty string is truthy in JS (even the string "false")
        expect(isFalsy("false")).toBe(false);
        expect(isFalsy("hello")).toBe(false);
        expect(isFalsy(1)).toBe(false);
        expect(isFalsy(-1)).toBe(false);
        expect(isFalsy(true)).toBe(false);
        expect(isFalsy([])).toBe(false);
        expect(isFalsy({})).toBe(false);
        expect(isFalsy(" ")).toBe(false);
    });

    it("narrows to a falsy subtype of the input union", () => {
        const val = 0 as 0 | "hello";

        if (isFalsy(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", FalsyValue>>
            ];
        }
    });

});
