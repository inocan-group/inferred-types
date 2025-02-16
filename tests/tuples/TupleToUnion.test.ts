import { describe, it, expect } from "vitest";
import { Expect, Equal } from "@type-challenges/utils";

import { TupleToUnion } from "inferred-types/types";

describe("TupleToUnion<T> type utility", () => {
    it("an array of literals is converted ot a tuple", () => {
        type Arr = TupleToUnion<[1, 2, 3]>;
        type RoArr = TupleToUnion<readonly [1, 2, 3]>;
        type Empty = TupleToUnion<[]>;

        type cases = [
            Expect<Equal<Arr, 1 | 2 | 3>>,
            Expect<Equal<RoArr, 1 | 2 | 3>>,
            Expect<Equal<Empty, never>>
        ];

        const c: cases = [true, true, true];
        expect(c).toBe(c);
    });
});
