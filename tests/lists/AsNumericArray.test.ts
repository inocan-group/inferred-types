import { Expect, AsNumericArray, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("AsNumericArray<T>", () => {

    it("happy path", () => {
        type NoChange = AsNumericArray<[1, 2, 3]>;
        type Mixed = AsNumericArray<[1, 2, `3`]>;
        type StrLit = AsNumericArray<[`1`, `2`, `3`]>;

        type IgnoreInvalid = AsNumericArray<[1, 2, null, false, 3]>;

        type cases = [
            Expect<Test<NoChange, "equals", [1, 2, 3]>>,
            Expect<Test<Mixed, "equals", [1, 2, 3]>>,
            Expect<Test<StrLit, "equals", [1, 2, 3]>>,

            Expect<Test<IgnoreInvalid, "equals", [1, 2, 3]>>
        ];
    });

});
