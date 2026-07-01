import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { err, isTypedError } from "inferred-types/runtime";

describe("isTypedError(type)(val)", () => {

    it("returns true for errors that carry a string `type` property", () => {
        const guard = isTypedError("parse/syntax");
        const typed = err("parse/syntax", "bad token");
        const simple = err("oops", "boom");

        expect(guard(typed)).toBe(true);
        // the runtime check only inspects for a string `type` property, so
        // any typed error passes regardless of the configured type
        expect(guard(simple)).toBe(true);
    });

    it("returns false for plain Errors without a `type` property", () => {
        const guard = isTypedError("parse/syntax");

        expect(guard(new Error("plain"))).toBe(false);
        expect(guard(new TypeError("type"))).toBe(false);
    });

    it("returns false for non-Error values", () => {
        const guard = isTypedError("parse/syntax");

        expect(guard(42)).toBe(false);
        expect(guard("parse")).toBe(false);
        expect(guard(null)).toBe(false);
        expect(guard(undefined)).toBe(false);
        // a plain object with a type property is not an Error instance
        expect(guard({ type: "parse" })).toBe(false);
    });

    it("narrows to a TypedError (extends Error)", () => {
        const val = err("parse/syntax", "bad token") as unknown;

        if (isTypedError("parse/syntax")(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", Error>>
            ];
        }
    });

});
