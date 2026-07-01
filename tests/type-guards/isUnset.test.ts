import { describe, expect, it } from "vitest";
import type { Expect, Test, Unset } from "inferred-types/types";
import { isUnset, unset } from "inferred-types/runtime";

describe("isUnset(val)", () => {

    it("positive cases", () => {
        const t1 = isUnset(unset);
        const t2 = isUnset({ kind: "Unset" });

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("negative cases", () => {
        expect(isUnset({})).toBe(false);
        expect(isUnset({ kind: "Set" })).toBe(false);
        expect(isUnset("Unset")).toBe(false);
        expect(isUnset(null)).toBe(false);
        expect(isUnset(undefined)).toBe(false);
        expect(isUnset([])).toBe(false);
        // an array with the right shape is still not a dictionary
        expect(isUnset(["Unset"])).toBe(false);
        expect(isUnset(42)).toBe(false);
    });

    it("narrows to Unset", () => {
        const val = unset as unknown;

        if (isUnset(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", Unset>>
            ];
        }
    });

});
