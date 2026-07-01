import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isSymbol } from "inferred-types/runtime";

describe("isSymbol(val)", () => {

    it("happy path", () => {
        const t1 = isSymbol(Symbol("foo"));
        const t2 = isSymbol(Symbol.iterator);
        const t3 = isSymbol(Symbol.for("shared"));

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
    });

    it("non-symbol values return false without throwing", () => {
        expect(isSymbol("foo")).toBe(false);
        expect(isSymbol(42)).toBe(false);
        expect(isSymbol(true)).toBe(false);
        expect(isSymbol(null)).toBe(false);
        expect(isSymbol(undefined)).toBe(false);
        expect(isSymbol({})).toBe(false);
        expect(isSymbol([])).toBe(false);
    });

    it("narrows to symbol", () => {
        const val = Symbol("x") as unknown;

        if (isSymbol(val)) {
            type cases = [
                Expect<Test<typeof val, "extends", symbol>>
            ];
        }
    });

});
