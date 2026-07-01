import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isWeakMap } from "inferred-types/runtime";

describe("isWeakMap(val)", () => {

    it("happy path", () => {
        const key = {};
        const t1 = isWeakMap(new WeakMap());
        const t2 = isWeakMap(new WeakMap([[key, 1]]));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("non-WeakMap values return false without throwing", () => {
        expect(isWeakMap(new Map())).toBe(false);
        expect(isWeakMap(new Set())).toBe(false);
        expect(isWeakMap({})).toBe(false);
        expect(isWeakMap([])).toBe(false);
        expect(isWeakMap("weakmap")).toBe(false);
        expect(isWeakMap(null)).toBe(false);
        expect(isWeakMap(undefined)).toBe(false);
    });

    it("narrows to WeakMap", () => {
        const val = new WeakMap() as unknown;

        if (isWeakMap(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", WeakMap<any, any>>>
            ];
        }
    });

});
