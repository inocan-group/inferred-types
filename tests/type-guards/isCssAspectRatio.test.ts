import { describe, expect, it } from "vitest";
import type { CssAspectRatio, Expect, Test } from "inferred-types/types";

import { isCssAspectRatio } from "inferred-types/runtime";

describe("isCssAspectRatio(val)", () => {

    it("happy path: ratio notation and keyword tokens are valid", () => {
        // ratios (no spaces)
        expect(isCssAspectRatio("16/9")).toBe(true);
        expect(isCssAspectRatio("4/3")).toBe(true);
        expect(isCssAspectRatio("1/1")).toBe(true);
        // the literal "1"
        expect(isCssAspectRatio("1")).toBe(true);
        // css global / auto keywords
        expect(isCssAspectRatio("auto")).toBe(true);
        expect(isCssAspectRatio("inherit")).toBe(true);
        expect(isCssAspectRatio("initial")).toBe(true);
        expect(isCssAspectRatio("revert")).toBe(true);
        expect(isCssAspectRatio("revert-layer")).toBe(true);
        expect(isCssAspectRatio("unset")).toBe(true);
    });

    it("false cases", () => {
        expect(isCssAspectRatio("")).toBe(false);
        expect(isCssAspectRatio("nope")).toBe(false);
        expect(isCssAspectRatio("16-9")).toBe(false);
        expect(isCssAspectRatio("16/")).toBe(false);
        expect(isCssAspectRatio("/9")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(isCssAspectRatio(42)).toBe(false);
        expect(isCssAspectRatio(null)).toBe(false);
        expect(isCssAspectRatio(undefined)).toBe(false);
        expect(isCssAspectRatio({})).toBe(false);
    });

    // BUG (documented): `CssAspectRatio`'s `Ratio` allows optional spaces around
    // the slash (`${number}${OptionalSpace}/${OptionalSpace}${number}`), so
    // "16 / 9" is a valid CssAspectRatio type. The runtime first splits on
    // whitespace (`val.split(/\s+/)`), breaking "16 / 9" into ["16","/","9"]
    // which no longer matches the ratio regex, so it returns `false`.
    // The runtime should agree with the type and return `true`.
    it("edge case: spaces around the slash should still be a valid ratio", () => {
        expect(isCssAspectRatio("16 / 9")).toBe(true);
    });

    it("type guard narrows to CssAspectRatio", () => {
        const val = "16/9" as string;

        if (isCssAspectRatio(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", string & CssAspectRatio>>,
            ];
        }
    });

});
