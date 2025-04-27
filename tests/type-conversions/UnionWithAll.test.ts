import { Equal, Expect } from "@type-challenges/utils";
import { UnionWithAll } from "inferred-types/types";
import { describe, it } from "vitest";



describe("UnionWithAll<TList,TUnion>", () => {

    it("happy path", () => {
        type MightBeNumber = UnionWithAll<[1, 2, 3, "foo"], number>;
        type Consider42 = UnionWithAll<[1, 2, 3, "foo"], 42>;

        type cases = [
            Expect<Test<MightBeNumber, [number, number, number, "equals",  "foo" | number]>>,
            Expect<Test<Consider42, [1 | 42, 2 | 42, 3 | 42, "equals",  "foo" | 42]>>,
        ];
        const cases: cases = [true, true];
    });

});
