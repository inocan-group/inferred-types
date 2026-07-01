import { describe, expect, it } from "vitest";
import { err, isNotError } from "inferred-types/runtime";

describe("isNotError(val)", () => {

    it("returns true for non-Error values", () => {
        expect(isNotError(5)).toBe(true);
        expect(isNotError("foo")).toBe(true);
        expect(isNotError(null)).toBe(true);
        expect(isNotError(undefined)).toBe(true);
        expect(isNotError({})).toBe(true);
        expect(isNotError([])).toBe(true);
        // a plain object that looks like an error but isn't an instance
        expect(isNotError({ message: "not really an error" })).toBe(true);
    });

    it("returns false for Error values", () => {
        expect(isNotError(new Error("boom"))).toBe(false);
        expect(isNotError(err("oops", "bad"))).toBe(false);
        expect(isNotError(new RangeError("range"))).toBe(false);
    });

});
