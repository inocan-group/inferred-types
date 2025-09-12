import { describe, it } from "vitest";
import type { Expect, HasSameKeys, Test } from "inferred-types/types";

describe("SameKeys<T> utility", () => {

    it("happy path", () => {

        type cases = [
            Expect<Test<
                HasSameKeys<{ id: "abc" }, { id: "abc"; favorite: false }>,
                "equals",
                false
            >>,
            Expect<Test<
                { id: "abc" },
                "hasSameKeys",
                { id: "syz" }
            >>,

            Expect<Test<
                HasSameKeys<[1, 2], [1, 2, 3]>,
                "equals",
                false
            >>,
            Expect<Test<
                [1, 2],
                "hasSameKeys",
                [3, 4]
            >>,

        ];

    });
});
