
import { describe, it } from "vitest";
import type { Expect, NotLength, Test } from "inferred-types/types";

describe("NotLength<T,U>", () => {

    it("happy path", () => {
        type True = NotLength<[1, 2, 3], 0>;
        type False = NotLength<[1, 2, 3], 3>;

        type cases = [
            Expect<Test<True, "equals",  true>>,
            Expect<Test<False, "equals",  false>>,
        ];
    });

});
