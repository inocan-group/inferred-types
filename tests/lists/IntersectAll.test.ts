import { Expect, IntersectAll, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("IntersectAll", () => {

    it("happy path", () => {
        type List = [{ id: 1; foo: "hi" }, { id: 2; foo: "bye" }];
        type L2 = readonly [{ id: 1; foo: "hi" }, { id: 2; foo: "bye" }];

        type T1 = IntersectAll<List, { bar: number }>;
        type T2 = IntersectAll<L2, { bar: number }>;

        type cases = [
            Expect<Test<T1[0], "equals",  { id: 1; foo: "hi"; bar: number }>>,
            Expect<Test<T1[1], "equals",  { id: 2; foo: "bye"; bar: number }>>,

            Expect<Test<T2[0], "equals",  { id: 1; foo: "hi"; bar: number }>>,
            Expect<Test<T2[1], "equals",  { id: 2; foo: "bye"; bar: number }>>,
        ];
    });

});
