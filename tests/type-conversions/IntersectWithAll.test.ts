import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IntersectWithAll } from "inferred-types/types";



describe("IntersectWithAll<TList,TIntersect>", () => {

    it("happy path", () => {
        type DropStrings = IntersectWithAll<[1, 2, 3, "foo"], number>;
        type Narrow = IntersectWithAll<[number | string, number | boolean], number>;

        type cases = [
            Expect<Test<DropStrings, [1, 2, "equals",  3]>>,
            Expect<Test<Narrow, [number, "equals",  number]>>,
        ];
        const cases: cases = [true, true];
    });

});
