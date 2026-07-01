import { describe, expect, it } from "vitest";
import type { Expect, Narrowable, Test } from "inferred-types/types";
import { isNarrowable } from "inferred-types/runtime";

describe("isNarrowable(val)", () => {

    it("happy path: strings, numbers, booleans, symbols, dictionaries, null, undefined", () => {
        // per source: isString || isNumber || isBoolean || isSymbol
        //             || isDictionary || isNull || isUndefined
        expect(isNarrowable("foo")).toBe(true);
        expect(isNarrowable("")).toBe(true);
        expect(isNarrowable(42)).toBe(true);
        expect(isNarrowable(0)).toBe(true);
        expect(isNarrowable(true)).toBe(true);
        expect(isNarrowable(false)).toBe(true);
        expect(isNarrowable(Symbol("s"))).toBe(true);
        expect(isNarrowable({})).toBe(true);
        expect(isNarrowable({ a: 1 })).toBe(true);
        expect(isNarrowable(null)).toBe(true);
        expect(isNarrowable(undefined)).toBe(true);
    });

    it("false cases: arrays and functions are not treated as narrowable", () => {
        // isDictionary excludes arrays, and functions match no branch
        expect(isNarrowable([1, 2, 3])).toBe(false);
        expect(isNarrowable([])).toBe(false);
        expect(isNarrowable(() => {})).toBe(false);
        expect(isNarrowable(new Map())).toBe(false);
        expect(isNarrowable(new Set())).toBe(false);
    });

    it("narrows type to Narrowable", () => {
        const val = "foo" as unknown;

        if (isNarrowable(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Narrowable>>
            ];
        }
    });

});
