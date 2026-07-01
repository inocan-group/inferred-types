import { describe, expect, it } from "vitest";
import type { AlphaChar, Expect, Test } from "inferred-types/types";

import { isAlpha } from "inferred-types/runtime";

describe("isAlpha(value)", () => {

    it("happy path: purely alphabetic strings are true", () => {
        const t1 = isAlpha("foo");
        const t2 = isAlpha("FOO");
        const t3 = isAlpha("aBcXyZ");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
    });

    it("false cases: any non-alpha character makes it false", () => {
        // digits
        expect(isAlpha("foo1")).toBe(false);
        expect(isAlpha("123")).toBe(false);
        // whitespace
        expect(isAlpha("foo bar")).toBe(false);
        expect(isAlpha(" foo")).toBe(false);
        // punctuation / symbols
        expect(isAlpha("foo-bar")).toBe(false);
        expect(isAlpha("foo_bar")).toBe(false);
        expect(isAlpha("32°")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(isAlpha(42)).toBe(false);
        expect(isAlpha(null)).toBe(false);
        expect(isAlpha(undefined)).toBe(false);
        expect(isAlpha({})).toBe(false);
        expect(isAlpha(["a", "b"])).toBe(false);
    });

    // BUG (documented): an empty string contains no alphabetic characters and
    // is not assignable to `AlphaChar`, so the guard should return `false`.
    // The implementation uses `.every()` which is vacuously `true` for the
    // empty character array, so it currently (incorrectly) returns `true`.
    it("edge case: empty string should NOT be considered alpha", () => {
        expect(isAlpha("")).toBe(false);
    });

    it("type guard narrows to AlphaChar", () => {
        const val = "foo" as string;

        if (isAlpha(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", string & AlphaChar>>,
            ];
        }
    });

});
