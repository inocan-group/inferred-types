import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isNothing } from "inferred-types/runtime";

describe("isNothing(val)", () => {

    it("returns true for null and undefined", () => {
        expect(isNothing(null)).toBe(true);
        expect(isNothing(undefined)).toBe(true);
    });

    it("returns false for defined values (including falsy)", () => {
        expect(isNothing(0)).toBe(false);
        expect(isNothing("")).toBe(false);
        expect(isNothing(false)).toBe(false);
        expect(isNothing(NaN)).toBe(false);
        expect(isNothing({})).toBe(false);
        expect(isNothing([])).toBe(false);
        expect(isNothing("foo")).toBe(false);
    });

    it("narrows to the Nothing subset of the input type", () => {
        const val = "foo" as string | null | undefined;

        if (isNothing(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", null | undefined>>
            ];
        }
    });

});
