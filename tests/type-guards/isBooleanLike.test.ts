import { describe, expect, it } from "vitest";
import type { BooleanLike, Expect, Test } from "inferred-types/types";
import { isBooleanLike } from "inferred-types/runtime";

describe("isBooleanLike(val)", () => {

    it("happy path", () => {
        const t1 = isBooleanLike(true);
        const t2 = isBooleanLike(false);
        const t3 = isBooleanLike("true");
        const t4 = isBooleanLike("false");
        const t5 = isBooleanLike("boolean");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);
        expect(t5).toBe(true);
    });

    it("non boolean-like values return false", () => {
        const f1 = isBooleanLike("True");
        const f2 = isBooleanLike("yes");
        const f3 = isBooleanLike("1");
        const f4 = isBooleanLike(1);
        const f5 = isBooleanLike(0);

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);
        expect(f5).toBe(false);
    });

    it("empty and nullish values return false without throwing", () => {
        expect(isBooleanLike(null)).toBe(false);
        expect(isBooleanLike(undefined)).toBe(false);
        expect(isBooleanLike("")).toBe(false);
        expect(isBooleanLike({})).toBe(false);
        expect(isBooleanLike([])).toBe(false);
    });

    it("narrows to BooleanLike", () => {
        const val = "true" as unknown;

        if (isBooleanLike(val)) {
            type cases = [
                Expect<Test<typeof val, "equals", BooleanLike>>
            ];
        }
    });

});
