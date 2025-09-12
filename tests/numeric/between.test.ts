import { describe, expect, it } from "vitest";
import type { Expect, Test } from "inferred-types/types";

import { between } from "inferred-types/runtime";

describe("between(min,max,scope) -> (val) -> boolean", () => {
    const arr = [1,2,6,7,55] as const;

    it("inclusive testing with integers", () => {
        const zeroToFour = between(0,4, "inclusively");

        const t1 = zeroToFour(0);
        const t2 = zeroToFour(4);
        const t3 = zeroToFour(2);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        const f1 = zeroToFour(5);
        const f2 = zeroToFour(-1);

        expect(f1).toBe(false);
        expect(f2).toBe(false);

        type cases = [
            Expect<Test<typeof t1, "equals", true>>,
            Expect<Test<typeof t2, "equals", true>>,
            Expect<Test<typeof t3, "equals", true>>,

            Expect<Test<typeof f1, "equals", false>>,
            Expect<Test<typeof f2, "equals", false>>,
        ];
    });

    it("exclusive testing with integers", () => {
        const zeroToFour = between(0,4, "exclusively");

        const t1 = zeroToFour(1);
        const t2 = zeroToFour(3);
        const t3 = zeroToFour(2);

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        const f1 = zeroToFour(5);
        const f2 = zeroToFour(-1);
        const f3 = zeroToFour(0);
        const f4 = zeroToFour(4);

        expect(f1).toBe(false);
        expect(f2).toBe(false);
        expect(f3).toBe(false);
        expect(f4).toBe(false);

        type cases = [
            Expect<Test<typeof t1, "equals", true>>,
            Expect<Test<typeof t2, "equals", true>>,
            Expect<Test<typeof t3, "equals", true>>,

            Expect<Test<typeof f1, "equals", false>>,
            Expect<Test<typeof f2, "equals", false>>,
        ];
    });

    it("exclusive with decimal numbers", () => {
        const zeroToFour = between(0,4, "exclusively");

        const t1 = zeroToFour(0.1);
        expect(t1).toBe(true);
        const t2 = zeroToFour(3.9);
        expect(t2).toBe(true);

        type cases = [
            Expect<Test<typeof t1, "equals", true>>,
            Expect<Test<typeof t2, "equals", true>>,
        ];
    });

});
