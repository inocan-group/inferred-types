
import { describe, it } from "vitest";
import type { Expect, Fallback, Test } from "inferred-types/types";

describe("Fallback<TVal,TDefault,[TProtect]>", () => {

    it("non union type for T", () => {
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

    it("union type for T", () => {
        type T = "foo" | "bar" | undefined;

        type U = Fallback<T, "baz">

        type cases = [
            Expect<Test<U, "equals", "foo" | "bar" | "baz">>
        ];
    });

});
