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
            Expect<Equal<Nada, undefined>>,
            Expect<Equal<InOrder, 5>>,
            Expect<Equal<Chaotic, 8>>,
            Expect<Equal<Big, 8000>>,
        ];
    });

});
