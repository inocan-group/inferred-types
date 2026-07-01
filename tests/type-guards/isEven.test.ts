import { describe, expect, it } from "vitest";
import type { EvenNumber, Expect, Test } from "inferred-types/types";
import { isEven } from "inferred-types/runtime";

describe("isEven(val)", () => {

    it("happy path", () => {
        const t1 = isEven(0);
        const t2 = isEven(2);
        const t3 = isEven(-4);
        const t4 = isEven(100);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
    });

    it("odd numbers return false", () => {
        expect(isEven(1)).toBe(false);
        expect(isEven(3)).toBe(false);
        expect(isEven(-5)).toBe(false);
    });

    it("non-integers return false", () => {
        expect(isEven(2.5)).toBe(false);
        expect(isEven(4.1)).toBe(false);
    });

    it("non-number and nullish values return false without throwing", () => {
        expect(isEven("2")).toBe(false);
        expect(isEven(null)).toBe(false);
        expect(isEven(undefined)).toBe(false);
        expect(isEven({})).toBe(false);
        expect(isEven([])).toBe(false);
        expect(isEven(Number.NaN)).toBe(false);
    });

    it("narrows to EvenNumber", () => {
        const val = 4 as unknown;

        if (isEven(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", EvenNumber>>
            ];
        }
    });

});
