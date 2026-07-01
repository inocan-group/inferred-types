import { describe, expect, it } from "vitest";
import type { Dictionary, Expect, Narrowable, ObjectKey, Test } from "inferred-types/types";
import { isDictionary, isNarrowableDictionary } from "inferred-types/runtime";

describe("isDictionary(val)", () => {

    it("happy path: plain objects return true", () => {
        const t1 = isDictionary({ a: 1 });
        const t2 = isDictionary({});

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("false cases: arrays, Map, Set, WeakMap are NOT dictionaries", () => {
        // per source: excludes arrays, Map, Set, WeakMap
        expect(isDictionary([1, 2, 3])).toBe(false);
        expect(isDictionary([])).toBe(false);
        expect(isDictionary(new Map())).toBe(false);
        expect(isDictionary(new Set())).toBe(false);
        expect(isDictionary(new WeakMap())).toBe(false);
    });

    it("false cases: null, undefined, primitives and functions", () => {
        expect(isDictionary(null)).toBe(false);
        expect(isDictionary(undefined)).toBe(false);
        expect(isDictionary("foo")).toBe(false);
        expect(isDictionary(42)).toBe(false);
        expect(isDictionary(true)).toBe(false);
        expect(isDictionary(() => {})).toBe(false);
    });

    it("narrows type to Dictionary", () => {
        const val = { a: 1 } as unknown;

        if (isDictionary(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Dictionary>>
            ];
        }
    });

});

describe("isNarrowableDictionary(val)", () => {

    it("happy path: dictionaries whose values are all narrowable", () => {
        // typeof of each value must be one of:
        // string | number | boolean | symbol | object | undefined | void | null
        const t1 = isNarrowableDictionary({ a: 1, b: "x", c: true });
        const t2 = isNarrowableDictionary({}); // vacuously true (no values)
        const t3 = isNarrowableDictionary({ a: null, b: undefined });
        const t4 = isNarrowableDictionary({ nested: { deep: 1 } }); // typeof object
        const t5 = isNarrowableDictionary({ arr: [1, 2, 3] }); // typeof array is "object"

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
    });

    it("false cases: a value which is a function is not narrowable", () => {
        // typeof (() => {}) === "function" which is NOT in the allowed list
        expect(isNarrowableDictionary({ fn: () => {} })).toBe(false);
    });

    it("false cases: non-dictionaries", () => {
        expect(isNarrowableDictionary([1, 2, 3])).toBe(false);
        expect(isNarrowableDictionary(null)).toBe(false);
        expect(isNarrowableDictionary(undefined)).toBe(false);
        expect(isNarrowableDictionary("foo")).toBe(false);
        expect(isNarrowableDictionary(new Map())).toBe(false);
    });

    it("narrows type to Dictionary<ObjectKey, Narrowable>", () => {
        const val = { a: 1 } as unknown;

        if (isNarrowableDictionary(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Dictionary<ObjectKey, Narrowable>>>
            ];
        }
    });

});
