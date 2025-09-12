
import { describe, it } from "vitest";
import type { Expect, Test, ToStringArray } from "inferred-types/types";

describe("ToStringArray<T>", () => {

    it("happy path", () => {
        type Str = ToStringArray<["foo", "bar"]>;
        type Num = ToStringArray<[1, 2]>;
        type Bool = ToStringArray<[true, false, boolean]>;
        type Empty = ToStringArray<[]>;

        type cases = [
            Expect<Test<Str, "equals", ["foo", "bar"]>>,
            Expect<Test<Num, "equals", ["1", "2"]>>,
            Expect<Test<Bool, "equals", ["true", "false", "true" | "false"]>>,
            Expect<Test<Empty, "equals",  []>>,
        ];
    });

});
