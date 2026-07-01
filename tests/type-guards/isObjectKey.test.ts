import { describe, expect, it } from "vitest";
import type { Expect, ObjectKey, Test } from "inferred-types/types";
import { isObjectKey } from "inferred-types/runtime";

describe("isObjectKey(val)", () => {

    it("happy path: strings and symbols are valid object keys", () => {
        // per source: `isString(val) || isSymbol(val)`
        const t1 = isObjectKey("foo");
        const t2 = isObjectKey("");
        const t3 = isObjectKey(Symbol("s"));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
    });

    it("false cases: numbers, booleans, null, undefined, objects", () => {
        expect(isObjectKey(42)).toBe(false);
        expect(isObjectKey(true)).toBe(false);
        expect(isObjectKey(null)).toBe(false);
        expect(isObjectKey(undefined)).toBe(false);
        expect(isObjectKey({})).toBe(false);
        expect(isObjectKey([])).toBe(false);
    });

    it("narrows type to ObjectKey", () => {
        const val = "foo" as unknown;

        if (isObjectKey(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", ObjectKey>>
            ];
        }
    });

});
