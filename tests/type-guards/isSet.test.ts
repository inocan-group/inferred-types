import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isSet } from "inferred-types/runtime";

describe("isSet(val)", () => {

    it("happy path", () => {
        const t1 = isSet(new Set());
        const t2 = isSet(new Set([1, 2, 3]));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("non-Set values return false without throwing", () => {
        expect(isSet(new Map())).toBe(false);
        expect(isSet(new WeakSet())).toBe(false);
        expect(isSet({})).toBe(false);
        expect(isSet([])).toBe(false);
        expect(isSet("set")).toBe(false);
        expect(isSet(null)).toBe(false);
        expect(isSet(undefined)).toBe(false);
    });

    it("narrows to Set", () => {
        const val = new Set() as unknown;

        if (isSet(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", Set<any>>>
            ];
        }
    });

});
