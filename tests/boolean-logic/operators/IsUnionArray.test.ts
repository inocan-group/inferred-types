import { describe, it } from "vitest";
import { Expect, IsUnionArray, Test } from "inferred-types/types"



describe("IsUnionArray<T>", () => {

    it("happy path", () => {
        type T1 = IsUnionArray<(1 | 2 | 3)[]>;

        type F1 = IsUnionArray<[1, 2, 3]>;
        type F2 = IsUnionArray<string[]>;

        // @ts-ignore
        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
        ];
    });

});
