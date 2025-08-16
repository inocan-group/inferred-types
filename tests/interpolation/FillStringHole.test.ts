import { describe, it } from "vitest";
import {
    Expect,
    FillStringHole,
    Test,
} from "inferred-types/types";

describe("FillStringHole<T,U>", () => {

    it("happy path", () => {

        type FooBarBaz = FillStringHole<`Foo${string}Baz`, "Bar">;
        type Multi = FillStringHole<`Foo${string}Baz${string}`, "Bar">;


        type cases = [
            Expect<Test<FooBarBaz, "equals", "FooBarBaz">>,
            Expect<Test<Multi, "equals", "FooBarBazBar">>,
        ];
    });

});
