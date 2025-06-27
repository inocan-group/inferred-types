import { Expect } from "@type-challenges/utils";
import { DoesExtend, UnionShift } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ShiftUnion<T>", () => {

    it("happy path", () => {
        type OneTwoThree = 1 | 2 | 3;
        type Once = UnionShift<OneTwoThree>;

        type cases = [
            Expect<DoesExtend<Once[0], OneTwoThree>>,
            Expect<DoesExtend<Once[1], OneTwoThree>>,
        ];
        const cases: cases = [
            true, true
        ];
    });

});
