import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isTypeTuple } from "inferred-types/runtime";

const guardFn = (x: unknown): x is string => typeof x === "string";

describe("isTypeTuple(value)", () => {

    it("returns true for a valid TypeTuple", () => {
        const tt = ["string", guardFn, "a string type"];

        expect(isTypeTuple(tt)).toBe(true);
    });

    it("returns false when the middle element is not a function", () => {
        // length 3 but element[1] is not a guard function
        expect(isTypeTuple([1, 2, 3])).toBe(false);
        expect(isTypeTuple(["string", "not-a-fn", "desc"])).toBe(false);
    });

    it("returns false when length is not 3", () => {
        expect(isTypeTuple(["string", guardFn])).toBe(false);
        expect(isTypeTuple(["string", guardFn, "desc", "extra"])).toBe(false);
        expect(isTypeTuple([])).toBe(false);
    });

    it("returns false for non-array values", () => {
        expect(isTypeTuple("string")).toBe(false);
        expect(isTypeTuple(42)).toBe(false);
        expect(isTypeTuple(null)).toBe(false);
        expect(isTypeTuple(undefined)).toBe(false);
        expect(isTypeTuple({ 0: "string", 1: guardFn, 2: "desc", length: 3 })).toBe(false);
    });

    it("narrows to a TypeTuple-shaped tuple", () => {
        const val = ["string", guardFn, "a string type"] as unknown;

        if (isTypeTuple(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", readonly unknown[]>>
            ];
        }
    });

});
