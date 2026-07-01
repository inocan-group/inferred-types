import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isNever } from "inferred-types/runtime";
import { Never } from "inferred-types/constants";

describe("isNever(val)", () => {

    it("returns true for the Never runtime constant", () => {
        expect(isNever(Never)).toBe(true);
        expect(isNever({ _type: "Constant", kind: "never" })).toBe(true);
    });

    it("returns false for other constants and values", () => {
        expect(isNever({ _type: "Constant", kind: "no-default-value" })).toBe(false);
        // not a Constant (missing _type)
        expect(isNever({ kind: "never" })).toBe(false);
        expect(isNever(42)).toBe(false);
        expect(isNever("never")).toBe(false);
        expect(isNever(null)).toBe(false);
        expect(isNever(undefined)).toBe(false);
        expect(isNever([])).toBe(false);
    });

    it("narrows to never", () => {
        const val = { _type: "Constant", kind: "never" } as const;

        if (isNever(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", never>>
            ];
        }
    });

});
