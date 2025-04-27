import { Equal, Expect } from "@type-challenges/utils";
import { Max } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Max<T>", () => {

    it("happy path", () => {
        type Nada = Max<[]>;
        type InOrder = Max<[1, 2, 3, 4, 5]>;
        type Chaotic = Max<[8, 5, 3, 1, 2, 4]>;
        type Big = Max<[0, 8000, 1]>;

        type cases = [
            Expect<Test<Nada, "equals",  undefined>>,
            Expect<Test<InOrder, "equals",  5>>,
            Expect<Test<Chaotic, "equals",  8>>,
            Expect<Test<Big, "equals",  8000>>,
        ];
    });

});
