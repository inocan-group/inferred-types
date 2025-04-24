import { Equal, Expect } from "@type-challenges/utils";
import { MaxLength } from "inferred-types/types";
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
            Expect<Equal<M1, 0>>,
            Expect<Equal<M2, 1>>,
            Expect<Equal<M3, 2>>,
            Expect<Equal<M4, number>>,
            Expect<Equal<M5, number>>,
            Expect<Equal<M6, 2>>,
        ];
    });

});
