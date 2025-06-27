import { Expect, HasArray, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("HasArray<T>", () => {

    it("happy path", () => {
        type T1 = HasArray<[1, 2, [4, 5], 6]>;
        type T2 = HasArray<[1, 2, [4, [5, 6]]]>;

        type F1 = HasArray<[1, 2, 3, 4]>;
        type F2 = HasArray<[]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,

        ];

    });

});
