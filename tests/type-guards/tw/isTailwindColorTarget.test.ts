
import { isTailwindColorTarget } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import type { Expect, Test, TwColorTarget } from "inferred-types/types";

describe("isTailwindColorTarget(val)", () => {

    it("happy path", () => {
        const t1 = isTailwindColorTarget("bg");
        const t2 = isTailwindColorTarget("text");
        const t3 = isTailwindColorTarget("border");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        const f1 = isTailwindColorTarget("foo");
        const f2 = isTailwindColorTarget("flex");

        expect(f1).toBe(false);
        expect(f2).toBe(false);

        const test: string = "bg";

        if (isTailwindColorTarget(test)) {
            type T = typeof test;

            type cases = [
                Expect<Test<T, "equals", TwColorTarget>>
            ];
        }

    });

});
