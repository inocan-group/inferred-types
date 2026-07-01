import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isObject } from "inferred-types/runtime";

describe("isObject(val)", () => {

    it("happy path: objects (including arrays, Map, Set, WeakMap) return true", () => {
        // per source: `typeof value === "object" && value !== null`
        const t1 = isObject({ a: 1 });
        const t2 = isObject({});
        const t3 = isObject([1, 2, 3]); // arrays ARE objects
        const t4 = isObject(new Map());
        const t5 = isObject(new Set());
        const t6 = isObject(new WeakMap());

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
        expect(t6).toBe(true);
    });

    it("false cases: null, undefined, primitives and functions", () => {
        expect(isObject(null)).toBe(false);
        expect(isObject(undefined)).toBe(false);
        expect(isObject("foo")).toBe(false);
        expect(isObject(42)).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject(Symbol("s"))).toBe(false);
        expect(isObject(() => {})).toBe(false);
    });

    it("narrows type to object", () => {
        const val = { a: 1 } as unknown;

        if (isObject(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", object>>
            ];
        }
    });

});
