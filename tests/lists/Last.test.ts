import {Expect, Last, Test } from "inferred-types/types";
import { describe, it } from "vitest";




describe("Last<T>", () => {
    it("happy path", () => {
        type Three = Last<[1, 2, 3]>;
        type Empty = Last<[]>;

        type cases = [
            Expect<Test<Three, "equals",  3>>,
            Expect<Test<Empty, "equals",  never>>,
        ];
    });
});
