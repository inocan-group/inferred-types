import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isFalse } from "inferred-types/runtime";

describe("isFalse(val)", () => {

    it("happy path", () => {
        const t1 = isFalse(false);

        expect(t1).toBe(true);
    });

    it("true and non-false boolean-ish values return false", () => {
        expect(isFalse(true)).toBe(false);
        expect(isFalse(0)).toBe(false);
        expect(isFalse("")).toBe(false);
        expect(isFalse("false")).toBe(false);
        expect(isFalse(null)).toBe(false);
        expect(isFalse(undefined)).toBe(false);
        expect(isFalse(Number.NaN)).toBe(false);
    });

    it("narrows to false", () => {
        const val = false as unknown;

        if (isFalse(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", false>>
            ];
        }
    });

});
