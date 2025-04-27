import { describe, it } from "vitest";
import {
    Expect,
    IntersectWithAll,
    Test
} from "inferred-types/types";

describe("IntersectWithAll<TList,TIntersect>", () => {

    it("happy path", () => {
        type DropStrings = IntersectWithAll<[1, 2, 3, "foo"], number>;
        type Narrow = IntersectWithAll<[number | string, number | boolean], number>;

        type cases = [
            Expect<Test<DropStrings, "equals", [1, 2, 3]>>,
            Expect<Test<Narrow, "equals", [number, number]>>,
        ];
    });

});
