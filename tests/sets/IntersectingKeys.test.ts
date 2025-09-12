import { describe, it } from "vitest";
import type { Expect, IntersectingKeys, Test } from "inferred-types/types";

describe("IntersectingKeys<L,R>", () => {

    it("happy path (with objects)", () => {
        type Bar = IntersectingKeys<{ foo: 1; bar: 2 }, { bar: 2; baz: 3 }>;
        type None = IntersectingKeys<{ foo: 1; bar: 2 }, { baz: 2; bax: 3 }>;

        type cases = [
            Expect<Test<Bar, "equals",  ["bar"]>>,
            Expect<Test<None, "equals",  []>>,
        ];
    });

    it("with tuples", () => {
        type T = IntersectingKeys<[1,2,3], ["foo","bar"]>;

        type cases = [
            Expect<Test<T, "equals", [0,1]>>
        ];
    });

});
