import { Equal, Expect } from "@type-challenges/utils";
import { MinLength } from "inferred-types/types";
import { describe, it } from "vitest";

describe("MaxLength<T>", () => {

    it("happy path", () => {
        type M1 = MinLength<[]>;                       // 0
        type M2 = MinLength<[string]>;                 // 1
        type M3 = MinLength<[string, number?]>;        // 1
        type M4 = MinLength<[string, ...number[]]>;    // 1
        type M5 = MinLength<[string?, ...number[]]>;   // 0

        type cases = [
            Expect<Equal<M1, 0>>,
            Expect<Equal<M2, 1>>,
            Expect<Equal<M3, 1>>,
            Expect<Equal<M4, 1>>,
            Expect<Equal<M5, 0>>,
        ];
    });

});
