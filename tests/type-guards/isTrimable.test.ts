import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { isTrimable } from "inferred-types/runtime";

describe("isTrimable(val)", () => {

    it("happy path: strings with leading/trailing whitespace are trimable", () => {
        expect(isTrimable(" foo")).toBe(true);
        expect(isTrimable("foo ")).toBe(true);
        expect(isTrimable(" foo ")).toBe(true);
        expect(isTrimable("\tfoo")).toBe(true);
        expect(isTrimable("foo\n")).toBe(true);
        // a string that is entirely whitespace differs from its trim ("")
        expect(isTrimable("  ")).toBe(true);
    });

    it("false cases: no edge whitespace means not trimable", () => {
        expect(isTrimable("foo")).toBe(false);
        // interior whitespace is untouched by trim()
        expect(isTrimable("foo bar")).toBe(false);
        // empty string trims to itself
        expect(isTrimable("")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(isTrimable(42)).toBe(false);
        expect(isTrimable(null)).toBe(false);
        expect(isTrimable(undefined)).toBe(false);
        expect(isTrimable({})).toBe(false);
    });

    it("type guard preserves the string type", () => {
        const val = " foo" as string;

        if (isTrimable(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", string>>,
            ];
        }
    });

});
