import { Expect, Intersect, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Intersect<TList>", () => {

    it("happy path", () => {
        type FooBar = Intersect<[
            { foo: 1 },
            { bar: 2 }
        ]>

        type cases = [
            Expect<Test<FooBar, "equals",  { foo: 1 } & { bar: 2 }>>,
        ];
    });

});

