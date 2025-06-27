import { Equal, Expect } from "@type-challenges/utils";
import { MaxLength, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("MaxLength<T>", () => {

    it("happy path", () => {
        type M1 = MaxLength<[]>;                        // 0
        type M2 = MaxLength<[string]>;                  // 1
        type M3 = MaxLength<[string, number?]>;         // 2
        type M4 = MaxLength<[string, ...number[]]>;     // number
        type M5 = MaxLength<[string?, ...number[]]>;    // number
        type M6 = MaxLength<[string, number]>;          // 2

        type cases = [
            Expect<Test<M1, "equals",  0>>,
            Expect<Test<M2, "equals",  1>>,
            Expect<Test<M3, "equals",  2>>,
            Expect<Test<M4, "equals",  number>>,
            Expect<Test<M5, "equals",  number>>,
            Expect<Test<M6, "equals",  2>>,
        ];
    });

});
