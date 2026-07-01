import { describe, expect, it } from "vitest";
import type { Expect, LeftRight, Test } from "inferred-types/types";
// NOTE: `isLeftRight` is not re-exported from the `inferred-types/runtime`
// barrel, so it is imported directly via the deep `runtime/*` alias.
import { isLeftRight } from "runtime/type-guards/isLeftRight";

describe("isLeftRight(value)", () => {

    it("returns true for a LeftRight tuple", () => {
        const lr = ["LeftRight", 1, 2];

        expect(isLeftRight(lr)).toBe(true);
        expect(isLeftRight(["LeftRight", "a", "b"])).toBe(true);
    });

    it("returns false when the discriminant is not 'LeftRight'", () => {
        expect(isLeftRight(["Other", 1, 2])).toBe(false);
        expect(isLeftRight([1, 2, 3])).toBe(false);
    });

    it("returns false when length is not 3", () => {
        expect(isLeftRight(["LeftRight", 1])).toBe(false);
        expect(isLeftRight(["LeftRight", 1, 2, 3])).toBe(false);
        expect(isLeftRight(["LeftRight"])).toBe(false);
    });

    it("returns false for non-array values", () => {
        expect(isLeftRight("LeftRight")).toBe(false);
        expect(isLeftRight(42)).toBe(false);
        expect(isLeftRight(null)).toBe(false);
        expect(isLeftRight(undefined)).toBe(false);
        expect(isLeftRight({ 0: "LeftRight", 1: 1, 2: 2 })).toBe(false);
    });

    it("narrows to a LeftRight tuple", () => {
        const lr = ["LeftRight", 1, 2] as ["LeftRight", 1, 2];

        if (isLeftRight(lr)) {
            type cases = [
                Expect<Test<typeof lr, "extends", LeftRight<unknown, unknown>>>
            ];
        }
    });

});
