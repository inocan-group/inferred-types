import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isMap } from "inferred-types/runtime";

describe("isMap(val)", () => {

    it("happy path", () => {
        const t1 = isMap(new Map());
        const t2 = isMap(new Map([["a", 1]]));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("non-Map values return false without throwing", () => {
        expect(isMap(new WeakMap())).toBe(false);
        expect(isMap(new Set())).toBe(false);
        expect(isMap({})).toBe(false);
        expect(isMap([])).toBe(false);
        expect(isMap("map")).toBe(false);
        expect(isMap(null)).toBe(false);
        expect(isMap(undefined)).toBe(false);
    });

    it("narrows to Map", () => {
        const val = new Map() as unknown;

        if (isMap(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", Map<any, any>>>
            ];
        }
    });

});
