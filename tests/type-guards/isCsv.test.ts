import { describe, expect, it } from "vitest";
import type { Csv, Expect, Test } from "inferred-types/types";

import { isCsv } from "inferred-types/runtime";

describe("isCsv(val)", () => {

    it("happy path: a string containing a comma (not leading) is CSV", () => {
        expect(isCsv("a,b")).toBe(true);
        expect(isCsv("a,b,c")).toBe(true);
        expect(isCsv("foo,bar,baz")).toBe(true);
        // trailing comma still qualifies (there IS a comma, not at the start)
        expect(isCsv("a,")).toBe(true);
    });

    it("false cases", () => {
        // no comma at all
        expect(isCsv("abc")).toBe(false);
        expect(isCsv("")).toBe(false);
        // leading comma is explicitly rejected
        expect(isCsv(",a")).toBe(false);
        expect(isCsv(",")).toBe(false);
    });

    it("non-string values return false without throwing", () => {
        expect(isCsv(42)).toBe(false);
        expect(isCsv(null)).toBe(false);
        expect(isCsv(undefined)).toBe(false);
        expect(isCsv(["a", "b"])).toBe(false);
        expect(isCsv({})).toBe(false);
    });

    it("type guard narrows to Csv", () => {
        const val = "a,b" as unknown;

        if (isCsv(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Csv>>,
            ];
        }
    });

});
