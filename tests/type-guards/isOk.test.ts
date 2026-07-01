import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { err, isOk } from "inferred-types/runtime";

describe("isOk(val)", () => {

    it("returns true for non-Error values", () => {
        expect(isOk(5)).toBe(true);
        expect(isOk("foo")).toBe(true);
        expect(isOk(null)).toBe(true);
        expect(isOk(undefined)).toBe(true);
        expect(isOk({})).toBe(true);
        expect(isOk([])).toBe(true);
        expect(isOk(false)).toBe(true);
    });

    it("returns false for Error values", () => {
        expect(isOk(new Error("boom"))).toBe(false);
        expect(isOk(err("oops", "bad"))).toBe(false);
        expect(isOk(new TypeError("type"))).toBe(false);
    });

    it("narrows by excluding Error", () => {
        const val = 5 as number | Error;

        if (isOk(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", number>>
            ];
        }
    });

});
