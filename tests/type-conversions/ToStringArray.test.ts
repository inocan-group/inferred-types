import { Equal, Expect } from "@type-challenges/utils";
import { ToStringArray } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ToStringArray<T>", () => {

    it("happy path", () => {
        type Str = ToStringArray<["foo", "bar"]>;
        type Num = ToStringArray<[1, 2]>;
        type Bool = ToStringArray<[true, false, boolean]>;
        type Empty = ToStringArray<[]>;

        type cases = [
            Expect<Test<Str, ["foo", "equals",  "bar"]>>,
            Expect<Test<Num, ["1", "equals",  "2"]>>,
            Expect<Test<Bool, ["true", "false", "equals",  "true" | "false"]>>,
            Expect<Test<Empty, "equals",  []>>,
        ];
        const cases: cases = [
            true, true, true, true
        ];
    });

});
