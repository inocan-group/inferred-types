import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { hasNonStringKeys } from "inferred-types/runtime";

describe("hasNonStringKeys(val)", () => {
    it("returns true for an object which has one or more symbol keys", () => {
        const sym = Symbol("id");
        const obj = { [sym]: 1, name: "bob" };

        const result = hasNonStringKeys(obj);
        expect(result).toBe(true);

        type cases = [
            Expect<Test<typeof result, "equals", boolean>>
        ];
    });

    it("returns true when the object has only symbol keys", () => {
        const sym = Symbol("only");
        expect(hasNonStringKeys({ [sym]: "x" })).toBe(true);
    });

    it("returns false for a plain object with only string keys", () => {
        expect(hasNonStringKeys({ a: 1, b: 2 })).toBe(false);
        expect(hasNonStringKeys({})).toBe(false);
    });

    it("returns false for non-dictionary values", () => {
        expect(hasNonStringKeys(5)).toBe(false);
        expect(hasNonStringKeys("str")).toBe(false);
        expect(hasNonStringKeys(null)).toBe(false);
        expect(hasNonStringKeys(undefined)).toBe(false);
        expect(hasNonStringKeys([1, 2, 3])).toBe(false);
    });
});
