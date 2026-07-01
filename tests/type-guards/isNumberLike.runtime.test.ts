import { describe, expect, it } from "vitest";
import type { Expect, NumberLike, Test } from "inferred-types/types";

import { isNumberLike } from "inferred-types/runtime";

// NOTE: this file tests the RUNTIME guard `isNumberLike`. The type-only utility
// `IsNumberLike<T>` is covered separately in `isNumberLike.test.ts`.

describe("isNumberLike(value)", () => {

    it("happy path: actual numbers are number-like", () => {
        expect(isNumberLike(0)).toBe(true);
        expect(isNumberLike(42)).toBe(true);
        expect(isNumberLike(-1)).toBe(true);
        expect(isNumberLike(3.14)).toBe(true);
    });

    it("happy path: numeric strings (digits only) are number-like", () => {
        expect(isNumberLike("0")).toBe(true);
        expect(isNumberLike("42")).toBe(true);
        expect(isNumberLike("1234567890")).toBe(true);
    });

    it("false cases: non-numeric strings and other types", () => {
        expect(isNumberLike("abc")).toBe(false);
        expect(isNumberLike("32°")).toBe(false);
        expect(isNumberLike("4a")).toBe(false);
        expect(isNumberLike(null)).toBe(false);
        expect(isNumberLike(undefined)).toBe(false);
        expect(isNumberLike({})).toBe(false);
        expect(isNumberLike(["1"])).toBe(false);
    });

    // BUG (documented): `IsNumberLike<"">` resolves to `false` at the type level
    // (an empty string is not assignable to `${number}`). The runtime uses
    // `.every()` over the (empty) character array which is vacuously `true`, so
    // `isNumberLike("")` currently returns `true`, contradicting the type.
    it("edge case: empty string should NOT be number-like", () => {
        expect(isNumberLike("")).toBe(false);
    });

    it("type guard narrows to NumberLike", () => {
        const val = "42" as unknown;

        if (isNumberLike(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", NumberLike>>,
            ];
        }
    });

});
