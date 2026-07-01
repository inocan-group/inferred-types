import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isBoolean } from "inferred-types/runtime";

describe("isBoolean(val)", () => {

    it("happy path", () => {
        const t1 = isBoolean(true);
        const t2 = isBoolean(false);

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        const f1 = isBoolean("true");
        const f2 = isBoolean(0);
        const f3 = isBoolean(1);

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
    });

    it("empty and non-boolean values return false without throwing", () => {
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean("")).toBe(false);
        expect(isBoolean(42)).toBe(false);
        expect(isBoolean({})).toBe(false);
        expect(isBoolean([])).toBe(false);
        expect(isBoolean(Symbol("x"))).toBe(false);
    });

    it("narrows to boolean", () => {
        const val = true as unknown;

        if (isBoolean(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", boolean>>
            ];
        }
    });

});
