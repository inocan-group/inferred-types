import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { hasWhiteSpace } from "inferred-types/runtime";

describe("hasWhiteSpace(val)", () => {

    it("happy path: any whitespace character anywhere returns true", () => {
        expect(hasWhiteSpace("a b")).toBe(true);
        expect(hasWhiteSpace(" foo")).toBe(true);
        expect(hasWhiteSpace("foo ")).toBe(true);
        expect(hasWhiteSpace("a\tb")).toBe(true);
        expect(hasWhiteSpace("a\nb")).toBe(true);
        // a single space
        expect(hasWhiteSpace(" ")).toBe(true);
    });

    it("false cases: strings with no whitespace return false", () => {
        expect(hasWhiteSpace("foo")).toBe(false);
        expect(hasWhiteSpace("foo-bar")).toBe(false);
        expect(hasWhiteSpace("123")).toBe(false);
        // empty string has no whitespace
        expect(hasWhiteSpace("")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(hasWhiteSpace(42)).toBe(false);
        expect(hasWhiteSpace(null)).toBe(false);
        expect(hasWhiteSpace(undefined)).toBe(false);
        expect(hasWhiteSpace({})).toBe(false);
    });

    it("type guard preserves the string type", () => {
        const val = "a b" as string;

        if (hasWhiteSpace(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", string>>,
            ];
        }
    });

});
