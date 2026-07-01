import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isSetContainer } from "inferred-types/runtime";

describe("isSetContainer(val)", () => {

    it("happy path", () => {
        const t1 = isSetContainer(new Set());
        const t2 = isSetContainer(new Set([1, 2, 3]));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("non-Set values return false without throwing", () => {
        expect(isSetContainer(new Map())).toBe(false);
        expect(isSetContainer(new WeakSet())).toBe(false);
        expect(isSetContainer({})).toBe(false);
        expect(isSetContainer([])).toBe(false);
        expect(isSetContainer("set")).toBe(false);
        expect(isSetContainer(null)).toBe(false);
        expect(isSetContainer(undefined)).toBe(false);
    });

    it("narrows to Set", () => {
        const val = new Set() as unknown;

        if (isSetContainer(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", Set<any>>>
            ];
        }
    });

});
