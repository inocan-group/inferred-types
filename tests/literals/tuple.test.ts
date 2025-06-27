import { describe, expect, it } from "vitest";
import { tuple } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";

describe("tuple(value)", () => {

    it("happy path", () => {
        const t1 = tuple(1, 2, 3);
        const t2 = tuple([1, 2, 3]);

        expect(t1).toEqual([1, 2, 3]);
        expect(t2).toEqual([1, 2, 3]);

        type cases = [
            Expect<Test<typeof t1, "equals", [1, 2, 3]>>,
            Expect<Test<typeof t2, "equals", [1, 2, 3]>>,
        ];
    });

});
