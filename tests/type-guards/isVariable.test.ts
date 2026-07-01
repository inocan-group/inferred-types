import { describe, expect, it } from "vitest";
import type { Expect, Test, Variable } from "inferred-types/types";
import { isVariable } from "inferred-types/runtime";

describe("isVariable(val)", () => {

    it("happy path: alpha-leading strings of valid chars", () => {
        // per source: isString && starts-with-alpha && every char in [alpha,numeric,_,.]
        expect(isVariable("foo")).toBe(true);
        expect(isVariable("Foo")).toBe(true);
        expect(isVariable("fooBar")).toBe(true);
        expect(isVariable("foo_bar")).toBe(true);
        expect(isVariable("foo.bar")).toBe(true);
        expect(isVariable("foo123")).toBe(true);
    });

    it("false cases: does not start with an alpha character", () => {
        expect(isVariable("1foo")).toBe(false);
        expect(isVariable("_foo")).toBe(false);
        expect(isVariable(".foo")).toBe(false);
        expect(isVariable("")).toBe(false);
    });

    it("false cases: contains invalid characters", () => {
        expect(isVariable("foo-bar")).toBe(false);
        expect(isVariable("foo bar")).toBe(false);
        expect(isVariable("foo!")).toBe(false);
    });

    it("false cases: non-string values", () => {
        expect(isVariable(42)).toBe(false);
        expect(isVariable(null)).toBe(false);
        expect(isVariable(undefined)).toBe(false);
        expect(isVariable({})).toBe(false);
    });

    it("narrows type to Variable", () => {
        const val = "foo" as string;

        if (isVariable(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Variable>>
            ];
        }
    });

});
