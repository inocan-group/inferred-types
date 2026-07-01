import { describe, expect, it } from "vitest";
import type { Expect, OddNumber, Test } from "inferred-types/types";
import { isOdd } from "inferred-types/runtime";

describe("isOdd(val)", () => {

    it("happy path", () => {
        const t1 = isOdd(1);
        const t2 = isOdd(3);
        const t3 = isOdd(-5);
        const t4 = isOdd(101);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
    });

    it("even numbers return false", () => {
        expect(isOdd(0)).toBe(false);
        expect(isOdd(2)).toBe(false);
        expect(isOdd(-4)).toBe(false);
    });

    it("non-integers return false", () => {
        expect(isOdd(1.5)).toBe(false);
        expect(isOdd(3.1)).toBe(false);
    });

    it("non-number and nullish values return false without throwing", () => {
        expect(isOdd("1")).toBe(false);
        expect(isOdd(null)).toBe(false);
        expect(isOdd(undefined)).toBe(false);
        expect(isOdd({})).toBe(false);
        expect(isOdd([])).toBe(false);
        expect(isOdd(Number.NaN)).toBe(false);
    });

    it("narrows to OddNumber", () => {
        const val = 3 as unknown;

        if (isOdd(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", OddNumber>>
            ];
        }
    });

});
