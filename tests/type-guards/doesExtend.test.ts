import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { doesExtend } from "inferred-types/runtime";

describe("doesExtend(type)(val)", () => {

    it("partial ", () => {
        const str = doesExtend("string");
        const num = doesExtend("number");

        type cases = [
            /** type tests */
        ];
    });

    it("extends string", () => {
        const tg = doesExtend("string");

        const t1 = tg("foo");
        const t2 = tg("42");
        const f1 = tg(42);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(f1).toBe(false);

        type cases = [
            /** type tests */
        ];
    });

    it("extends number", () => {
        const tg = doesExtend("number");

        const t1 = tg(0);
        const t2 = tg(42);

        expect(t1).toBe(true);
        expect(t2).toBe(true);

        type cases = [
            /** type tests */
        ];
    });

});
