import { Equal, Expect } from "@type-challenges/utils";
import type { MinLength, Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("MinLength<T>", () => {

    it("happy path", () => {
        type M1 = MinLength<[]>;                       // 0
        type M2 = MinLength<[string]>;                 // 1
        type M3 = MinLength<[string, number?]>;        // 1
        type M4 = MinLength<[string, ...number[]]>;    // 1
        type M5 = MinLength<[string?, ...number[]]>;   // 0

        type cases = [
            Expect<Test<M1, "equals",  0>>,
            Expect<Test<M2, "equals",  1>>,
            Expect<Test<M3, "equals",  1>>,
            Expect<Test<M4, "equals",  1>>,
            Expect<Test<M5, "equals",  0>>,
        ];
    });

});
