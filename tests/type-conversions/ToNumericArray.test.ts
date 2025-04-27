import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ToNumericArray } from "inferred-types/types";



describe("ToNumericArray<T>", () => {

    it("happy path", () => {
        type Mixed = ToNumericArray<[1, 2, "3", 4]>;
        type Mixed_RO = ToNumericArray<readonly [1, 2, "3", 4]>;
        type AllStr = ToNumericArray<["1", "2", "3", "4"]>;
        type AllStr_RO = ToNumericArray<readonly ["1", "2", "3", "4"]>;
        type None = ToNumericArray<number[]>;
        type None_RO = ToNumericArray<readonly number[]>;

        type cases = [
            Expect<Test<Mixed, [1, 2, 3, "equals",  4]>>,
            Expect<Test<Mixed_RO, readonly [1, 2, 3, "equals",  4]>>,
            Expect<Test<AllStr, [1, 2, 3, "equals",  4]>>,
            Expect<Test<AllStr_RO, readonly [1, 2, 3, "equals",  4]>>,
            Expect<Test<None, "equals",  number[]>>,
            Expect<Test<None_RO, "equals",  readonly number[]>>,
        ];
        const cases: cases = [
            true, true, true,
            true, true, true,
        ];
    });

});
