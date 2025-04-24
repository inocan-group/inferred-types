import { Equal, Expect } from "@type-challenges/utils";
import { Min } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Min<T>", () => {

    it("happy path", () => {
        type Nada = Min<[]>;
        type InOrder = Min<[1,2,3,4,5]>;
        type Chaotic = Min<[8,5,3,1,2,4]>;
        type Zero = Min<[0,8,1]>;

        type cases = [
            Expect<Equal<Nada, undefined>>,
            Expect<Equal<InOrder, 1>>,
            Expect<Equal<Chaotic, 1>>,
            Expect<Equal<Zero, 0>>,
        ];
    });

});
