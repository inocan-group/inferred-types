import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";
import { isDoneFn } from "inferred-types/runtime";

describe("isDoneFn(val)", () => {

    it("happy path: object with a `done` function", () => {
        // per source: isDictionary && "done" in val && typeof val.done === "function"
        const t1 = isDoneFn({ done: () => {} });
        const t2 = isDoneFn({ done: () => 42, other: 1 });

        expect(t1).toBe(true);
        expect(t2).toBe(true);
    });

    it("false cases: `done` is not a function", () => {
        expect(isDoneFn({ done: 1 })).toBe(false);
        expect(isDoneFn({ done: "x" })).toBe(false);
        expect(isDoneFn({})).toBe(false);
    });

    it("false cases: non-dictionaries", () => {
        expect(isDoneFn(null)).toBe(false);
        expect(isDoneFn(undefined)).toBe(false);
        expect(isDoneFn("foo")).toBe(false);
        expect(isDoneFn(42)).toBe(false);
        expect(isDoneFn([])).toBe(false);
        expect(isDoneFn(() => {})).toBe(false);
    });

    it("narrows type by intersecting with a done() function", () => {
        const val = { done: () => 42 } as { done: () => number };

        if (isDoneFn(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "extends", { done: () => unknown }>>
            ];
        }
    });

});
