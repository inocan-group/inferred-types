import { describe, expect, it } from "vitest";
import type { Expect, Test, Unset } from "inferred-types/types";
import { isNotUnset, unset } from "inferred-types/runtime";

describe("isNotUnset(val)", () => {

    it("returns false for Unset values", () => {
        expect(isNotUnset(unset)).toBe(false);
        expect(isNotUnset({ kind: "Unset" })).toBe(false);
    });

    it("returns true for non-Unset values", () => {
        expect(isNotUnset("foo")).toBe(true);
        expect(isNotUnset(42)).toBe(true);
        expect(isNotUnset({})).toBe(true);
        expect(isNotUnset({ kind: "Set" })).toBe(true);
        // arrays are not dictionaries, so the guard returns true
        expect(isNotUnset([])).toBe(true);
        // null is not a dictionary, so the guard returns true
        expect(isNotUnset(null)).toBe(true);
        expect(isNotUnset(undefined)).toBe(true);
    });

    it("narrows by excluding Unset", () => {
        const val = "foo" as string | Unset;

        if (isNotUnset(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", string>>
            ];
        }
    });

});
