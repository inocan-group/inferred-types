import { describe, expect, it } from "vitest";
import { createErrorCondition, hasErrorConditions } from "inferred-types/runtime";

/**
 * NOTE (bug documentation):
 *
 * `hasErrorConditions` (modules/runtime/src/type-guards/hasErrorConditions.ts)
 * is currently un-shippable and these tests assert its INTENDED behavior, so
 * they FAIL until the source is fixed. Per testing rules the assertions document
 * the correct behavior rather than the current (broken) behavior. Three distinct
 * problems make the guard unusable:
 *
 *   1. It is NOT re-exported from the type-guards barrel
 *      (`modules/runtime/src/type-guards/index.ts` has no `./hasErrorConditions`
 *      line), so importing it from `inferred-types/runtime` yields `undefined`
 *      and calling it throws `TypeError: hasErrorConditions is not a function`.
 *   2. Its implementation imports `isErrorCondition` from `inferred-types/runtime`,
 *      but no such runtime symbol is defined/exported anywhere.
 *   3. Its implementation imports the type `ErrorCondition` from
 *      `inferred-types/types`, which is also not exported (the shipped type is
 *      named `Err`).
 */
describe("hasErrorConditions(list)", () => {
    it("is exported from the runtime as a callable guard", () => {
        expect(typeof hasErrorConditions).toBe("function");
    });

    it("returns true when the list contains an ErrorCondition", () => {
        const err = createErrorCondition("Explosion", "kaboom");
        const list = [1, "two", err];

        expect(hasErrorConditions(list)).toBe(true);
    });

    it("returns false when the list contains no ErrorCondition", () => {
        expect(hasErrorConditions([1, 2, 3])).toBe(false);
        expect(hasErrorConditions(["a", "b"])).toBe(false);
    });

    it("returns false for an empty list", () => {
        expect(hasErrorConditions([])).toBe(false);
    });
});
