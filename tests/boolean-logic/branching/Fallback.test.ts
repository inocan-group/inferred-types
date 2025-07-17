import { Expect, Fallback, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Default<TVal,TDefault,[TProtect]>", () => {

    it("happy path", () => {
        type NoChange = Fallback<"foo", "bar">;
        type Undef = Fallback<undefined, "foo">;
        type Null = Fallback<null, "foo">;

        type cases = [
            Expect<Test<NoChange, "equals",  "foo">>,
            Expect<Test<Undef, "equals",  "foo">>,
            Expect<Test<Null, "equals",  "foo">>,

        ];
    });

});
