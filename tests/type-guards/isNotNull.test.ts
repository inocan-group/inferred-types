import { describe, expect, it } from "vitest";
import { isNotNull } from "inferred-types/runtime";

/**
 * `isNotNull(value)` is documented as a type guard which validates that the
 * passed in value is **not** `null`. Therefore:
 *  - a non-null value should return `true`
 *  - the `null` value should return `false`
 *
 * These tests assert the intended (documented) behavior.
 */
describe("isNotNull(value)", () => {

    it("returns true for non-null values", () => {
        expect(isNotNull(5)).toBe(true);
        expect(isNotNull("foo")).toBe(true);
        expect(isNotNull(undefined)).toBe(true);
        expect(isNotNull(0)).toBe(true);
        expect(isNotNull("")).toBe(true);
        expect(isNotNull(false)).toBe(true);
        expect(isNotNull({})).toBe(true);
        expect(isNotNull([])).toBe(true);
    });

    it("returns false for null", () => {
        expect(isNotNull(null)).toBe(false);
    });

});
