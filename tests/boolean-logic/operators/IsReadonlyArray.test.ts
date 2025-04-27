import { Expect, IsReadonlyArray, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsReadonlyArray", () => {

    it("happy path", () => {
        type T1 = IsReadonlyArray<readonly [1, 2, 3]>;
        type F1 = IsReadonlyArray<[1, 2, 3]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<F1, "equals",  false>>,
        ];
    });

});
