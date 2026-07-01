import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { err, isErr } from "inferred-types/runtime";

describe("isErr(val)", () => {

    it("returns true for Err values (no type filter)", () => {
        const e = err("oops", "something went wrong");
        const typed = err("parse/syntax", "bad token");

        expect(isErr(e)).toBe(true);
        expect(isErr(typed)).toBe(true);
        // any Error instance passes the untyped check
        expect(isErr(new Error("plain"))).toBe(true);
    });

    it("returns false for non-Error values", () => {
        expect(isErr("oops")).toBe(false);
        expect(isErr(42)).toBe(false);
        expect(isErr(null)).toBe(false);
        expect(isErr(undefined)).toBe(false);
        expect(isErr({ type: "oops" })).toBe(false);
        expect(isErr([])).toBe(false);
    });

    it("matches on the `type` when a type filter is supplied", () => {
        const e = err("oops", "something went wrong");

        expect(isErr(e, "oops")).toBe(true);
        expect(isErr(e, "different")).toBe(false);
    });

    it("matches the leading type of a type/subType error", () => {
        const typed = err("parse/syntax", "bad token");

        // matching only the top-level `type`
        expect(isErr(typed, "parse")).toBe(true);
        expect(isErr(typed, "runtime")).toBe(false);
    });

    it("matches on the full type/subType filter", () => {
        const typed = err("parse/syntax", "bad token");

        // an Err created with type "parse/syntax" SHOULD match the
        // "parse/syntax" filter (type: parse, subType: syntax)
        expect(isErr(typed, "parse/syntax")).toBe(true);
        // wrong subType should not match
        expect(isErr(typed, "parse/semantic")).toBe(false);
    });

    it("narrows to an Error subtype", () => {
        const val = err("oops", "boom") as unknown;

        if (isErr(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", Error>>
            ];
        }
    });

});
