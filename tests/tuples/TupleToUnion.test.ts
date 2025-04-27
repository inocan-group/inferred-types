import { describe, it, expect } from "vitest";
import { Expect, Test, TupleToUnion } from "inferred-types/types";

describe("TupleToUnion<T> type utility", () => {
    it("an array of literals is converted ot a tuple", () => {
        type Arr = TupleToUnion<[1, 2, 3]>;
        type RoArr = TupleToUnion<readonly [1, 2, 3]>;
        type Empty = TupleToUnion<[]>;

        type cases = [
            Expect<Test<Arr, "equals",  1 | 2 | 3>>,
            Expect<Test<RoArr, "equals",  1 | 2 | 3>>,
            Expect<Test<Empty, "equals",  never>>
        ];
    });
});
