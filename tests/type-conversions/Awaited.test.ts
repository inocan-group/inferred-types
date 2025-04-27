import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Awaited } from "inferred-types/types";



describe("Awaited<T>", () => {

    it("happy path", () => {
        type Num = Awaited<Promise<number>>;
        type NumLit = Awaited<Promise<42>>;
        type NumLit2 = Awaited<PromiseLike<42>>;

        type cases = [
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<NumLit, "equals",  42>>,
            Expect<Test<NumLit2, "equals",  42>>,
        ];
        const cases: cases = [true, true, true];
    });

});
