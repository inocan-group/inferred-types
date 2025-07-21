import { Expect, Fallback, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Fallback<TVal,TDefault,[TProtect]>", () => {

    it("happy path", () => {
        type NoChange = Fallback<"foo", "bar">;
        type Undef = Fallback<undefined, "foo">;
        type Null = Fallback<null, "foo">;
        type Arr = Fallback<undefined, ["error","never"]>

        type cases = [
            Expect<Test<NoChange, "equals",  "foo">>,
            Expect<Test<Undef, "equals",  "foo">>,
            Expect<Test<Null, "equals",  "foo">>,
            Expect<Test<Arr, "equals", ["error", "never"]>>
        ];
    });

});
