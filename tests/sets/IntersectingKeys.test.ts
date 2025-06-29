import { describe, it } from "vitest";
import { Expect, IntersectingKeys, Test } from "inferred-types/types";



describe("IntersectingKeys<L,R>", () => {

    it("happy path (with objects)", () => {
        type Bar = IntersectingKeys<{ foo: 1; bar: 2 }, { bar: 2; baz: 3 }>;
        type None = IntersectingKeys<{ foo: 1; bar: 2 }, { baz: 2; bax: 3 }>;

        type cases = [
            Expect<Test<Bar, "equals",  ["bar"]>>,
            Expect<Test<None, "equals",  []>>,
        ];
    });

});
