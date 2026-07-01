import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isRegExp } from "inferred-types/runtime";

describe("isRegExp(val)", () => {

    it("happy path", () => {
        const t1 = isRegExp(/foo/);
        const t2 = isRegExp(new RegExp("bar"));
        const t3 = isRegExp(/baz/gi);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
    });

    it("non-RegExp values (including regex-like strings) return false without throwing", () => {
        expect(isRegExp("/foo/")).toBe(false);
        expect(isRegExp("foo")).toBe(false);
        expect(isRegExp(42)).toBe(false);
        expect(isRegExp(null)).toBe(false);
        expect(isRegExp(undefined)).toBe(false);
        expect(isRegExp({})).toBe(false);
        expect(isRegExp([])).toBe(false);
    });

    it("narrows to RegExp", () => {
        const val = /foo/ as unknown;

        if (isRegExp(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", RegExp>>
            ];
        }
    });

});
