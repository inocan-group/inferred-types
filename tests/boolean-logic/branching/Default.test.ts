import { Equal, Expect } from "@type-challenges/utils";
import { Default } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Default<TVal,TDefault,[TProtect]>", () => {

    it("happy path", () => {
        type NoChange = Default<"foo", "bar">;
        type Undef = Default<undefined, "foo">;
        type Null = Default<null, "foo">;

        type cases = [
            Expect<Test<NoChange, "equals",  "foo">>,
            Expect<Test<Undef, "equals",  "foo">>,
            Expect<Test<Null, "equals",  "foo">>,

        ];
        const cases: cases = [
            true, true, true
        ];
    });

});
