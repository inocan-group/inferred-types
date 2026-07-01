import { describe, expect, it } from "vitest";
import type { Expect, Indexable, Test } from "inferred-types/types";
import { isIndexable } from "inferred-types/runtime";

describe("isIndexable(val)", () => {

    it("happy path: arrays and non-empty objects are indexable", () => {
        // per source: Array.isArray(v) || (typeof v === "object" && keysOf(v).length > 0)
        expect(isIndexable([1, 2, 3])).toBe(true);
        expect(isIndexable([])).toBe(true); // empty array still passes Array.isArray
        expect(isIndexable({ a: 1 })).toBe(true);
    });

    it("false cases: empty object has no keys so is not indexable", () => {
        expect(isIndexable({})).toBe(false);
    });

    it("false cases: primitives and undefined", () => {
        expect(isIndexable("foo")).toBe(false);
        expect(isIndexable(42)).toBe(false);
        expect(isIndexable(true)).toBe(false);
        expect(isIndexable(undefined)).toBe(false);
    });

    it("null should return false, not throw", () => {
        // A type guard must never throw. `typeof null === "object"` is true so the
        // source calls keysOf(null) -> Object.keys(null) which throws a TypeError.
        // Intended behaviour: null is not indexable -> false.
        expect(isIndexable(null)).toBe(false);
    });

    it("narrows type by intersecting with Indexable", () => {
        const val = { a: 1 } as { a: number };

        if (isIndexable(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "extends", Indexable>>
            ];
        }
    });

});
