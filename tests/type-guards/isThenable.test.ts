import { describe, expect, it } from "vitest";
import type { Expect, Test, Thenable } from "inferred-types/types";
import { isThenable } from "inferred-types/runtime";

describe("isThenable(val)", () => {

    it("happy path: native Promise is thenable", () => {
        // per source: isDictionary && "then" in val && "catch" in val && typeof then === function
        const t1 = isThenable(Promise.resolve(1));

        expect(t1).toBe(true);
    });

    it("happy path: plain object with then + catch functions", () => {
        const t1 = isThenable({ then: () => {}, catch: () => {} });

        expect(t1).toBe(true);
    });

    it("false cases: missing catch, missing then, or non-function then", () => {
        expect(isThenable({ then: () => {} })).toBe(false); // no catch
        expect(isThenable({ catch: () => {} })).toBe(false); // no then
        expect(isThenable({ then: 1, catch: () => {} })).toBe(false); // then not a fn
        expect(isThenable({})).toBe(false);
    });

    it("false cases: non-dictionaries", () => {
        expect(isThenable(null)).toBe(false);
        expect(isThenable(undefined)).toBe(false);
        expect(isThenable("foo")).toBe(false);
        expect(isThenable(42)).toBe(false);
        expect(isThenable([])).toBe(false);
        expect(isThenable(() => {})).toBe(false);
    });

    it("narrows type to Thenable", () => {
        const val = { then: () => {}, catch: () => {} } as unknown;

        if (isThenable(val)) {
            type T = typeof val;

            type cases = [
                Expect<Test<T, "equals", Thenable>>
            ];
        }
    });

});
