
import { describe, it } from "vitest";
import type { Expect, Test, UnionWithAll } from "inferred-types/types";

describe("UnionWithAll<TList,TUnion>", () => {

    it("happy path", () => {
        type MightBeNumber = UnionWithAll<[1, 2, 3, "foo"], number>;
        type Consider42 = UnionWithAll<[1, 2, 3, "foo"], 42>;

        type cases = [
            Expect<Test<
                MightBeNumber, "equals",
                [number, number, number, "foo" | number]
            >>,
            Expect<Test<
                Consider42, "equals",
                [1 | 42, 2 | 42, 3 | 42, "foo" | 42]
            >>,
        ];
    });

});
