import { describe, it } from "vitest";
import type { Expect, IsArray, Test } from "inferred-types/types";

describe("IsArray<T>", () => {

    it("happy path", () => {
        type Str = IsArray<"foo">;
        type Num = IsArray<42>;
        type Obj = IsArray<{ foo: 1 }>;
        type Arr = IsArray<[1, 2, 3]>;
        type Arr2 = IsArray<string[]>;

        type cases = [
            Expect<Test<Str, "equals",  false>>, //
            Expect<Test<Num, "equals",  false>>,
            Expect<Test<Obj, "equals",  false>>,
            Expect<Test<Arr, "equals",  true>>,
            Expect<Test<Arr2, "equals",  true>>,
        ];
    });

});
